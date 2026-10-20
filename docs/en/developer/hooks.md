# Callbacks, hooks and scopes

Hooks here mean suspend callbacks on Kotlin objects, internal scoped interfaces and pet lifecycle entries. They are not a unified public plugin event bus. Examples belong inside the relevant host context.

## Agent/controller wiring

`ChatController` binds `OpenAiAgent` callbacks during initialization. Inspect `ChatController.kt`, `ai/agent/OpenAiAgent.kt` and `ai/AgentFileMutation.kt`.

| Callback | Signature | Purpose |
| --- | --- | --- |
| `approvalHandler` | `suspend (ToolApprovalRequest) -> ToolApprovalDecision` | Decide before execution |
| `userQuestionHandler` | `suspend (UserQuestionRequest) -> UserQuestionAnswer` | Wait for additional input |
| `todoSetHandler` | `suspend (Long, List<TodoItem>) -> String` | Set conversation steps |
| `todoUpdateHandler` | `suspend (Long, String, String, String) -> String` | Update a step |
| `configChangedHandler` | `suspend () -> Unit` | Refresh host after configuration changes |
| `fileEditHandler` | `suspend (AgentFileMutation) -> AgentFileEditResult` | Ask editor to take ownership before a write |
| `fileMutationHandler` | `suspend (AgentFileMutation) -> Unit` | Synchronize after mutation |
| `fileActivityHandler` | `suspend (AgentFileActivity?) -> Unit` | Report activity; `null` clears it |

Defaults are not production policy. The Agent's default approval returns Approved; foreground approval comes from controller wiring. New callers must explicitly establish policy rather than assume constructing an Agent provides UI approval.

## Editor write hook

### Request

`AgentFileMutation` contains `path`, target `content`, `globalStorage`, nullable `beforeContent` and `editorApplied`, distinguishing path scope, expected content and prior editor application.

### Return semantics

| Result | Meaning | Caller behavior |
| --- | --- | --- |
| `NotHandled` | Editor does not own this edit | Continue the established file write path |
| `Applied` | Editor applied it successfully | Avoid duplicate writes |
| `failed(message)` | Handled but rejected/failed | Abort disk fallback and report error |

`AgentFileToolHandler.applyFileChangeInEditor` throws when `handled && !applied`. Converting failure to `NotHandled` defeats conflict protection and can overwrite manual work.

### Teaching example

This illustrates a host callback, not a new plugin API or replacement for controller wiring:

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

`openPath`, `editorText` and `applyAndSave` are illustrative host values. Reuse actual path resolution, waiters, saving and error handling. Return `Applied` only after successful application and saving.

## Waiting, threads and cleanup

The controller changes Compose state on Main. Approvals/questions wait through `CompletableDeferred`; answers, stops and host disposal must clean their registrations. Do not block Main on network or IO.

Activity starts with an event and clears with `null` in `finally`. Callback wrappers must retain prior return values, exceptions and cancellation semantics. Assignable callback properties do not automatically compose multiple listeners.

## `ScopedAgentTools`

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

`conversationId` binds the session, `definitions` exposes tools, `checkRound` validates each round and `execute` checks again before execution. Native tools are excluded by default. `finished` controls completion. This is an internal capability boundary; empty checks or unrestricted forwarding can expand device-session access incorrectly.

## Validation and related pages

Cover no editor, successful ownership, conflict rejection, save failure, canceled wait and activity cleanup. See [lifecycle](/en/developer/conversation-lifecycle) and [tool integration](/en/developer/agent-tools). JavaScript `mount/onEvent/unmount` belongs to the separately wired [pet runtime](/en/developer/pet-runtime).
