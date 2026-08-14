---
title: Agent Tools
---

## 5. The Agent Tool System

Agent tools are the heart of Lyra Code. All tools are exposed to AI in an **approvable, disable-able and auditable** way.

### 5.1 Tool categories

| Category | Representative tools | Notes |
| --- | --- | --- |
| Files & directories | list_directory / search_files / get_file_info / create_folder / rename_move / delete | native ops inside the workspace |
| File I/O | read_file / read_file_lines / write_file / edit_file / append_file | precise in-place editing; automatic .bak |
| Global storage | global_* tools | Android shared storage (/storage/emulated/0), outside the workspace |
| Download | download_file | native HTTP/HTTPS, redirects, headers, SHA-256 |
| Commands | run_command | Termux shell, non-interactive |
| System | execute_shell_command / execute_root_command | require Shizuku / Root, separately authorized |
| Planning | set_todo_list / update_todo_item | progress management for multi-step tasks |
| Web | web_search / read_web_page / mark_web_sources | search, page reading, source attribution |
| Remote | ssh_exec / list_emails / webdav_* / file_transfer_* | remote servers |
| Scheduled | manage_scheduled_tasks | once / daily / weekly / monthly |
| Backup | export_backup / import_backup | local or WebDAV |
| Misc | get_current_time / get_current_location / get_device_hardware_info / list_installed_apps | time, location, device info |

### 5.2 Workspace vs global storage

```text
Workspace: native file tools (read_file / edit_file, ...) operate only inside the selected workspace, with relative paths.
Global: global_* tools can access the whole /storage/emulated/0 (except Android/data, Android/obb, /data).
```

- The default workspace is e.g. `/storage/emulated/0/Lyra`; use relative paths like `src/main.kt` in tools;
- do not pass Termux-private paths (e.g. `/data/data/com.termux`) to native file tools - they will be rejected;
- `Download` and `Downloads` both map to `/storage/emulated/0/Download`.

### 5.3 File search

| Scenario | Tool |
| --- | --- |
| Find files by name/fragment in the workspace | search_files (query = name fragment only, path = "." or a subdirectory) |
| Find files outside the workspace | search_files first; if SEARCH_EMPTY, use global_search_files once |
| Search file contents | use `rg` (preferred), fall back to `grep -r` |
| Remote storage | webdav_search / file_transfer_search |

::: warning
`search_files` only matches file names/paths - it does **not** search file contents.
:::

### 5.4 Native downloads

```text
download_file
  - url: HTTP/HTTPS address
  - path: target path (workspace-relative, or global path)
  - headers: e.g. "Authorization: Bearer xxx"
  - sha256: optional integrity check, fails on mismatch
```

Prefer `download_file` over curl/wget - it has progress, redirect handling and verification.

### 5.5 TODO planning

For multi-step tasks, AI creates a TODO list (3-7 items with pending / running / completed / blocked states):

- simple chats, single edits and single commands do **not** need a TODO;
- tasks spanning multiple files, stages or risky operations must have one;
- you can ask AI to show or adjust the TODO at any time and force it to work step by step.

### 5.6 Web search & sources

- `web_search` returns candidate titles/URLs/snippets; snippets are leads, not evidence;
- `read_web_page` opens the page and reads the body; **trust only what is actually read**;
- `mark_web_sources` records sources actually used, and the answer includes links;
- website blocklist: add domains in Settings so AI cannot open them (exact match, `*.x.com` wildcard supported).

### 5.7 Approvals & auditing

Every state-changing tool call (file writes, commands, emails, remote operations) goes through your confirmation.

- Tool results come back as structured JSON (schema / ok / content / error / file_changes);
- `ok=true` only means the call completed - check exit_code and output for command success;
- file changes include a diff for review;
- every tool can be disabled individually in the Agent tools page.

---