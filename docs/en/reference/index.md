# Reference

Use the [manual](/en/manual/) for procedures and the [developer guide](/en/developer/) for implementation. This section helps locate parameters, permissions and failures.

| Question | Page |
| --- | --- |
| File/command parameters and results | [Tools and arguments](/en/reference/tools) |
| Feature permissions and accessible data | [Permissions and scope](/en/reference/permissions) |
| Failed models, missing files or unreachable services | [Troubleshooting](/en/reference/troubleshooting) |
| Version differences | [Release scope](/en/changelog) |

## Source of truth

Current tool schemas live in `AgentToolSchemaFactory.kt` and PRoot's `DebianCommandToolDefinition.kt`. Model-visible tools also depend on configuration, environment, session scope and disabled lists; a documented name does not guarantee availability in every conversation.

Use `app/build.gradle.kts` for platform/build settings, actual Android grants and tool results for permissions, and current remote responses for service behavior. Old screenshots, model claims and TODO state do not replace evidence.

See [Architecture](/en/developer/architecture) for source locations and [Documentation maintenance](/en/developer/documentation) for updates.
