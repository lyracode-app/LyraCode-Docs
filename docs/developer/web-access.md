# 网页桥接与状态同步

网页访问复用手机端的 `ChatController`、会话和设置。浏览器发送动作并订阅快照，不创建第二套 Agent 或数据库。本页描述应用内部桥接契约，修改时需同步客户端资源与服务端。

## 模块与生命周期

| 入口 | 职责 |
| --- | --- |
| `webaccess/WebAccessManager.kt` | 启停监听、鉴权、HTTP 路由与 SSE 连接 |
| `WebAccessHttp.kt` | 有界请求解析、响应、Header 与 Bearer 校验 |
| `WebAccessBridge.kt` | 控制器状态投影、动作分派、会话校验与上传 |
| `WebAccessMedia.kt` | 引用媒体的短期访问映射 |
| `WebAccessForegroundService.kt` | Android 服务运行配合 |
| `assets/web-access/` | 浏览器 UI 与状态消费 |

`start` 建立监听和服务资源，`stop` 关闭相应监听与连接。SSE 客户端断开时取消状态生产者、关闭 Channel 并移除 Socket，不能把旧订阅留到下次启动。

## HTTP 接口

| 接口 | 用途 | 访问条件 |
| --- | --- | --- |
| `GET /api/locale` | 连接页语言 | 公共界面信息 |
| `GET /api/state` | 完整状态快照 | 当前访问码的 Bearer Header |
| `GET /api/events` | SSE 状态更新与心跳 | 同上 |
| `POST /api/action` | 控制器动作 | 同上；部分动作还需会话身份 |
| `POST /api/upload` | 上传待发送文件 | 鉴权及上传校验 |
| `GET/HEAD /api/media?id=...` | 单个已引用媒体 | 不可猜测的短期 ID，约 5 分钟 |

媒体 ID 本身授予单文件读取能力，不应写入公开日志。JSON 动作体有 `MAX_JSON` 大小限制，超限返回 413；解析器不接受有歧义的重复 Header 或 chunked 请求。

## 快照与增量

`snapshot()` 投影会话、项目、模型、工具、审批和设置；`configurationSignature()` 决定何时重发完整结构，`liveSnapshot(previous)` 处理消息更新。服务在 Main 上采集 Compose 状态，Socket 写入由服务线程处理。

SSE 用 `event: state` 发送 JSON，空闲发送心跳。当前实现使用 rendezvous Channel 保留背压，避免丢弃后续增量依赖的消息。修改增量算法时必须同步浏览器合并逻辑，不能把每个消息片段当成独立完整快照。

## 动作与会话一致性

`action(args)` 在 Main 分派，`send`、`stop`、`continue`、`workspace`、`model`、`branch`、`editMessage` 等调用 `requireSession`。校验 `sessionRevision`、`conversationId`、`projectId`，提供 `instanceId` 时还检查宿主实例。

### 发送示例

```js
// baseUrl、accessCode、state 均由当前已连接页面提供。
const response = await fetch(`${baseUrl}/api/action`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessCode}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'send', text: 'Read README and summarize the build steps.',
    instanceId: state.instanceId,
    sessionRevision: state.sessionRevision,
    conversationId: state.conversationId,
    projectId: state.projectId
  })
});
if (response.status === 409) {
  // 重新获取快照并让用户核对目标，不向新会话自动重放发送。
}
```

这里用当前快照字段构造请求，不能缓存某个固定会话 ID。手机切换会话后，旧页面操作应返回 409，并刷新目标。新增会话敏感动作时同时更新身份检查集合。

## 工作区与上传

浏览器传入的工作区 URI 经过 `authorizedWorkspace` 检查；网页不能替手机授予任意 Android 目录权限。上传进入控制器待发送附件，检查返回与列表后再发送。媒体展示、上传和项目文件权限不能互相替代。

## 验证

运行 `WebAccessHttpTest` 检查解析边界，并在设备/浏览器验证错误访问码、切换会话后的旧动作、SSE 重连、上传、媒体失效与服务停止。界面用法见[网页访问](/manual/local-services)，会话回流见[生命周期](/developer/conversation-lifecycle)。
