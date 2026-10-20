# Troubleshooting by symptom

Preserve the error and current state first. Change one condition at a time and avoid repeating side effects while diagnosing.

| Symptom | Check in order | Success |
| --- | --- | --- |
| No model reply | Network → endpoint/protocol → key → model ID → status | Short text response |
| Chat without tools | Model support → pure-prompt mode → switches → environment/grants | Real read-only call succeeds |
| Missing file/change | Conversation/workspace → relative path → grant → Linux ID | Listing and read target the same file |
| Exact edit fails | Reread current content → text/line numbers → concurrent changes | Expected small diff |
| PRoot import fails | Runtime ABI → rootfs architecture → tar/gzip → shell → storage | Enabled instance runs `pwd` |
| Missing shared mount | All files access → real path → terminal reconnect → Android restrictions | Current process sees directory |
| Linux links/dependencies fail | Shared-storage location → internal workspace → toolchain | Relevant install/test passes |
| Termux unavailable | Installed/launched → external-call setting → `RUN_COMMAND` | `run_command` runs `pwd` with exit 0 |
| Server starts but page fails | Logs → actual port → local access → LAN grants/listener → isolation | Successful request and page |
| Resource 404 | Root → case-sensitive filename → relative URL | Resource request succeeds |
| Computer cannot open phone chat | Web-access state → LAN URL → reachability → access code | Same conversation appears and responds |
| MCP failure | HTTP URL → authentication → transport → protocol → schema | Listing and business call work |
| Delayed schedule | Enabled/next run → time zone → network → power policy → errors | Actual run and result |
| Device unresponsive | Accessibility → overlay → Shell/vision capability → fresh snapshot | Resulting state meets goal |
| Pet fallback icon | Manifest/paths → syntax → default lifecycle export → events | Settings remains usable and module mounts |
| Missing restored models/Linux data | Options/manifest → secrets → separate rootfs/project backup | Connections and files verify |

## Report a reproducible issue

Include application version/build, Android version and architecture, entry screen, expected/actual behavior, minimal steps, sanitized errors and reproducibility.

For models, add protocol, model ID and HTTP status. For commands, add environment, working directory, command, exit code and stderr. For files, identify workspace type and relative path. For services, include bind mode, port and relevant logs.

Exclude keys, passwords, complete authorization headers, backups with secrets and unrelated private messages. Report through the [application issue tracker](https://github.com/lyracode-app/Lyra-Code/issues).
