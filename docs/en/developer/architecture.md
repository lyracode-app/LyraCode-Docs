# Architecture and request flow

Goal: locate the right layer for a change by following one task. The main Android `app` module uses Kotlin and Jetpack Compose; `third_party/jlatexmath` is included as a library module.

## Request flow

```text
Compose / web access / floating entry
  → ChatController and conversation lifecycle
  → OpenAiAgent request and tool loop
  → Protocol adapter → model text or tool call
  → Capability/scope checks → approval → Handler/executor
  → Structured result, file diff and state updates
  → Next model round or completion
```

Text responses and actual tool calls are separate events. Execution features need execution and result handling, beyond prompt or UI changes.

## Source map

Paths below are relative to `app/src/main/java/com/yukisoffd/lyracode/`.

| Layer | Entry points | Responsibility |
| --- | --- | --- |
| Application/UI | `MainActivity.kt`, `ui/app/`, `ui/chat/`, `ui/settings/` | Navigation, conversations, settings |
| Conversation | `ChatController.kt`, `ConversationRunLifecycle.kt` | User actions, state, lifecycle |
| Agent | `ai/agent/OpenAiAgent.kt` | Model loop, protocol requests, dispatch and approvals |
| Tools | `ai/agent/AgentToolSchemaFactory.kt`, `Agent*ToolHandler.kt` | Definitions and domain operations |
| Persistence | `data/ConversationStore.kt`, `data/settings/`, `data/BackupManager.kt` | Chats, configuration, backup |
| Files/commands | `workspace/`, `termux/`, `ssh/`, `system/` | Paths, IO, terminal and system execution |
| Services | `mcp/`, `webaccess/`, `server/` | MCP, phone chat access and static serving |
| Device interaction | `interaction/` | Perception, policy, actions, sessions, overlays and pets |

PRoot managers, architecture detection, executors and tool definitions live under `app/src/debianRuntime/java/`.

## Preserve boundaries

`AgentToolSchemaFactory` determines model-visible definitions; `executeTool` still checks disabled tools, sub-agent permissions, device sessions and approvals. Schema filtering is not a substitute for execution-time checks.

Workspace mutations use the file pipeline to record before/after content and diffs. Direct IO bypasses review evidence. Device tools are scoped to their session and must not escape through Shell, MCP or sub-agents.

Web access shares the Activity's controller and data rather than creating a separate Agent system. Consider phone, browser and floating-entry synchronization when changing state or lifecycle.

Continue with [Agent tools](/en/developer/agent-tools), [Providers](/en/developer/providers) or [Workspaces](/en/developer/workspaces).

## Detailed reading paths

### Structure and dependencies

[Modules](/en/developer/modules) distinguishes Gradle/source-set/application layers, Handlers and resource owners. [Persistence](/en/developer/persistence) describes conversations, messages, branches, archive and migrations.

### Lifecycles and contracts

[Conversation lifecycle](/en/developer/conversation-lifecycle) covers sending, reads, stops, continuation and stale callbacks. [Hooks](/en/developer/hooks) provides actual signatures, threading and editor ownership results.

### Shared capabilities across entry points

[Web access](/en/developer/web-access) uses the controller for state sync; [MCP](/en/developer/mcp) exposes definitions and a dedicated execution entry. Consider session identity and approval behavior separately. Pet JS has its own [module lifecycle](/en/developer/pet-runtime).
