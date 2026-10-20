# Data models and persistence

Projects, conversations, branches, settings, audit and usage have different storage paths. New fields must support saving, recovery and state refresh together.

## Storage entries

| Data | Source | Contract |
| --- | --- | --- |
| Projects, conversations, messages | `data/ConversationStore.kt` | SQLite tables, queries and transactions |
| Agent/UI records and updates | `ai/agent/AgentModels.kt` | `ChatRecord`, `ChatUpdate` |
| Provider/model/feature configuration | `data/settings/` | AppSettings, models and JSON conversion |
| Audit | `data/AuditLogStore.kt`, `ai/ModelHttpAudit.kt` | Request/tool diagnostics |
| Usage | `data/UsageStatistics.kt`, `UsageTokenIndex.kt` | Aggregation and token indexing |
| Import/export | `data/BackupManager.kt` | Selection, secrets and restoration |

A workspace URI references separate file data. Copying records does not copy project directories, and app backup is not a complete Linux image.

## Conversation and message fields

### Conversation

Stored fields include title, status, `profile_id`, model, timestamps, pin/archive, mode, workspace URI, compression summary/boundary/thresholds and project ID. Projects have separate name, workspace and archive state.

### Message

Messages retain conversation, role, content, thinking, provider/model origin, tool call ID, raw JSON, speed/cache metrics and time. New protocol fields must survive history serialization as well as immediate display.

## Branch transaction example

```kotlin
// Inside an existing ConversationStore caller.
val branchId = store.createConversationBranch(
    sourceConversationId = sourceId,
    throughMessageId = messageId,
    title = "Alternative approach",
)
check(branchId > 0L) { "Invalid source or branch point" }
```

The boundary must belong to the source conversation and have user/assistant role. Invalid IDs indicate no creation. A transaction inserts a conversation and copies messages through the boundary, clears compression summary/boundary, preserves thresholds/model/project/workspace and resets running/pin/archive state.

TODOs and conversation auto-approval are extra controller state copied by `ChatController.createConversationBranch`. Calling the Store directly does not copy them or restore historical files.

## Archive and deletion

Project/conversation archive flags are separate; queries also account for parent project archive state. Project deletion transactionally removes its conversations, messages and usage. The controller cancels related Jobs and clears memory state. Include new related tables in deletion paths.

## Add a field

1. Update table creation and `onUpgrade` with defaults for old data.
2. Update readers/writers, models, import/export and branch copying.
3. Review backup merge/replace and secret filtering.
4. Refresh UI and browser snapshots through existing controller mechanisms.
5. Validate old-data upgrades, edits, branching, archive/restore and backup/restore.

Deleting the database is not a migration test. Account sessions and model keys have distinct [backup rules](/en/manual/accounts). See [lifecycle](/en/developer/conversation-lifecycle) for state propagation.
