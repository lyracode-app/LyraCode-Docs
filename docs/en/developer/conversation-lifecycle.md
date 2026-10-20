# Conversation and request lifecycle

Persisted conversations, Agent runs, HTTP responses and background processes have separate lifetimes. Follow their ownership through sending, tool rounds, cancellation and continuation.

## State and ownership

| Object | Owner/entry | Lifetime end |
| --- | --- | --- |
| History and metadata | `ConversationStore` | Explicit deletion; survives a run |
| Run Job | `ChatController` | Completion, error or cancellation with cleanup |
| Per-conversation gate | `ConversationRunGate.run` | After block and cancellation cleanup |
| HTTP response | `Call.useModelResponse` | Completion/error/cancellation and close |
| Approval/question waiter | Controller | Answer, rejection, interruption or cleanup |
| Background process | Runtime/executor | Separate stop or environment shutdown |

Persisted states are mainly `idle`, `running` and `interrupted`. Approval, compression and network phases also use operation/UI state; status text is not a database enum.

## Sending a message

### 1. Controller accepts input

`send` validates text/attachments, creates a persisted conversation if needed, restores its workspace and selects model configuration. It writes the user message, refreshes lists and starts the run Job.

### 2. Agent receives persisted input

`OpenAiAgent.chat` runs on IO. The controller supplies `userMessagePersisted=true` to avoid duplicate insertion. Direct callers must decide who persists the user message.

```kotlin
// Simplified controller-context example; the host supplies these objects.
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

`ChatUpdate` carries full `content`, `thinking`, `status`, `messageId` and speed/cache metrics. The controller replaces the matching record's displayed content rather than blindly concatenating token deltas.

### 3. Tool rounds

`runLoop` checks cancellation/scope, builds history and tools, and invokes the protocol implementation. Tool calls pass execution checks/approval, persist results and feed another request. A final model reply leads to run completion.

## Response termination and cancellation

### Response ownership

`useModelResponse` in `ai/ModelResponseLifecycle.kt` uses `Response.use` and cancellation monitoring. Cancellation calls `Call.cancel()` even while `execute()` or body reads block.

### Terminal stream events

`consumeModelStream` stops when its callback returns `false`, without waiting for TCP closure. Parsers must distinguish terminal events from incomplete streams. Reuse response management and `MODEL_RESPONSE_READ_TIMEOUT_SECONDS` rather than bypassing it.

## Stop, continue and switch

`stopActive` cancels the Job, marks `interrupted`, resolves associated approval/question waiters and refreshes history. Propagate `CancellationException` and release temporary state in `finally`.

`continueActive` accepts interrupted, inactive conversations and restores the workspace before continuation. `ConversationRunGate` uses a Mutex per conversation and retains ownership through cancellation cleanup.

Switching conversations does not cancel all tasks. Guard asynchronous history and callbacks by conversation ID. `reloadMessages` combines a read lock, cancellation and buffered updates so stale reads cannot replace the newly selected conversation.

## Validation scenarios

Cover cancellation during blocked reads, terminal events without connection closure, immediate stop/continue, old callbacks after switching, interruption during approval and complete history after tool failure. Start with `ConversationRunLifecycleTest` and `ModelResponseLifecycleTest`; see [testing](/en/developer/testing). Validate background processes separately under [runtimes](/en/developer/workspaces).
