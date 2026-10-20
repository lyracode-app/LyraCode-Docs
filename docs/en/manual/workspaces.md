# Select a workspace

Goal: choose the right project location and ensure edits, commands and previews use the same files.

## Choose storage

| Workspace | Suitable for | Considerations |
| --- | --- | --- |
| Shared storage | Documents, static pages and files shared with other apps | Android directory grants; limited Unix permissions, symlinks and execution semantics |
| PRoot-internal directory | Linux projects with dependencies, symlinks and executables | Select an enabled Linux ID first; app-private data is removed on uninstall |

Choose shared storage or proot in the workspace picker. PRoot workspaces use app-private files and generally need no shared-storage grant. Android display paths, Linux paths and Termux-private paths identify different locations.

## Verify selection

Ask the Agent to list the root and read a known file. Workspace tools use relative paths such as `src/main.js`; `.` means the root. Do not pass `/storage/...` or Termux-private paths to `read_file`.

A directly accessible workspace can be mounted at `/workspace` in PRoot. A document-provider-only URI may not have a bindable filesystem path. Use a PRoot-internal workspace or an accessible shared directory when this blocks command access.

## Files and editor entries

The sidebar [file manager](/en/manual/files) handles browsing and organization. The [code editor](/en/manual/editor) handles manual and AI editing. Check the opened path and the conversation workspace separately.

Read the relevant region before exact replacement or line-range editing, then verify through [change review](/en/manual/review).

## Files outside the workspace

`global_*` tools access permitted Android shared storage outside the workspace, using their own permissions and directory restrictions. They do not grant access to other apps' private data. Select the correct workspace for project tasks; check absolute targets when expanding scope.

## Common issues

- **Missing new file:** check conversation, workspace, Linux ID and whether another environment received the write.
- **Dependency or symlink failures:** move the project into PRoot-internal storage for Linux filesystem semantics.
- **Expired directory grant:** grant access again and verify with a directory listing.
- **Deleting a Linux instance:** separately save its projects first; ordinary app backup excludes rootfs.

Implementation and path tests are described in [Workspaces and runtimes](/en/developer/workspaces).
