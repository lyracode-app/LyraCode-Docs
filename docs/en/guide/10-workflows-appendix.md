---
title: Workflows & Appendix
---

## 18. Advanced Workflow Examples

### 18.1 Maintaining an open-source plugin on a phone

```text
1. workspace = plugin repo; create a TODO: edit code → add tests → update README → push
2. use search_files + read_file to get familiar with the code and README structure
3. edit_file for precise changes; run_command for regression tests
4. append a "changelog" entry to the README
5. git add -A && git commit -m "..." && git push (after your confirmation)
6. report: changes, test results, push status
```

### 18.2 Writing a novel chapter by chapter with progress tracking

```text
1. keep a plan.json and chapter files in the project; AGENTS.md defines the word-count rule and naming
2. per chapter: read the previous chapter ending and the plan → write the chapter → update the plan file (completed/word count/lifespan curve)
3. use memory to persist settings (protagonist lifespan, volume structure, tone) across sessions
4. schedule a periodic progress summary
```

### 18.3 Local website development & preview

```text
1. install node/npm in Termux; init a Vite/VitePress project in the workspace
2. write code and build static output
3. manage_mini_server(action=start, port=8080) to preview
4. debug in the browser; read_mini_server_logs for 404s and JS errors
5. rebuild after changes, then stop the server
```

### 18.4 Email + cloud drive automation

```text
1. configure IMAP/SMTP and WebDAV accounts
2. ask AI to list unread emails → extract key info → generate reply drafts (save_email_draft)
3. review drafts and send manually
4. download important attachments to quarantine, scan, then use
5. export_backup to WebDAV periodically
```

### 18.5 Parallel research with sub-agents

```text
1. split "research option A" and "research option B" into two independent subtasks
2. each produces: conclusion, evidence sources, risks, recommendations
3. the main agent reviews both and cross-checks conflicts
4. write the final summary and trade-offs to a workspace document
```

### 18.6 Security checklist (self-check before every execution)

```text
□ What permissions does this operation need? Is there a lower-privilege alternative?
□ Is the target path/server/account correct?
□ What will the command modify? Can it be recovered (backup)?
□ Does it involve secrets/privacy? Will it be logged or sent out?
□ Does the approval dialog match what I expect?
```

## 19. Appendix

### 19.1 Quick tool reference

| What you want | Which tool |
| --- | --- |
| List a directory | list_directory / global_list_directory |
| Find files | search_files (workspace) → global_search_files (full storage) |
| Read files | read_file / read_file_lines (segment large files) |
| Create/rewrite files | write_file (new) / edit_file (precise) / append_file (append) |
| Download | download_file (prefer over curl/wget) |
| Run commands | run_command (Termux) |
| System ops | execute_shell_command (Shizuku) / execute_root_command (root) |
| Web research | web_search → read_web_page → mark_web_sources |
| Remote Linux | list_ssh_servers → ssh_exec |
| Email | list_email_accounts → list_emails → read_email / save_email_draft |
| Cloud drive | list_webdav_servers → webdav_list / upload / download |
| FTP/SFTP | list_file_transfer_servers → file_transfer_* |
| Local site preview | manage_mini_server + read_mini_server_logs |
| Scheduled tasks | manage_scheduled_tasks |
| Backup | export_backup / import_backup |
| Device info | get_device_hardware_info / list_installed_apps |

### 19.2 Glossary

| Term | Meaning |
| --- | --- |
| Workspace | the project directory native file tools can operate on; relative paths |
| Global storage | `/storage/emulated/0` shared storage, via global_* tools |
| Termux | terminal emulator on Android providing the shell command channel |
| Shizuku | an ADB-authorized high-privilege shell service |
| MCP | Model Context Protocol, the standard for AI to talk to external tools/data sources |
| Skill | an optional capability package with SKILL.md and resources |
| AGENTS.md | the instruction file at the project root, read automatically before work |
| .bak | same-directory backup created automatically before overwrites |
| Mini Server | the built-in static HTTP/HTTPS server |
| Quarantine | the isolated area for downloaded attachments; AI never reads its contents |
| Supplement import | non-destructive, deduplicated backup restore mode |

### 19.3 License & contributions

- dual license: original code under AGPLv3-or-later; commercial license required for closed-source distribution, private modifications or commercial exceptions;
- PRs from organization members are accepted; AI-assisted code is welcome, but the submitter must test and review before submitting;
- never commit signing keys, keystores, API keys, `.env`, `local.properties` or other private files.

### 19.4 Disclaimer

- this guide is based on Lyra Code 3.6.0's official README and built-in Agent tool contracts; UI details follow the actual version;
- the trustworthiness of remote scripts, MCP services, Skill repositories and SSH commands is your responsibility;
- you are responsible for data security during use.

---

*End of guide*