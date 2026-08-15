---
title: Scheduled & Background Tasks
---

# Chapter 17: Scheduled & Background Tasks — let the AI work on schedule

> A scheduled task = **set a time, and the AI automatically does one thing** (in a fresh background session). For example:
>
> - Every day at 8:00, the AI summarizes yesterday's to-dos;
> - Every Friday at 18:00, the AI makes a data backup;
> - On the 1st of every month, the AI exports a backup to the cloud drive.
>
> Reading time: about 15 minutes.

---

## 17.1 Four schedule types

| Type | Trigger parameters | Example |
| --- | --- | --- |
| Once | specific date & time | Tomorrow 09:00: remind me to handle email |
| Daily | hour + minute | Every day 22:00: generate today's writing progress summary |
| Weekly | weekday (1=Mon … 7=Sun) + hour + minute | Every Friday 18:00: backup |
| Monthly | day of month + hour + minute | On the 1st: export backup to WebDAV |

## 17.2 How to create one? — just say it

> Create a scheduled task: every Friday at 6 PM, write the novel progress summary in my workspace to `summary.md`.

- Creating/modifying/deleting/enabling-disabling all require your confirmation;
- Scheduled tasks can use their own model and data, and **don't appear in normal chat history**;
- **Write the prompt clearly**: output to which file, in what format — because the task runs in a brand-new independent session where the AI has no context.

You can also set up background tasks manually and view download tasks in the **sidebar tasks page**.

## 17.3 Background commands (long-running services)

For services that must keep running (a local dev server, a long download), use background mode:

- The app saves the startup output to a file and gives you a process ID;
- ⚠️ **Started ≠ healthy**: have the AI separately check the process and logs (`ps -ef | grep xxx` or read the output file);
- Don't hand-compose `nohup ... &` — background mode handles it automatically.

## 17.4 Timeouts & recovery

- Foreground commands can run up to 600 seconds; a timeout may mean the command is still running or quietly finished;
- First check the scene with read-only commands, then decide retry or wrap-up;
- **Screen-off / app killed** during scheduled tasks can affect triggers — for important tasks, add the app to your battery whitelist via system power management.

## 17.5 Keeping background tasks alive

Background tasks need **background keep-alive** to execute. In general, they're not recommended for non-root users, because root users have better system-level keep-alive methods.

## 17.6 Beginner FAQ

**Q: A scheduled task didn't fire?**
A: Check: ① is the task enabled? ② time/timezone/weekday settings? ③ did the phone kill the app? ④ is the prompt clear (output where)?

**Q: Can scheduled tasks go online and use tools?**
A: Yes — it's a full AI session with tools. But note: it runs while you're away, so **how do approvals work?** Only schedule low-risk tasks you trust.

---

*End of chapter · Next: Skills — teach the AI new skills*
