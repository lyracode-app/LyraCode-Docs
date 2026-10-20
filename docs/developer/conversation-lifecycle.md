# 会话与请求生命周期

会话记录、一次 Agent 运行、一个 HTTP 响应和后台进程各有独立生命周期。本页沿发送、工具循环、取消与继续说明状态如何流动。

## 状态与所有权

| 对象 | 所有者/入口 | 结束条件 |
| --- | --- | --- |
| 会话历史与元数据 | `ConversationStore` | 显式删除；运行结束后仍保留 |
| 会话运行 Job | `ChatController` 的运行管理 | 完成、异常或取消并清理 |
| 同会话运行锁 | `ConversationRunGate.run` | 持有至 block 及取消清理完成 |
| 单次 HTTP 响应 | `Call.useModelResponse` | 正常结束、异常、取消并关闭 |
| 工具审批/问题等待器 | 控制器 | 回答、拒绝、中断或清理 |
| 后台命令进程 | 对应运行环境/执行器 | 单独停止或环境结束 |

持久化会话状态主要为 `idle`、`running`、`interrupted`。等待审批、压缩、网络读取等更细状态由运行操作和 UI 状态表达，不能把所有文案都当成数据库枚举。

## 发送链路

### 1. 控制器接受输入

`send` 校验文本/附件，创建必要的持久化会话，恢复该会话工作区，选择模型配置。它写入用户消息、更新列表，再启动会话 Job。

### 2. Agent 接受已保存消息

`OpenAiAgent.chat` 在 IO 调度器运行，接收 `userMessagePersisted=true`，避免重复写入同一用户消息；直接调用该接口时，需明确谁负责持久化。

```kotlin
// 控制器调用语境中的简化示例；对象由宿主提供。
agent.chat(
    conversationId, userInput, profile, model,
    userMessagePersisted = true,
) { update ->
    withContext(Dispatchers.Main) {
        if (activeConversationId.value == conversationId) {
            applyChatUpdate(update)
        }
    }
}
```

`ChatUpdate` 包含完整的 `content`、`thinking`、`status`、`messageId` 及速度/缓存指标。控制器按消息 ID 更新显示；它不等同于可任意拼接的单 Token 增量。

### 3. 工具循环

`runLoop` 检查取消与作用域，构造历史和工具定义，调用协议实现。模型请求工具时，执行检查与审批，保存工具结果，再发起下一轮。模型结束回复后才走本次运行收尾。

## 网络响应的结束与取消

### 响应所有权

`ai/ModelResponseLifecycle.kt` 的 `useModelResponse` 使用 `Response.use` 释放响应，并安装取消监听；即使 `execute()` 或读取阻塞，也会通过 `Call.cancel()` 关闭网络调用。

### 流终止事件

`consumeModelStream` 在回调返回 `false` 时停止读取，不等待服务器关闭 TCP。协议解析器必须识别终止事件，区分正常结束与不完整流。读取超时常量为 `MODEL_RESPONSE_READ_TIMEOUT_SECONDS`，不要在新增解析器中绕过统一响应管理。

## 停止、继续与切换

`stopActive` 取消 Job、标记 `interrupted`，结束对应审批和问题等待器并刷新消息。取消不是成功，应继续传播 `CancellationException`，并在 `finally` 释放临时状态。

`continueActive` 仅接受中断且未运行的会话，恢复工作区后继续模型循环。`ConversationRunGate` 按会话 ID 使用 Mutex，取消清理尚未完成时，下一次运行不能提前进入。

切换对话不等于取消所有任务。异步历史读取和流更新应校验会话 ID；`reloadMessages` 使用读取锁、取消和更新缓冲，防止快速切换后旧历史覆盖新界面。

## 验证场景

至少覆盖：读取阻塞时停止、终止事件后连接不关闭、停止后立即继续、切换对话时旧请求回调、审批期间中断、工具失败后历史完整性。入口测试为 `ConversationRunLifecycleTest` 与 `ModelResponseLifecycleTest`，命令见[测试指南](/developer/testing)。后台进程验证另见[工作区运行时](/developer/workspaces)。
