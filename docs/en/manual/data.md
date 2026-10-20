# Backup and migration

Goal: preserve recoverable data before device changes, upgrades or environment changes, and understand backup omissions.

## Export

1. Select content in the backup settings: profiles, conversations, prompts, memories, Skills and service configurations as needed.
2. Explicitly decide whether to include secrets. The default excludes them; including them may place API keys and passwords in the ZIP.
3. Export locally or to configured WebDAV, verify the file exists and has a plausible size, and keep an independent copy.
4. Test restore in a suitable environment when possible, or at least inspect the manifest and selected contents.

An export-success message alone does not prove every required item is present.

## Save these separately

| Data | Treatment |
| --- | --- |
| App settings, chats and Skills | Follow selected options and the backup manifest |
| Keys and service passwords | Only exported when explicitly included; revalidate after restore |
| Workspace projects and shared files | Copy separately or use project version control |
| Linux rootfs, installed packages and internal projects | Save important projects and rebuild information separately; normal backup excludes complete rootfs |
| Android permissions and full-access authorization | Grant again on the destination device |
| Third-party account login state | Excluded from backup/device migration; sign in again |

## Restore

Back up the destination's existing data first. Understand the app's merge/replace choice before importing. Then verify model and service connections, Skills, workspace grants and task configurations individually.

Uninstalling, clearing app data or deleting Linux environments affects private files. Preserve their projects and necessary data beforehand.

## Logs, statistics and diagnostics

See [logs](/en/manual/logs) for request records, [statistics](/en/manual/statistics) for token metrics/model rankings, and [accounts](/en/manual/accounts) for platform quota/login. Check these separate features after migration.

Device diagnostics describe system, architecture, memory and storage for troubleshooting, not definitive authenticity proof. Remove keys, private conversations and real remote addresses from public reports. See the [report checklist](/en/reference/troubleshooting).
