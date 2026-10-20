# 新增 Agent 工具

目标：理解一个内置工具从模型定义到执行结果的完整接入点。以下用无副作用的 `echo_text` 展示最小接线；它是教学示例，当前应用并未内置此工具。

## 1. 定义参数契约

在 `ai/agent/AgentToolSchemaFactory.kt` 的定义链中，按现有模式添加：

```kotlin
.put(function("echo_text", "Return the supplied text unchanged; maximum 200 characters.", "text" to "string"))
```

固定工具名，写清作用与限制。`function` 为这里的现有私有辅助函数，不能直接粘贴到其他文件使用。需要可选字段时参考 `functionWithOptional`；写文件和命令工具还应复用当前文本/多行参数解析规则。

## 2. 接入执行分派

在 `OpenAiAgent.kt` 的 `executeTool` 内现有 `when (call.name)` 中添加分支：

```kotlin
"echo_text" -> {
    val value = args.getString("text")
    require(value.length <= 200) { "text must contain at most 200 characters" }
    ToolExecution(value)
}
```

该片段依赖现有方法中的 `args` 和 `ToolExecution`。复杂实现放入领域 Handler，再在分派处调用；网络和阻塞 IO 使用适当调度，不占用 UI 线程。

返回值继续走现有 `toToolOutputJson`，其外层 schema 是 `lyra_tool_output_v2`，包含 `ok`、`tool`、`content`、`error` 和 `file_changes`。失败必须保留失败语义，不应把异常写成成功文案。

## 3. 完成可用性与权限接线

| 接入点 | 必须考虑的问题 |
| --- | --- |
| `AgentToolSchemaFactory` | 工具依赖是否可用？是否按禁用列表与会话能力过滤？ |
| `OpenAiAgent.executeTool` | 禁用工具、参数异常和取消是否仍正确处理？ |
| `OpenAiAgent.approvalFor` | 有副作用时，审批是否展示完整目标和风险？只读 echo 不需要新增写操作审批 |
| 子代理访问与写入协调 | 是否应允许该工具？写路径是否受限制并参与协调？ |
| `ScopedAgentTools` / 设备入口 | 是否明确授予此能力？不能自动继承一般工具集 |
| `ui/settings/system/SettingsPermissionToolScreens.kt` | `agentToolCatalog()` 是否包含名称和双语资源，能否在设置中开关？ |
| MCP 与网页入口 | 暴露方式、审批语义和设置目录是否一致？ |

工具目录中的名称、描述通过 Android 字符串资源维护，同时更新中文与英文。echo 示例无需平台权限，但也要验证关闭工具后不可执行。

## 4. 验证与文档

验证正常值、空文本、超限、缺字段、工具被关闭，以及不允许调用的会话入口。有写入或远程副作用的工具还需验证拒绝审批、失败回滚/错误报告和越界路径。

在设备上执行一次实际调用，确认工具卡片、结果和变更显示正确。更新[工具参考](/reference/tools)与相关手册；参数必须与最终 schema 一致。

## 工具接口的三个层次

### 模型可见定义

schema 声明工具名称、描述、参数类型和 required。它帮助模型生成参数，执行端仍须验证缺字段、类型、范围与路径。可选值的默认行为要在描述与 Handler 中一致，不能仅依赖模型遵守说明。

### 执行结果契约

`ToolExecution` 承载正文与文件变更，`toToolOutputJson` 生成统一输出。教学 echo 的成功结果可表示为：

```json
{
  "schema": "lyra_tool_output_v2",
  "ok": true,
  "tool": "echo_text",
  "content": "hello",
  "error": "",
  "file_changes": []
}
```

失败结果需 `ok=false` 并保留错误语义。`file_changes` 中的路径、before/after 与 Diff 是审查依据，不应只用一段成功文案代替。当前 Diff 展示存在截断，完整项目历史仍应以版本控制为准。

### 宿主回调

需要编辑器、TODO、用户问题或配置刷新时复用[回调接口](/developer/hooks)，不要让 Handler 直接依赖某个 Compose 页面。网络与文件 IO 负责返回结果，控制器负责把状态回到 Main。

## 审批与作用域的执行顺序

先检查工具是否启用、会话与子代理是否有能力，再解析并校验参数；副作用调用进入 `approvalFor` 对应策略后执行，结果回写历史供下一轮使用。保持现有 `executeTool` 的具体顺序和异常处理，新增分支不能在检查之前提前执行。

本机 MCP 的入口显式使用 `skipApproval=true`，设备作用域也有专门分派。因此“接入普通聊天成功”不代表所有入口的审批语义一致，见[MCP 接口](/developer/mcp)和[ScopedAgentTools](/developer/hooks)。

## 文件工具的生命周期

读取旧内容 → 校验目标与匹配 → 请求编辑器接管 → 应用/保存或受控回退 → 生成 Diff → 发送变更回调 → 清理活动标记。失败或取消时保留已发生与未发生的区别。不要把捕获的 `CancellationException` 包装成成功工具输出。

写工具的验证应包括越界、只读子代理、审批拒绝、内容已变与编辑器保存失败；纯 echo 的接线检查不必引入这些平台副作用。
