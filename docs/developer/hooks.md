# 回调、钩子与作用域接口

本页的钩子指当前 Kotlin 对象上的可挂起回调、内部作用域接口与桌宠生命周期入口。应用没有将这些统一成供任意插件注册的公共事件总线；示例需放在对应宿主上下文中。

## Agent 与控制器如何接线

`ChatController` 初始化时把 `OpenAiAgent` 的回调绑定到自身方法。源码入口为 `ChatController.kt`、`ai/agent/OpenAiAgent.kt` 与 `ai/AgentFileMutation.kt`。

| 回调 | 签名要点 | 调用目的 |
| --- | --- | --- |
| `approvalHandler` | `suspend (ToolApprovalRequest) -> ToolApprovalDecision` | 执行前请求决定 |
| `userQuestionHandler` | `suspend (UserQuestionRequest) -> UserQuestionAnswer` | 等待用户补充信息 |
| `todoSetHandler` | `suspend (Long, List<TodoItem>) -> String` | 为会话设置步骤 |
| `todoUpdateHandler` | `suspend (Long, String, String, String) -> String` | 更新步骤状态与说明 |
| `configChangedHandler` | `suspend () -> Unit` | 配置已变更后刷新宿主状态 |
| `fileEditHandler` | `suspend (AgentFileMutation) -> AgentFileEditResult` | 写前询问编辑器能否接管 |
| `fileMutationHandler` | `suspend (AgentFileMutation) -> Unit` | 修改完成后同步编辑器等状态 |
| `fileActivityHandler` | `suspend (AgentFileActivity?) -> Unit` | 展示读写活动；`null` 表示清除 |

默认实现不代表生产策略：例如 Agent 默认审批返回 Approved，真正的前台审批由控制器绑定提供。新增调用方必须明确绑定策略，不能只构造 Agent 就假定已有 UI 审批。

## 编辑器写入钩子

### 请求数据

`AgentFileMutation` 包含 `path`、目标 `content`、`globalStorage`、可空 `beforeContent` 和 `editorApplied`。这些字段区分工作区/全局路径、预期旧内容与是否已由编辑器应用。

### 三种返回语义

| 返回 | 语义 | 调用链应做什么 |
| --- | --- | --- |
| `NotHandled` | 当前编辑器不接管 | 继续现有文件写入路径 |
| `Applied` | 编辑器已成功应用 | 避免重复写入 |
| `failed(message)` | 已处理但拒绝/失败 | 中止磁盘回退并报告错误 |

`AgentFileToolHandler.applyFileChangeInEditor` 对 `handled && !applied` 抛出错误。把失败改成 `NotHandled` 会绕过冲突保护，可能覆盖用户手动修改。

### 教学示例

以下仅示意一个宿主回调，不是新插件 API，也不替代现有控制器接线：

```kotlin
agent.fileEditHandler = { mutation ->
    if (mutation.path != openPath) {
        AgentFileEditResult.NotHandled
    } else if (mutation.beforeContent != editorText) {
        AgentFileEditResult.failed("Content changed; read again before editing.")
    } else {
        withContext(Dispatchers.Main) {
            applyAndSave(mutation.content)
        }
        AgentFileEditResult.Applied
    }
}
```

`openPath`、`editorText`、`applyAndSave` 为教学占位，实际接入需复用宿主的路径解析、等待器、保存与错误处理。只有应用并保存成功后才能返回 `Applied`。

## 等待、线程与清理

控制器将 Compose 状态写入切回 Main。审批和问题使用 `CompletableDeferred` 等待；回答、停止和宿主销毁都要清理相应注册。不要在 Main 上阻塞等待网络或 IO。

文件活动以开始事件进入，`finally` 中用 `null` 清除。包装已有回调时保留原回调的返回值、异常和取消语义；单赋值的回调属性不会自动组合多个监听者。

## `ScopedAgentTools` 接口

```kotlin
internal interface ScopedAgentTools {
    val conversationId: Long
    val systemPrompt: String
    val includesNativeTools: Boolean get() = false
    val finished: Boolean
    fun definitions(): JSONArray
    fun checkRound()
    suspend fun execute(name: String, arguments: JSONObject): String
}
```

`conversationId` 绑定目标会话，`definitions` 提供模型可见工具，`checkRound` 检查每轮约束，`execute` 再次校验并执行。默认不包含原生工具；只有显式设计才开启。`finished` 控制会话结束条件。它是模块内部能力边界，不能用空检查或透传全部工具扩大设备会话权限。

## 验证与相关章节

验证未打开编辑器、成功接管、冲突拒绝、保存失败、取消等待和活动清除六种路径。网络取消见[生命周期](/developer/conversation-lifecycle)，工具分派见[工具接入](/developer/agent-tools)。JavaScript 的 `mount/onEvent/unmount` 属于[桌宠运行时](/developer/pet-runtime)，与此处的 Kotlin 回调分别接线。
