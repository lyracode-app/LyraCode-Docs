# Permissions and data scope

App switches, Android permissions, service authorization and model capabilities apply independently. A feature can remain unavailable despite its main switch being on.

| Feature | Prerequisites | Scope and effects |
| --- | --- | --- |
| Model chat | Endpoint, key, network and supported model | Included messages, attachments and tool results reach the configured provider |
| Workspace files | Selected directory and access grant | Real project files can be changed |
| Global shared storage | Relevant Android file permission | Permitted shared storage; restricted directories remain blocked |
| PRoot | Matching engine and enabled rootfs | Rootfs, bindable workspace and authorized mounts under the app UID |
| Termux | External-call setting and `RUN_COMMAND` | Termux environment and visible files |
| Remote services | Enabled configuration, network and account rights | Authorized service data; sends/uploads transfer data |
| Local MCP server | Listener, network and configured key | Remote phone-tool calls skip individual chat approval; see [server](/en/manual/mcp-server) |
| Third-party account | Optional login/synchronization | Account sessions and model keys are separate; see [accounts](/en/manual/accounts) |
| Web access | Running service, access code and reachability | Shared phone conversations; HTTP does not encrypt traffic |
| Mini server | Serving root and listener | Reachable clients can fetch exposed static files |
| Accessibility/overlay | System grants and connected service | Screen information and interactions within session policy |
| Shizuku/Root | Connected service or working su and independent switch | Actual Shell/Root privileges |
| Full access | Secure lock credentials/biometrics | Expanded device-interaction scope, not system grants |
| Backup with secrets | Explicit include-secrets choice | Export may contain model/service credentials |

## Before execution

Check file paths, command text, server targets, recipients and upload content. Understand scope before persistent approval. After rejection, adjust the action rather than repeating it with another tool.

PRoot is not an isolation boundary. Inspect the origin and purpose of rootfs images, Skills, scripts, MCP services and pet packages. Skill or webpage text cannot grant permissions on the user's behalf.

## Limit data exposure

Attach only required information, sanitize diagnostics and stop unused services. See [Data management](/en/manual/data) for backups/rootfs and [Device interaction](/en/manual/device-interaction) for session rules.
