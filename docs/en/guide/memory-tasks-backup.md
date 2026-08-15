---
title: Memory, Tasks & Backup
---

# Chapter 7: Memory, Tasks & Backup — let the AI remember you, work on schedule, and keep your data safe

> This chapter covers three things that make Lyra Code feel like a true personal assistant: **① the AI's long-term memory; ② scheduled tasks; ③ data backup**.
>
> Reading time: about 20 minutes.

---

## 11. Memory, sub-agents & project instructions

### 11.0 What is "memory"? — the AI's long-term notebook

Normal AI chat "forgets" every session: close the conversation and it no longer remembers who you are or what you like.

**Memory** gives the AI a **long-term notebook**:

- You tell it "write docs in Chinese", "create a TODO before starting tasks", "update the README changelog before pushing a plugin";
- It writes down these **explicit, durable** preferences;
- **In every future conversation**, it automatically looks up relevant entries and acts according to your habits.

### 11.1 Memory usage essentials

- **What to store**: explicit preferences, working styles, communication habits (e.g. "reply in Simplified Chinese");
- **What NOT to store**: passwords/keys, temporary task states, one-off context (they leak or go stale);
- **On-demand injection**: the AI only uses memory relevant to the current task — it won't recite the whole notebook;
- **Always editable**: you can say "change the memory entry 'reply in Chinese' to 'reply in English'" or "delete that memory";
- **Privacy**: memory stays on your device and travels with backups.

::: tip How to make the AI remember something?
Just say: "Remember: from now on, write all code comments in Chinese." The AI saves it to memory.
:::

### 11.2 Sub-agents: let the AI spawn clones for parallel work

When a task contains **at least two independent** sub-tasks, the AI can dispatch "clones" (sub-agents) to work in parallel, e.g.:

- Research two technical approaches at the same time;
- Review two pieces of code at the same time;
- Design two candidate solutions and compare them.

**Principles:**

- Simple answers, reading known files, single edits, and **dependent sequential steps** are NOT suitable for sub-agents;
- Sub-agent results **need review** — never treat them as final conclusions directly;
- Sub-agents have limited powers: no commands, no shared-storage changes, no out-of-scope writes.

> Beginners don't need to manage this — when parallel work truly helps, the AI decides to use clones on its own.

### 11.3 Who's in charge? — priority of instructions

```text
Your direct request > current conversation > project instruction files (AGENTS.md) > memory > examples
```

- Project instructions apply per directory tree: **deeper directories override shallower ones**;
- No instruction (including AGENTS.md and memory) **may demand**: leaking secrets, bypassing approvals, or unrelated external operations.

---

## 12. Scheduled tasks & background tasks

### 12.0 What is this? — let the AI work on time

A scheduled task = **set a time, and the AI automatically does one thing** (in a fresh background session). For example:

- Every day at 8:00, the AI summarizes yesterday's to-dos;
- Every Friday at 18:00, the AI makes a data backup;
- On the 1st of every month, the AI exports a backup to the cloud drive.

### 12.1 Four schedule types

| Type | Trigger parameters | Example |
| --- | --- | --- |
| Once | specific date & time | Tomorrow 09:00: remind me to handle email |
| Daily | hour + minute | Every day 22:00: generate today's writing progress summary |
| Weekly | weekday (1=Mon … 7=Sun) + hour + minute | Every Friday 18:00: backup |
| Monthly | day of month + hour + minute | On the 1st: export backup to WebDAV |

### 12.2 How to create one? — just say it

> Create a scheduled task: every Friday at 6 PM, write the novel progress summary in my workspace to `summary.md`.

- Creating/modifying/deleting/enabling-disabling all require your confirmation;
- Scheduled tasks can use their own model and data, and **don't appear in normal chat history**;
- **Write the prompt clearly**: output to which file, in what format — because the task runs in a brand-new session where the AI has no context.

### 12.3 Background commands (long-running services)

For services that must keep running (a local dev server, a long download), use background mode:

- The app saves the startup output to a file and gives you a process ID;
- ⚠️ **Started ≠ healthy**: have the AI separately check the process and logs (`ps -ef | grep xxx` or read the output file);
- Don't hand-compose `nohup ... &` — background mode handles it.

### 12.4 Timeouts & recovery

- Foreground commands can run up to 600 seconds; a timeout may mean the command is still running or quietly finished;
- First check the scene with read-only commands, then decide retry or wrap-up;
- **Screen-off / app killed** during scheduled tasks can affect triggers — for important tasks, add the app to your battery whitelist.

### 12.5 Beginner FAQ

**Q: A scheduled task didn't fire?**
A: Check: ① is the task enabled? ② time/timezone/weekday settings? ③ did the phone kill the app? ④ is the prompt clear (output where)?

**Q: Can scheduled tasks go online and use tools?**
A: Yes — it's a full AI session with tools. But note: it runs while you're away, so **how do approvals work?** Only schedule low-risk tasks you trust.

---

## 13. Backup, migration & import/export

### 13.0 Why back up?

Lyra Code stores your conversations, model configs, remote accounts, memory and Skills — **hard to rebuild if lost**. Backing up regularly means switching phones, wiping or deleting by accident is no big deal.

### 13.1 What can be backed up?

| Category | Contents |
| --- | --- |
| Profile | Preferences, UI configuration |
| Conversations | All normal sessions (scheduled-task sessions excluded) |
| Model configs | Providers, Base URLs, default models |
| System prompts | Your custom prompt library |
| Remote configs | MCP, SSH, email, WebDAV, FTP accounts |
| Skills | Installed skill packs |
| Memory | Cross-session memory entries |

### 13.2 The two export modes (know the difference!)

| Mode | Includes keys? | Purpose | Caution |
| --- | --- | --- | --- |
| **Safe export (default)** | ❌ No API keys/passwords/private keys | Regular backup, shareable | Must re-enter keys after restore |
| **Full migration export** | ✅ Everything, including keys | Phone switch, full migration | ⚠️ **Handing over all your keys — encrypt it, never share it** |

::: danger Important warning
**A full migration backup contains ALL your passwords and keys.** Putting it on a cloud drive or in a chat app = giving your keys to someone else. Delete copies after use.
:::

### 13.3 How to export / import?

**Export** (just say it):

> Export a backup to local (Download/LyraCode folder), including conversations and settings, without keys.

- You can also export directly to **WebDAV** (cloud backup): just name the drive account;
- When no file name is given for WebDAV, it overwrites `/LyraCode/lyra_backup_latest.zip`.

**Import** (just say it):

> Import the backup file `lyra_backup.zip` from my workspace

- Import sources: local files, Downloads, global storage, WebDAV;
- **Import is supplement mode**: non-destructive, auto-deduplicated, tries not to overwrite your existing keys.

### 13.4 Backup strategy (copy this homework)

1. Turn on **WebDAV cloud backup** for important data (automatic, off-device);
2. Clean up old local backups regularly, keep only recent ones;
3. **Before switching phones**: do a full migration export → import on the new phone → verify the restore path with a safe export;
4. Name backups with dates (e.g. `lyra-2026-08-14.zip`) to avoid overwriting old versions.

### 13.5 Beginner FAQ

**Q: What if someone else gets my backup file?**
A: A safe export has no keys — low risk; a **full migration export** is all your keys — never let it out.

**Q: Will import overwrite my current data?**
A: No. Import is supplement mode: new content merges in, existing content is kept where possible.

**Q: How often should I back up?**
A: Weekly if you change things often; monthly is enough for chat-only users. With WebDAV, set a scheduled task to back up automatically.

---

*End of chapter · Next: Stats, Diagnostics & Media — see your usage, play with images and themes*
