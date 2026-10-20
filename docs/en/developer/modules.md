# Modules and dependencies

Use this page to choose the implementation layer. Gradle modules, source sets and Kotlin packages are different structures.

## Project structure

```text
settings.gradle.kts
├─ :app                         Android application/platform integration
│  ├─ src/main/java/...          UI, Agent, data, services and device capabilities
│  ├─ src/main/assets/           Web access, chart and pet runtime resources
│  ├─ src/debianRuntime/         PRoot implementation/runtime resources
│  └─ src/test/                  Local regression tests
└─ :jlatexmath                  third_party/jlatexmath formula library
vite_docs/                      Independent VitePress documentation repository
```

`debianRuntime` is an application source set. Reuse its Linux manager rather than reimplementing it elsewhere. Some `ai/agent` files declare `com.yukisoffd.lyracode.ai`; inspect declarations before adding imports.

## Application responsibilities

Paths below are relative to `app/src/main/java/com/yukisoffd/lyracode/`.

| Layer/path | Input and output | Boundary |
| --- | --- | --- |
| `ui/app/`, `ui/chat/`, `ui/settings/` | Events → controller; state → Compose | Do not bypass tool execution for writes |
| `ChatController.kt` | Actions → Jobs/Store/Agent; updates → UI state | Own active sessions, waiters and state propagation |
| `ai/agent/` | History/config → requests → tool results | Keep protocol parsing separate from platform work |
| `data/`, `data/settings/` | Structured records, settings, backups | Preserve transactions, migrations and secret export rules |
| `workspace/` | URI/relative path → files/index | Centralize resolution, grants, conflicts and changes |
| `mcp/` | HTTP/JSON-RPC ↔ tools | Manage client and local server separately |
| `webaccess/` | Browser actions ↔ shared controller | Validate session revisions and synchronize state |
| `termux/`, `ssh/`, `system/` | Commands → platform results | Respect environment-specific permissions/processes/paths |
| `interaction/` | Device sessions, perception, actions, floating UI | Scoped tools and actual capability checks |

## Handler responsibilities

| Class | Responsibility |
| --- | --- |
| `AgentFileToolHandler` | Files, diffs, editor cooperation and activity feedback |
| `AgentRemoteToolHandler` | Remote service operations |
| `AgentKnowledgeToolHandler` | Memory and knowledge operations |
| `AgentAutomationToolHandler` | Automation and tasks |
| `AgentConfigToolHandler` | Configuration and change notifications |

`OpenAiAgent` orchestrates availability, scope, approvals and dispatch. Put complex operations in the relevant Handler instead of mixing IO, UI and protocol logic in a dispatch branch.

## Example: add a file operation

1. Define the schema with workspace-relative paths.
2. Reuse execution checks and dispatch to the file Handler.
3. Use file managers for resolution/IO, editor hooks and diffs.
4. Return controller updates for UI rendering without a second UI-owned write.

See [tool integration](/en/developer/agent-tools) and [hooks](/en/developer/hooks).

## Ownership and cleanup

Activity/application entry points assemble objects; the controller connects Agent callbacks and local MCP binds through `attachAgent`. Define each service's creator, owner, stop action and close/cancellation path. Do not retain listeners, sockets or waiters after their owner ends. See [lifecycle](/en/developer/conversation-lifecycle) for request/session cleanup.
