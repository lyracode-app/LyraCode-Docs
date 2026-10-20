# Developer entry and source map

For application changes, extensions and documentation maintenance. To use the app for your own projects, start with the [manual](/en/manual/).

## Project and architecture

### Understand structure

[Build](/en/developer/build), then read [architecture](/en/developer/architecture) and [modules/dependencies](/en/developer/modules). These distinguish Gradle modules, source sets, UI, orchestration, Handlers, data and platform capabilities.

### Trace state

[Lifecycle](/en/developer/conversation-lifecycle) covers sends, tool rounds, cancellation, continuation and resource ownership. [Callbacks/scopes](/en/developer/hooks) documents signatures, timing and editor ownership examples. [Persistence](/en/developer/persistence) covers branch transactions, archive, migrations and backup boundaries.

## Choose an implementation guide

| Change | Guide |
| --- | --- |
| Tools, arguments, results or approvals | [Tool contracts](/en/developer/agent-tools) |
| Providers, history or stream parsing | [Provider/stream adaptation](/en/developer/providers) |
| URIs, edits or Linux processes | [Workspace/runtime APIs](/en/developer/workspaces) |
| External or phone MCP | [MCP protocol/APIs](/en/developer/mcp) |
| Browser actions, snapshots or uploads | [Web bridge/state sync](/en/developer/web-access) |
| Skill discovery/package loading | [Extensions](/en/developer/extensions) |
| Pet JS, events or disposal | [Pet lifecycle](/en/developer/pet-runtime) |
| Validation | [Testing/debugging](/en/developer/testing) |
| Pages, navigation, translation, deployment | [Documentation maintenance](/en/developer/documentation) |

## Repositories and command locations

[Application source](https://github.com/lyracode-app/Lyra-Code) contains Android, runtimes and tests. [Documentation source](https://github.com/lyracode-app/LyraCode-Docs) contains VitePress, navigation and examples. A local `vite_docs/` checkout retains separate Git history. Run Gradle in the application root and npm in the documentation repository.

Short Kotlin paths usually refer to `app/src/main/java/com/yukisoffd/lyracode/`; PRoot lives in `app/src/debianRuntime/`. Package declarations may differ from physical directories.

## Examples and delivery

API pages identify teaching fragments, host-supplied variables and runnable examples. Complete downloads are in [examples](/en/examples/). Report trigger, behavior, actual validation and remaining limits. UI, permissions and runtimes require suitable device checks.

The application README accepts organization-member PRs; contact administrators to join. Original code uses AGPLv3 and third-party components retain their licenses. Read `LICENSE` and `THIRD_PARTY_NOTICES.md` before redistribution.
