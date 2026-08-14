---
title: Workflows & Appendix
---

# Chapter 10: Workflows & Appendix — real-world scenarios and a quick reference

> The final chapter: **6 complete real-world scenarios** (follow along and you'll learn), plus a **tool quick-reference and glossary** (come back whenever you need them).
>
> Reading time: about 25 minutes; the appendix is worth bookmarking.

---

## 18. Advanced workflow examples (follow along)

### 18.1 Scenario 1: maintain an open-source plugin project on your phone

**Goal**: modify a GitHub plugin's code, test it, and push.

```text
1. Tell the AI: "The workspace is the plugin repo directory; list the current changes"
2. The AI creates a TODO: fix code → add tests → update README → push
3. Have the AI explore the existing code with search_files + read_file
4. Have the AI edit the logic precisely (edit_file), then run regression tests (run_command)
5. Have the AI update the README with a "changelog" entry
6. After you confirm, the AI runs git add / commit / push
7. The AI reports: what changed, test results, push status
```

**Beginner point**: you see an approval popup at every step; before pushing, have the AI show the exact commands it will run.

### 18.2 Scenario 2: write a novel chapter by chapter + progress tracking

**Goal**: write a novel with AI following an outline, and maintain a progress file.

```text
1. Put "writing-plan.json" and chapter text in the project folder; add an AGENTS.md defining word-count rules and naming
2. Each chapter: "Read the end of the previous chapter and the plan file, then write chapter 34, then update the plan file's completed count and word count"
3. Use memory to store settings (protagonist lifespan, volume structure, tone) so sessions stay consistent
4. Set a scheduled task that generates a progress summary weekly
```

**Beginner point**: AGENTS.md + memory + plan file work together, and the AI "remembers" the whole book's setup.

### 18.3 Scenario 3: local website development & preview

**Goal**: build a website on your phone and preview it locally.

```text
1. Install node/npm in Termux (Chapter 1, section 5.4)
2. Initialize a Vite/VitePress project in the workspace
3. Have the AI write code and build static output
4. Tell the AI: "start the mini server on port 8080"
5. Open the address in a browser; on issues, have the AI check server logs
6. Rebuild after changes; stop the server when done
```

**Beginner point**: the mini server's root is the current workspace — make sure the build output is inside the workspace before previewing.

### 18.4 Scenario 4: email + cloud-drive automation

**Goal**: let the AI handle email and auto-backup.

```text
1. Configure IMAP/SMTP and WebDAV accounts (Chapter 5)
2. Ask the AI to "list unread emails → extract key info → draft replies"
3. Review the drafts in your mailbox and send manually (safer)
4. Download important attachments to quarantine, scan with antivirus first
5. Set a scheduled task: monthly auto export_backup to WebDAV
```

**Beginner point**: sending email needs separate confirmation; "draft first, send manually" is the safest habit.

### 18.5 Scenario 5: multi-Agent parallel research (sub-agents)

**Goal**: research two approaches in parallel and compare.

```text
1. Tell the AI: "Research the pros and cons of plan A and plan B separately"
2. The AI spawns two sub-agents, each producing: conclusion, sources, risks, recommendation
3. The main AI reviews both, cross-checks conflicts
4. It merges into a comparison document and writes it to the workspace
```

**Beginner point**: good for "independent, parallel" tasks; always review results — don't trust them blindly.

### 18.6 Scenario 6: the safety self-check before every execution

```text
□ What permission does this need? Is there a lower-privilege alternative?
□ Is the target path / server / account correct?
□ What will the command change? Can it be recovered (backup)?
□ Does it involve keys/privacy? Could it be logged or sent out?
□ Does the approval popup match what I expected?
```

**Beginner point**: making these 5 questions a habit beats any security setting.

---

## 19. Appendix

### 19.1 Tool quick-reference (what you want → which tool)

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

### 19.2 Glossary (look up words you don't understand)

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

### 19.3 License & contributions

- Dual licensing: original code under **AGPLv3-or-later**; closed-source distribution/private modification/commercial exceptions require a commercial license;
- Organization members' PRs are welcome; AI-assisted code may be submitted, but the submitter must complete testing and human review;
- **Never commit** signing keys, keystores, API keys, `.env` or `local.properties`.

### 19.4 Disclaimer

- This manual is based on Lyra Code 3.6.0's official README and built-in Agent tool contracts; **UI details follow the actual release**;
- The trustworthiness of remote scripts, MCP services, Skills repositories and SSH commands is your responsibility;
- The user bears responsibility for data security during use.

### 19.5 After you finish reading: your learning path

```text
Chapter 1 ✅ Installation & setup (must read)
Chapter 2 ✅ Connect a model (must read)
Chapters 3–4 ✅ Files / commands / tools (core)
Chapters 5–7 🔜 On demand: remote / server / memory & backup
Chapters 8–9 🔜 On demand: stats / security & troubleshooting
Chapter 10 📌 This appendix, come back anytime
```

> Congratulations, you made it! Now go tell the AI "create a TODO for me" and experience the Agent working for real.

---

*End of documentation · We also recommend the official [README](https://github.com/lyracode-app/Lyra-Code/blob/main/README.md)*
