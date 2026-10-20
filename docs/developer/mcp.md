# MCP 协议、客户端与服务端

客户端把外部工具接入 Agent，本机服务端把 Agent 工具开放给其他客户端。两者复用协议辅助，但连接所有权、权限和生命周期不同。

## 模块结构

路径相对于 `app/src/main/java/com/yukisoffd/lyracode/mcp/`。

| 文件 | 职责 |
| --- | --- |
| `McpJsonConfig.kt` | 解析并保存原始 JSON，投影表单字段 |
| `McpClientManager.kt` | 工具刷新、配置回写、调用结果与连接失效 |
| `McpHttpClient.kt` | 连接缓存、HTTP/SSE、协议协商与 JSON-RPC |
| `McpProtocol.kt` | 版本、元数据、Header 编解码、协议错误 |
| `LocalMcpServerManager.kt` | 监听 Socket、鉴权、工具适配和启停 |
| `McpServerProtocol.kt` | 请求校验、方法路由与结果封装 |

## 客户端接口与连接生命周期

`testAndRefreshTools(server): Result<List<McpToolDefinition>>` 获取工具并更新配置；`callTool(server, tool, arguments)` 返回 `McpCallResult`，包含服务器名、工具名和内容。调用方既要处理连接异常，也要检查工具业务结果。

```kotlin
// manager/server 为宿主已有对象；示意连接验证与工具选择。
val tools = manager.testAndRefreshTools(server).getOrThrow()
val tool = tools.firstOrNull { it.name == requestedName }
    ?: error("Tool is not advertised by this server")
val result = manager.callTool(server, tool, JSONObject())
```

示例空参数只适用于无参数工具；其他工具按其 input schema 构造。配置修改、禁用或删除后调用 `invalidate(serverId)`，关闭旧 SSE 响应并移除缓存连接。不要只更新表单而继续使用旧 Header/会话。

配置仅接受 HTTP(S) 与单服务器节点，Header 值为字符串；`url`/`baseUrl` 同时存在必须一致。原始 JSON 与表单应通过同一投影逻辑同步，避免丢失自定义字段。

## 服务端接口与资源

| 方法 | 契约 |
| --- | --- |
| `attachAgent(agent)` | 绑定定义与执行入口 |
| `start(config)` | 关闭旧监听，规范化配置并启动，返回状态 |
| `syncWithSettings()` | 根据保存的 enabled 状态启动或停止 |
| `status()` / `statusJson()` | 运行、地址、端口、开始时间和消息 |
| `stop(saveDisabled)` | 关闭监听，可保存停用状态 |
| `close()` | 停止监听并取消管理器协程作用域 |

监听在 IO SupervisorJob 作用域接受连接，每个客户端独立处理，Socket 在请求结束关闭。它不是支持任意 GET 订阅的长连接服务器；当前 `/mcp` 只支持 POST。

## HTTP 与 JSON-RPC 契约

| 请求 | 结果 |
| --- | --- |
| `GET /` 或 `/status` | 服务状态 JSON，仍需鉴权 |
| `POST /mcp` | JSON-RPC 响应 |
| 非 POST `/mcp` | 405 |
| 无 ID 的合法通知 | 202、无响应体 |
| 无效 JSON / 无效请求 | 400 与协议错误 |

传统模式通过 `initialize` 协商；实现列出的版本包括 `2025-11-25`、`2025-06-18`、`2025-03-26`、`2024-11-05`。当前源码还实现 `2026-07-28` 分支，通过 `server/discover` 和请求元数据协商；这里描述本仓库实现，不表示任何外部客户端一定支持它。

现代请求校验 `Mcp-Protocol-Version`、`Mcp-Method` 与 `_meta` 中版本/客户端信息/能力；`tools/call` 还校验 `Mcp-Name` 与参数工具名一致。元数据不一致返回 `-32020`，不支持的版本返回 `-32022`。

### 最小传统模式请求

向已配置的 `/mcp` 发送以下 JSON，并带实际鉴权 Header：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-11-25",
    "capabilities": {},
    "clientInfo": { "name": "docs-client", "version": "1" }
  }
}
```

随后以协商版本请求 `tools/list`，再按返回 schema 调用 `tools/call`。服务端按请求处理协议状态，不能假设存在独立持久化客户端会话。

## 工具映射与执行边界

`localMcpToolDefinitions` 将 Agent function schema 映射为 `name`、`description`、`inputSchema`。`executeLocalMcpTool` 使用专用会话 ID 调用 `executeTool(..., skipApproval=true)`；不进入普通聊天逐次审批。新增工具时必须评估它是否会同时出现在服务端。

返回的 MCP `content` 包含文本化内部工具输出，`isError` 从内部 `ok` 推导。HTTP/JSON-RPC 成功与业务成功是不同层次。密钥为空允许无鉴权；非空时接受 Authorization/Bearer、`X-Lyra-MCP-Key`、`X-API-Key` 或 `Api-Key`。

## 回归入口

使用 `McpConfigurationTest`、`McpHttpClientTest`、`McpServerProtocolTest` 检查配置、协商、SSE、ID、元数据、通知和工具错误。再在设备上验证监听、密钥与工具开关，用户操作见[客户端](/manual/mcp-client)和[服务端](/manual/mcp-server)。
