---
title: Memory, Tasks & Backup
---

## 11. Memory, Sub-Agents & Project Instructions

### 11.1 Memory system

Lyra Code's cross-conversation memory stores your **explicit, durable** preferences and work style:

- e.g. "write docs in Chinese", "update the README changelog when pushing plugin updates", "create a TODO list before starting a task";
- memories are injected on demand - the Agent only uses memories relevant to the current task and never shows the full memory store;
- do not store secrets, temporary task state, or one-off context in memories;
- you can ask AI to view, update or delete a memory at any time.

### 11.2 Sub-agents

When a task contains at least two **independent, well-scoped** subtasks, the Agent can dispatch sub-agents, for example:

- research on several independent modules;
- comparing alternative designs;
- independent code reviews / bug investigations.

Rules:

- do not hand simple answers, reads of known files, a single edit, or **sequential dependent steps** to sub-agents;
- sub-agent results need review - never take them as final conclusions directly;
- sub-agents have a restricted tool set: no commands, no shared-storage writes, no out-of-scope writes.

### 11.3 Priority: project instructions vs memory

```text
Your direct request > current conversation > project instruction files (AGENTS.md) > memory > examples
```

- project instructions apply per directory subtree, deeper overrides shallower;
- no instruction can ask for secret leakage, approval bypasses or unrelated external actions.

## 12. Scheduled Tasks & Background Jobs

### 12.1 Scheduled tasks

`manage_scheduled_tasks` supports four schedule types:

| schedule_type | Trigger parameters | Example |
| --- | --- | --- |
| once | run_at | remind me at 09:00 tomorrow to process email |
| daily | hour + minute | generate a daily writing progress summary at 22:00 |
| weekly | day_of_week (1=Mon, 7=Sun) + hour + minute | backup every Friday at 18:00 |
| monthly | day_of_month + hour + minute | export a backup to WebDAV on the 1st |

Notes:

- scheduled tasks can select their own profile/model and do not appear in normal chat history;
- create/update/delete/enable/disable all require confirmation;
- a scheduled task runs as a fresh session - describe the goal clearly (output file and format).

### 12.2 Background commands

For long-running services (dev servers, downloads) use `run_command(background=true)`: `

- Lyra closes inherited I/O, saves launcher output to a file, and returns a launcher_pid quickly;
- **launch success does not mean healthy** - check the process and logs with a separate foreground call (`ps -ef | grep xxx` or read the output file);
- don't compose `nohup ... &` yourself; background mode handles it.

### 12.3 Timeouts & recovery

- foreground command timeouts are 5-600 seconds;
- a timeout may mean the command is still running or a remote change already completed - inspect with a read-only call before retrying;
- screen-off or app kills may affect scheduled tasks - keep critical ones under system power management whitelists.

## 13. Backup, Migration & Import/Export

### 13.1 What can be backed up

| Category | Notes |
| --- | --- |
| Profile | preferences, UI config, etc. |
| Conversations | all normal conversations (not scheduled-task sessions) |
| Model config | providers, base URLs, default models |
| System prompts | custom prompt library |
| Remote configs | MCP, SSH, email, WebDAV, FTP/FTPS/SFTP |
| Skills | imported packages |
| Memory | cross-conversation memory entries |

### 13.2 Two export modes

1. **Safe export (default)**: no API keys, passwords or private keys - good for routine backups or sharing;
2. **Full migration export (include_secrets)**: includes secrets for device migration - **store it carefully, never share it publicly**.

::: danger
**Full migration export (include_secrets)** contains secrets. Store it securely and never share it publicly.
:::

### 13.3 Export & import

```text
export_backup
  - destination: local (Download/LyraCode) or webdav
  - choose include_* categories as needed
  - WebDAV without remote_path overwrites /LyraCode/lyra_backup_latest.zip

import_backup
  - source: local (workspace) / download / global / webdav
  - Agent imports always use supplement mode: non-destructive, deduplicated, minimizing secret-overwrite risk
```

### 13.4 Backup strategy tips

- enable WebDAV cloud backup for important data and clean up old local packages periodically;
- do a full "with secrets" backup before migrating, then verify the restore path with a safe export;
- name backup files with dates to avoid overwriting old versions.

---