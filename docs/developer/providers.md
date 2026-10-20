# 模型协议与服务商适配

目标：在复用现有协议与新增协议路径之间做正确选择，并保持流式、工具调用和历史语义一致。

## 从配置链路开始

主要入口位于 `ProviderCatalog.kt`、`data/settings/SettingsModels.kt` 中的 `ApiProfile`、`ApiProfileJson.kt`、`ModelRequestCustomization.kt`，以及 `ui/settings/model/`。

服务商如果使用已支持的协议，优先添加或修正预设、地址、路径与能力配置。只有消息格式、流事件或鉴权行为确实不同，才修改协议层。

`ApiProfile.chatEndpoint` 由去尾斜杠的 `baseUrl` 与规范化的 `chatPath` 拼接；模型列表、Responses、Gemini 使用各自构造路径。重复 `/v1`、把完整端点塞到基础地址、模型 ID 前缀处理错误，都是应先排查的配置问题。

## 请求与解析入口

| 协议/行为 | 当前实现入口 |
| --- | --- |
| OpenAI Chat Completions | `ai/agent/OpenAiAgent.kt` 的 `streamOpenAiModel` |
| Responses | 同文件的 `streamResponsesModel`；`ai/ResponsesApiCompatibility.kt` |
| Anthropic | 同文件的 `requestAnthropicModel` |
| Gemini | 同文件的 `requestGeminiModel`；`ai/GeminiHistory.kt` |
| 通用请求定制与重试 | `ai/ModelRequestCustomization.kt`、`ai/agent/AiRequestRetry.kt` |
| 结束、取消与响应状态 | `ai/ModelResponseLifecycle.kt`、`ConversationRunLifecycle.kt` |

物理目录为 `ai/agent/` 的文件，其包声明仍可能是 `com.yukisoffd.lyracode.ai`；不要仅按目录推断 import。

## 适配步骤

1. 获取脱敏后的真实请求、正常流事件、工具调用事件与错误样本。
2. 先确定配置能否解决，再定位鉴权、请求体、历史、流式解析或结果转换。
3. 保持文本、推理内容、工具 ID/参数片段、结束原因和用量字段的语义。
4. 处理取消、空事件、不完整工具参数及服务端错误，避免把中途断流当作完整成功。
5. 验证工具执行后的下一轮历史，确保不会重复执行或遗失工具结果。

不要只用一次“你好”验证适配成功。至少验证文本流、一次工具调用往返、取消、错误响应，以及该协议涉及的视觉或推理能力。

## 回归与日志

相关测试包括 `ChatCompletionsCompatibilityTest`、`ResponsesApiCompatibilityTest`、`GeminiHistoryTest`、`ModelToolPayloadTest`、`ModelResponseLifecycleTest` 和 `ModelRequestCustomizationTest`，位于 `app/src/test/java/.../ai/`。HTTP 审计入口为 `ai/ModelHttpAudit.kt`；记录样本时去除密钥和私人上下文。

完成后同步[用户模型配置说明](/manual/models)，写清哪些差异由应用处理，哪些仍要求服务端能力。

## 适配层的输入与输出契约

### 配置与端点

`ApiProfile` 保存协议、基础地址、路径、密钥与模型配置；请求定制层处理 Header/JSON。预设解决地址和默认项，协议实现解决消息与事件格式。不要因为某个服务商缺省参数不同就复制整套流解析器。

### 历史转换

| 输入记录 | 必须保留的语义 |
| --- | --- |
| user | 正文、附件、视觉路由与消息顺序 |
| assistant | 正文、thinking 与关联工具调用 |
| tool | 调用 ID 与真实结果，包括失败 |
| 压缩上下文 | 摘要与保留历史的边界 |

工具调用和结果必须匹配。同一 assistant 多个工具调用时不能只保留最后一个；被中断的工具轮次也不能在转换时产生孤立结果。Anthropic/Gemini 与 OpenAI 的块结构不同，沿现有 history helper 处理。

## 流式事件生命周期

### 建立与接收

构造最终请求 → HTTP 状态校验 → 读取事件 → 聚合文本/thinking/工具参数 → 识别终止 → 关闭响应。Header 或正文定制之后仍应保留模型能力与参数兼容处理。

### 聚合工具参数

参数可能跨多个事件到达，片段未闭合时不能提前执行。按调用 ID/索引归并，完整解析后交给统一执行层；重复事件不能引发重复副作用。文本更新使用 `ChatUpdate` 返回宿主，不在解析器中直接修改 UI。

### 结束与失败

终止事件触发停止读取，即使服务器保持连接；EOF、读取超时、用户取消和服务端错误分别处理。复用 `useModelResponse` 与 `consumeModelStream` 关闭 Socket，细节见[请求生命周期](/developer/conversation-lifecycle)。

## 一个适配排查示例

若文本正常而工具调用第二轮报错，依次保存脱敏的首轮调用、工具结果与第二轮请求，核对 call ID、参数 JSON、role 和结束标记。先用固定样本复现 history 转换，再考虑调整协议代码；不要用屏蔽工具结果的方式让请求表面成功。

新增协议或字段时同步用量、审计、备份/历史恢复和[数据模型](/developer/persistence)；模型冒烟测试不能替代完整工具往返验证。
