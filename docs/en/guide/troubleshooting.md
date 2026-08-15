---
title: Troubleshooting
---

# Chapter 23: Troubleshooting — stay calm when things break

> This chapter is the **repair manual**: the common problems from every chapter collected in one place. Bookmark it and come back when you hit an issue.
>
> Reading time: about 15 minutes.

---

## 23.1 Command execution unavailable / auto-disabled

**Possible causes**: Termux not installed, external-app-calls not enabled, or the Settings switch off.

**Fix** (check in order):
1. In Termux, confirm `allow-external-apps=true` is written and `termux-reload-settings` was run (see [Chapter 2, 2.6](/en/guide/install#_2-6-setting-up-termux-so-ai-can-run-commands));
2. Turn on the "Termux permission" switch in Lyra Code Settings.

## 23.2 File tools report "path out of bounds"

**Cause**: you passed an absolute path (e.g. `/storage/emulated/0/...`) to a workspace tool.

**Fix**: use `global_*` tools for files outside the workspace; or move the file into the workspace first; don't pass Termux-private paths.

## 23.3 edit_file says "match count mismatch"

**Cause**: the text to replace isn't unique, or the file changed since.

**Fix**: re-read the file; use a **line range** or **longer unique context**. Don't blindly retry.

## 23.4 Command output truncated / hard to read

**Fix**: redirect to a file and read it: `command > out.txt 2>&1`; or narrow the query (`head` / `tail` / `rg` with exact patterns).

## 23.5 Mini server 404 / page broken

**Fix**: have the AI check `read_mini_server_logs`:
- 404 → wrong path or missing file;
- Auth failure → username/password mismatch;
- JS error → script has syntax/path issues;
- SPA refresh 404 → enable `spa_fallback`;
- Confirm the served root actually contains the files you want.

## 23.6 Scheduled task didn't fire

**Fix**: check the task's enabled state and time/timezone/weekday (1=Monday); phone power management/killing background apps affects triggers — whitelist the app in battery settings; write the output location clearly in the prompt for later verification.

## 23.7 Email sending failed

**Fix**: most mailboxes need an **app-specific password**, not your login password; check IMAP/SMTP ports and encryption (SSL/STARTTLS); duplicate or uncertain deliveries are never auto-retried — first confirm whether the previous send actually happened.

## 23.8 WebDAV / FTP won't connect

**Fix**: test reachability with `webdav_list` / `file_transfer_list` first; check protocol (https/davs/ftps/sftp), port, username, passive mode; re-list accounts after changing passwords to get fresh IDs.

## 23.9 Model keeps erroring / spinning

**Fix**: see [Chapter 8, 8.6](/en/guide/models#_8-6-beginner-faq) — check Key, model name, network, Base URL; it's almost always one of those four.

## 23.10 I forgot where a permission is

**Quick index**:

| Permission | Where |
| --- | --- |
| Storage / notifications | System Settings → Apps → Lyra Code → Permissions |
| All files access | System Settings → Apps → Lyra Code → Permissions → All files access |
| Termux command channel | Lyra Code Settings → Termux permission |
| Shizuku | Activate in the Shizuku app + authorize in Lyra Code Settings |
| Tool switches | Lyra Code → Agent tools page |

## 23.11 Beginner FAQ

**Q: Will the AI upload my chat history?**
A: No. Conversations go only to the model provider you configured — no third-party relay; usage statistics are also estimated locally.

**Q: I posted my API key online. What now?**
A: Immediately **revoke it** in the provider console, generate a new one, and update it in the app.

**Q: My phone isn't rooted. Can I use all features?**
A: Yes. Root is only needed for a few system-level operations; daily features are unaffected.

---

*End of chapter · Next: Workflow Examples — 6 real-world scenarios*
