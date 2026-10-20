# Tools and arguments

This page covers common calls and tool families. The current source defines the complete schema. JSON below represents tool argument objects, not commands the user must type manually.

## Workspace files

| Tool | Required arguments | Notes |
| --- | --- | --- |
| `list_directory` | `path` | `.` is the root |
| `read_file` | `path` | Text file up to 1 MB |
| `read_file_lines` | `path` | Optional `start_line`, `line_count`; files up to 16 MB |
| `write_file` | `path` | Create/replace with exactly one of `content`, `content_lines` |
| `edit_file` | `path` | Exact text or line-range edit after reading context |
| `append_file` | `path` | Append using the same content rules |
| `create_folder` | `path` | Create inside workspace |
| `rename_move` | `from`, `to` | Move/rename inside workspace |
| `delete_file_or_folder` | `path` | Delete a file or empty directory |
| `search_files` | `query`, `path` | Name, extension or path-fragment search |
| `get_file_info` | `path` | Metadata |

Use workspace-relative paths. `content_lines` is an array of strings, not a serialized array. `ensure_trailing_newline` controls the final newline. Distinguish replacement from editing existing files.

```json
{"path":"hello.txt","content_lines":["Hello, Lyra Code!"],"ensure_trailing_newline":true}
```

Exact editing uses `old_content`/`new_content` or matching `_lines` arrays. The default expects one match; use `expected_replacements` explicitly when needed. Range mode uses inclusive, one-based `start_line` and `end_line`; do not mix locator modes.

```json
{"path":"hello.txt","old_content":"Hello, Lyra Code!","new_content":"Verified.","expected_replacements":1}
```

`global_*` shared-storage tools have separate scope, paths and permissions. Other apps' private data and restricted directories remain inaccessible.

## Commands

| Tool | Environment and arguments |
| --- | --- |
| `proot_command` | Required `linux_id`; command through `command` or `command_lines`; optional `workDir`, `timeout_seconds`, `background` |
| `run_command` | External Termux; same command/options without `linux_id` |
| `ssh_exec` | Configured SSH machine; obtain a real ID from `list_ssh_servers` first |
| `execute_shell_command` | Requires actual Shizuku Shell capability |
| `execute_root_command` | Requires configured and working Root execution |

Replace the placeholder with an enabled Linux ID:

```json
{
  "linux_id": "REPLACE_WITH_ENABLED_LINUX_ID",
  "command_lines": ["pwd", "printf 'ready\\n'"],
  "workDir": "/root",
  "timeout_seconds": 60,
  "background": false
}
```

Foreground timeout defaults to 60 seconds and is capped at 600. Use `background=true` for persistent services, then inspect the output file and health. Working-directory paths belong to the selected environment; Android, PRoot and Termux-private paths are not interchangeable.

## Other families

| Capability | Common entries | Rule |
| --- | --- | --- |
| Web/download | `web_search`, `read_web_page`, `download_file` | Verify original sources, targets and optional hashes |
| TODO/scheduling | `set_todo_list`, `update_todo_item`, `manage_scheduled_tasks` | TODOs do not schedule execution |
| History/memory | History search/read, `read_memories`, `save_memory` | Read relevant scope; obtain IDs before updates |
| Skills | `list_skill_files`, `read_skill_file` | Check applicability, then read entry/references |
| Remote services | SSH, email, WebDAV, transfers, MCP | Obtain real configuration IDs and verify destinations |
| Local services/data | `manage_mini_server`, `read_mini_server_logs`, `export_backup`, `import_backup` | Check live state, backup contents and restore mode |
| Device | `device_get_capabilities` and session tools | Require the intended device session and capabilities |

## Results

Ordinary built-in tools generally use `lyra_tool_output_v2`: inspect `ok`, `error`, `content` and `file_changes`. Nested content may contain command output or another structured result; continue to exit codes, stderr or actual service health. Scoped/device tools can use their own result formats.

Rejected approval, disabled tools, invalid paths and bad arguments mean unfinished work. Address the cause before continuing and do not report these operations as completed.
