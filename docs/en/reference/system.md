---
title: System & Ops
---

## Time & device

| Tool | Purpose |
| --- | --- |
| get_current_time | current time and timezone for relative date/time answers |
| get_current_location | last known location for location-aware answers |
| get_device_hardware_info | system/CPU/memory/storage/display/battery diagnostics (not definitive authenticity proof) |
| list_installed_apps | installed apps (package/version/signature) |

## Mini server

```text
manage_mini_server(action=start|stop|status|update) + get_mini_server_status + read_mini_server_logs
```

- static root = current workspace; `127.0.0.1` device-only, `0.0.0.0` exposes to the LAN;
- Basic auth, HTTPS, force-HTTPS, SPA fallback supported;
- troubleshoot via logs: 404 = path issue, auth failure = credential mismatch, JS errors = script issue.

## Scheduled tasks

```text
manage_scheduled_tasks(action=list|create|update|delete|enable|disable)
```

| schedule_type | Parameters |
| --- | --- |
| once | run_at |
| daily | hour + minute |
| weekly | day_of_week (1=Mon, 7=Sun) + hour + minute |
| monthly | day_of_month + hour + minute |

Tasks can select their own model/profile and are invisible in normal chat history; each run is a fresh session - state the output location and format in the prompt.

## Backup

```text
export_backup(destination=local|webdav) / import_backup(source=local|download|global|webdav)
```

- safe export (default) has no secrets; full migration requires explicit include_secrets;
- Agent imports always use supplement mode: non-destructive and deduplicated.

## Planning & memory

| Tool | Purpose |
| --- | --- |
| set_todo_list / update_todo_item | progress management for multi-step tasks (3-7 items) |
| read_memories / save_memory / update_memory / delete_memory | cross-conversation durable preferences |

::: tip
Save only explicit, durable preferences; never save secrets, temporary task state or one-off context.
:::