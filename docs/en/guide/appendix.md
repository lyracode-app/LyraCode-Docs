---
title: Appendix
---

# Chapter 25: Appendix — quick reference and glossary

> The appendix is worth bookmarking: the **tool quick-reference** (what you want → which tool), the **glossary** (look up words you don't understand), the license and your learning path.
>
> Reading time: about 10 minutes.

---

## 25.1 Tool quick-reference (what you want → which tool)

| What you want | Which tool |
| --- | --- |
| List a directory | list_directory / global_list_directory |
| Find a file | search_files (workspace) → global_search_files (whole phone) |
| Read a file | read_file / read_file_lines (large files in fragments) |
| Create/rewrite a file | write_file (new) / edit_file (precise) / append_file (append) |
| Download | download_file (prefer over curl/wget) |
| Run a command | run_command (Termux) |
| System operations | execute_shell_command (Shizuku) / execute_root_command (root) |
| Web research | web_search → read_web_page → mark_web_sources |
| Remote Linux | list_ssh_servers → ssh_exec |
| Email | list_email_accounts → list_emails → read_email / save_email_draft |
| Cloud drive | list_webdav_servers → webdav_list / upload / download |
| FTP/SFTP | list_file_transfer_servers → file_transfer_* |
| Local site preview | manage_mini_server + read_mini_server_logs |
| Scheduled tasks | manage_scheduled_tasks |
| Backup | export_backup / import_backup |
| Device info | get_device_hardware_info / list_installed_apps |

Detailed parameters for each tool are in the [Tool Reference](/en/reference/files).

## 25.2 Glossary (look up words you don't understand)

| Term | Plain explanation |
| --- | --- |
| Workspace | The project folder the AI can operate in by default; paths are relative |
| Global storage | The whole phone storage `/storage/emulated/0`; needs global_* tools |
| Termux | A terminal app on your phone; the command-execution channel |
| Shizuku | A service borrowing system debug privileges (ADB level) |
| Root | Highest phone privilege |
| API key | The provider's "pass card"; never leak it |
| Token | Billing unit; roughly "word count" |
| Agent | An AI that takes action under your approval |
| MCP | Standard protocol for connecting external tools/data |
| Skill | A capability pack containing SKILL.md and resources |
| AGENTS.md | Instruction file at the project root; the AI reads it before starting |
| .bak | Same-directory backup automatically created before file edits |
| Mini Server | Built-in static web server |
| Quarantine directory | Isolated download area; the AI never reads its contents |
| Supplement import | Non-destructive, deduplicated backup restore mode |
| Base URL | Provider server address (usually left empty for official providers) |
| System prompt | Sets the AI's persona and rules |

## 25.3 License & contributions

- Dual licensing: original code under **AGPLv3**; closed-source distribution/private modification/commercial exceptions require a commercial license;
- Organization members' PRs are welcome; AI-assisted code may be submitted, but the submitter must complete testing and human review;
- **Never commit** signing keys, keystores, API keys, `.env` or `local.properties`.

**Need more help?** Contact the developer or submit an Issue on the hosted repositories:

- GitHub: <https://github.com/lyracode-app/Lyra-Code>
- Gitee: <https://gitee.com/yukisoffd/lyra-code>

## 25.4 Disclaimer

- This manual is based on Lyra Code 3.6.0's official README and built-in Agent tool contracts; **UI details follow the actual release**;
- The trustworthiness of remote scripts, MCP services, Skills repositories and SSH commands is your responsibility;
- The user bears responsibility for data security during use.

## 25.5 After you finish reading: your learning path

```text
Chapters 1–2 ✅ Installation & setup (must read)
Quick Start ✅ Connect a model (must read)
Chapters 3–5 🔜 Interface & chat (core)
Chapter 8 ✅ Model configuration (must read)
Chapters 11–13 ✅ Files / commands / tools (core)
Chapters 14–21 🔜 On demand: remote / server / automation / backup & stats
Chapters 22–24 🔜 On demand: security / troubleshooting / workflows
Chapter 25 📌 This appendix, come back anytime
```

> Congratulations, you made it! Now go tell the AI "create a TODO for me" and experience the Agent working for real.

---

*End of documentation · We also recommend the official [README](https://github.com/lyracode-app/Lyra-Code/blob/main/README.md)*
