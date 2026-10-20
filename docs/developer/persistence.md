# 数据模型与持久化

本页说明会话、项目、分支、配置、审计与用量分别存在哪里，便于增加字段时完整处理保存、恢复和界面刷新。

## 数据入口

| 数据 | 源码入口 | 使用方式 |
| --- | --- | --- |
| 项目、会话、消息 | `data/ConversationStore.kt` | SQLite 表、事务与查询方法 |
| UI/Agent 消息和更新 | `ai/agent/AgentModels.kt` | `ChatRecord` 与 `ChatUpdate` |
| 服务商、模型与功能配置 | `data/settings/` | `AppSettings`、`SettingsModels` 及 JSON 转换 |
| 审计记录 | `data/AuditLogStore.kt`、`ai/ModelHttpAudit.kt` | 请求与工具诊断 |
| 用量 | `data/UsageStatistics.kt`、`UsageTokenIndex.kt` | 记录聚合与 Token 索引 |
| 导入导出 | `data/BackupManager.kt` | 备份选择、秘密与恢复处理 |

工作区 URI 是引用，项目目录和 Linux rootfs 是独立文件数据。复制会话记录不复制目录，应用备份也不等于完整环境镜像。

## 会话与消息字段

### 会话

会话保存标题、状态、`profile_id`、模型、时间、置顶/归档、模式、工作区 URI、压缩摘要/边界/阈值与项目 ID。项目另有名称、工作区与归档状态。

### 消息

消息保存所属会话、role、正文、thinking、模型来源、tool call ID、raw JSON、速度/缓存指标与时间。新增协议字段应考虑后续历史序列化，而不只让当前 UI 显示。

## 分支事务示例

```kotlin
// 在已有 ConversationStore 调用上下文中。
val branchId = store.createConversationBranch(
    sourceConversationId = sourceId,
    throughMessageId = messageId,
    title = "Alternative approach",
)
check(branchId > 0L) { "Invalid source or branch point" }
```

接口验证分界消息属于源会话且 role 为 user/assistant，返回无效 ID 表示未创建。事务内创建新会话并复制截至该 ID 的消息；清空压缩摘要和边界，保留阈值、模型、项目与工作区，重置运行/置顶/归档。

TODO 与会话自动批准属于控制器的额外状态，由 `ChatController.createConversationBranch` 复制。直接调用 Store 不会自动复制这些内存状态，也不会还原文件到历史时刻。

## 归档与删除

项目和会话分别保存归档标记；列表查询还考虑所属项目的归档状态。删除项目通过事务删除所属会话、消息与用量记录，控制器同时取消相关 Job 并清理内存状态。新增关联表时需检查该删除路径，避免遗留记录。

## 增加字段的步骤

1. 修改表创建与 `onUpgrade`，为旧版本确定默认值。
2. 更新读取/写入、数据类、导入导出与分支复制逻辑。
3. 检查备份合并/覆盖及秘密过滤，避免新字段隐式导出凭据。
4. 通过控制器现有刷新机制更新 UI 与网页快照。
5. 用旧数据升级、创建、修改、分支、归档/恢复、备份/恢复验证。

不要以删除数据库代替迁移验证。账号登录态与模型 Key 的备份规则不同，见[第三方账号](/manual/accounts)。生命周期和界面更新见[会话生命周期](/developer/conversation-lifecycle)。
