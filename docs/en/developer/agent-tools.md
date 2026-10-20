# Add an Agent tool

Goal: connect a built-in tool from model definition through execution and result handling. This example uses side-effect-free `echo_text`; it is illustrative and is not currently built into the app.

## Define the contract

Add this to the existing definition chain in `ai/agent/AgentToolSchemaFactory.kt`:

```kotlin
.put(function("echo_text", "Return the supplied text unchanged; maximum 200 characters.", "text" to "string"))
```

`function` is a private helper in that file, not a standalone API. Use `functionWithOptional` when appropriate. File and command tools should also reuse current text and multiline argument handling.

## Dispatch execution

Add a branch to the existing `when (call.name)` inside `OpenAiAgent.executeTool`:

```kotlin
"echo_text" -> {
    val value = args.getString("text")
    require(value.length <= 200) { "text must contain at most 200 characters" }
    ToolExecution(value)
}
```

The snippet depends on `args` and `ToolExecution` in that method. Put substantial implementation in a domain Handler and use appropriate dispatchers for blocking IO.

Preserve `toToolOutputJson`, whose outer schema is `lyra_tool_output_v2` with `ok`, `tool`, `content`, `error` and `file_changes`. Exceptions and failed operations must retain failure semantics.

## Complete integration

| Location | Question |
| --- | --- |
| Schema factory | Are dependencies available, and are disabled/scope filters applied? |
| `executeTool` | Are disabled tools, invalid arguments and cancellation handled? |
| `approvalFor` | Are side effects and full targets shown? Read-only echo needs no new mutation approval |
| Sub-agent access/write coordination | Is the capability allowed, with constrained write paths? |
| `ScopedAgentTools` and device sessions | Is the capability explicitly granted rather than inherited? |
| `ui/settings/system/SettingsPermissionToolScreens.kt` | Does `agentToolCatalog()` expose a toggle with localized resources? |
| MCP and web access | Are exposure, approval semantics and settings consistent? |

Add Chinese and English Android string resources for the catalog. Even this permission-free example needs a check that disabling it prevents execution.

## Verify

Check normal, empty, oversized and missing arguments, disabled state and unauthorized session entry points. For side effects, also check rejection, failures and path boundaries.

Perform an actual device call and inspect its card, result and any diff. Update the [tool reference](/en/reference/tools) and relevant manual with the final schema.

## Three contract layers

### Model-visible definitions

Schemas declare names, descriptions, types and required fields. Execution must still validate missing fields, types, bounds and paths. Keep optional defaults consistent between schema and Handler.

### Execution output

`ToolExecution` carries content and file changes; `toToolOutputJson` creates the shared envelope. The teaching echo result is:

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

Failures require `ok=false` and error semantics. File-change paths, before/after and diffs support review rather than a success sentence alone. Displayed diffs can be truncated; use version control for complete project history.

### Host callbacks

Reuse [hooks](/en/developer/hooks) for editor integration, TODOs, questions and configuration refresh instead of depending directly on Compose pages. IO produces results; the controller marshals state to Main.

## Approval and scope

Check enabled state and conversation/sub-agent capabilities, parse/validate arguments, apply `approvalFor` policy for side effects and return persisted results to the next model round. Preserve the actual ordering and error handling in `executeTool`; do not execute new branches before shared checks.

Local MCP explicitly uses `skipApproval=true`, while device scopes have dedicated dispatch. Successful ordinary-chat integration does not establish identical approval behavior elsewhere. See [MCP](/en/developer/mcp) and [ScopedAgentTools](/en/developer/hooks).

## File-tool lifecycle

Read old content → validate target/matches → request editor ownership → apply/save or controlled fallback → generate diff → notify mutation → clear activity. Preserve what did/did not happen on failure or cancellation. Do not turn `CancellationException` into successful tool output.

Writable tools need checks for traversal, read-only sub-agents, rejection, changed content and save failure. Pure echo integration does not require those platform side effects.
