---
title: Agent Tools
---

# Chapter 3: Agent Tools — the "hands" the AI can use

> Last chapter we connected a model. This chapter answers a key question: **besides typing, what can the AI actually DO?**
>
> Answer: through a set of **tools**. We'll explain each tool group, its boundaries, its risks and what you should watch out for.
>
> Reading time: about 20 minutes.

---

## 5. The Agent tool system

### 5.0 What is a "tool"? — in plain words

Think of the AI as an assistant that **can only talk**. It can't touch your phone by itself — but the app gives it a pair of gloves:

> Each "glove" is one tool. When the AI wants to use a glove, it reports "I want to use tool X to do Y" — and **it only acts after you approve**.

So:

- More tools → the AI can do more;
- Every tool has clear boundaries → the AI can't overstep;
- Every tool has its own on/off switch → disable the ones you don't trust.

### 5.1 Tool categories at a glance (plain explanations)

| Category | Representative tools | What it does (plain words) |
| --- | --- | --- |
| Files & directories | list_directory / search_files / get_file_info / create_folder / rename_move / delete | Look at folders, find files, create folders, rename, delete |
| File I/O | read_file / read_file_lines / write_file / edit_file / append_file | Read files, create files, edit precisely, append |
| Global storage | global_* tools | Operate phone storage **outside the workspace** (photos, Downloads…) |
| Download | download_file | Download files from the web |
| Commands | run_command | Run commands in Termux (install software, run scripts) |
| System | execute_shell_command / execute_root_command | System-level operations (need Shizuku / Root) |
| Planning | set_todo_list / update_todo_item | Build and update task checklists |
| Web | web_search / read_web_page / mark_web_sources | Search, open pages, record citations |
| Remote | ssh_exec / list_emails / webdav_* / file_transfer_* | Connect servers, email, cloud drives, FTP |
| Scheduled | manage_scheduled_tasks | Set up scheduled tasks |
| Backup | export_backup / import_backup | Back up / restore your data |
| Misc | get_current_time / get_current_location / get_device_hardware_info / list_installed_apps | Time, location, hardware info |

### 5.2 Workspace vs global storage (the most confusing concept)

```text
┌─────────────────────────────────────────────┐
│  Workspace                                  │
│  /storage/emulated/0/Lyra                   │
│  The AI's "normal hand" only works here     │
│  Path style: src/main.kt (relative)         │
└─────────────────────────────────────────────┘
        ↑ AI works here by default

┌─────────────────────────────────────────────┐
│  Global storage                             │
│  /storage/emulated/0 (the whole phone)      │
│  Only reachable with global_* tools         │
│  Used for: Downloads, photos, outside files │
└─────────────────────────────────────────────┘
```

- The default workspace is `/storage/emulated/0/Lyra`; with `read_file`, `edit_file`, etc., the AI can **only** operate inside this folder;
- To touch files outside the workspace (e.g. the `Download` folder), the AI must use `global_*` tools — also requiring your approval;
- **Don't** hand Termux-private paths (like `/data/data/com.termux`) to file tools — they'll be rejected;
- `Download` and `Downloads` both map to `/storage/emulated/0/Download`.

::: tip Why this design?
For safety. You can't have the AI casually delete any file on your phone — by confining it to the workspace, even a mistake has limited damage.
:::

### 5.3 Finding files: which tool?

| What you want | Which tool | Example |
| --- | --- | --- |
| Find a file by **name** in the workspace | search_files | Find `README.md`: query=`README`, path=`.` |
| Find a file by **name** anywhere | search_files first; if not found, global_search_files | Find `photo_2024` |
| Search by **file contents** | command rg (or grep) | "Search all the TODOs in the project" |
| Find files on a **remote server** | webdav_search / file_transfer_search | "Is there a backup file in the cloud drive?" |

::: warning Key point
`search_files` **only matches file names/paths — it does NOT search file contents**. To search contents you need a command (`rg`). This is a classic beginner mistake: the keyword is in the file but the search finds nothing — just switch methods.
:::

### 5.4 Downloading files: use download_file

Downloads use the **built-in downloader**, which is more reliable than the command-line curl (progress bar, redirect following, checksum):

```text
download_file
  - url: file address (http/https)
  - path: where to save (workspace-relative, or global path)
  - headers: optional — e.g. Authorization for login-required endpoints
  - sha256: optional integrity check; fails on mismatch
```

**Just say it in plain language**, e.g.:

> Download this image into the images folder in my workspace: https://example.com/photo.png

The AI will call the tool and start after your approval.

### 5.5 TODO planning: the AI's task checklist

When a task is complex (multiple steps, multiple files, risky), the AI proactively creates a **TODO list** so you can see its plan:

```text
□ 1. Read the project structure     → pending
□ 2. Modify main.py                 → running
□ 3. Run tests to verify            → pending
□ 4. Report the result              → pending
```

- Simple things (chatting, reading a file) **don't need** a TODO;
- Complex things (editing code, writing docs, remote operations) **must have** one;
- You can say anytime: "show your TODO", "skip a step", "do step 2 first" to direct it.

### 5.6 Web search & source management

The AI follows a pipeline when researching:

1. **web_search**: search and get candidates (title + link + snippet). ⚠️ A snippet is a lead, not a conclusion;
2. **read_web_page**: open a trustworthy page and read its body — **only what's actually read counts**;
3. **mark_web_sources**: record the sources actually used, so the answer includes links for you to verify.

You can also configure a **web search blocklist** in Settings: add domains you don't want the AI to open (e.g. `example.com`), and it can't open them; `*.x.com` wildcard supported (to fully block a site, add both `x.com` and `*.x.com`).

### 5.7 Approvals & auditing: every action is visible

**This is the biggest difference from ordinary AI, and the reason to trust it:**

- **State-changing operations all require approval**: writing files, running commands, sending email, remote ops… all pop a confirmation;
- **Structured results**: after every operation the AI shows a result card — which tool was called, whether it completed (ok), returned content, errors, and which files changed;
- **⚠️ Note**: `ok=true` only means "the tool finished executing" — **not that the command succeeded**. E.g. after `git push`, ok may be true but the push may have failed — check the exit code and output;
- **Diffs for file edits**: after modifying a file, the AI shows what changed (added/removed lines) for your review;
- **Disable anytime**: turn off any tool in the Agent tools page and the AI loses it immediately.

### 5.8 Beginner FAQ

**Q: Can the AI read my WeChat/QQ chat history?**
A: No. The AI's tools can only access the workspace, explicitly authorized storage paths, and configured remote accounts. App data like chat history lives in protected areas (`Android/data`) it can't reach.

**Q: Will the AI work behind my back when I'm away?**
A: No. Operations needing approval require your confirmation. The AI cannot (and won't) bypass approval.

**Q: Should all tools be on?**
A: Defaults are fine. If you care about a category (e.g. you never want the Root tool used), turn it off.

**Q: The AI says "I don't have that tool"?**
A: It may be disabled in the tools page, or needs extra setup (e.g. SSH needs an account first). Tell it your need; it will explain what's missing.

---

*End of chapter · Next: Files & Commands — have the AI edit files and run commands for you*
