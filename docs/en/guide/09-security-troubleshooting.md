---
title: Security & Troubleshooting
---

# Chapter 9: Security & Troubleshooting — use it safely, stay calm when things break

> The first half of this chapter is about **security habits** (how to use it with peace of mind); the second half is **troubleshooting** (what to do when something goes wrong). Bookmark the FAQ part and come back when you hit an issue.
>
> Reading time: about 20 minutes.

---

## 16. Security practices & permission control

### 16.0 The first principle of security

> **Least privilege: give the AI only as much permission as it needs.**

No matter how smart the AI is, it's still a program — the more permission it has, the worse the fallout if something goes wrong. If you don't need it to touch Root, don't give it Root.

### 16.1 Least privilege (how to do it)

- **Disable tools you don't use**: in the Agent tools page, turn off what you don't need (e.g. turn off the Root tool if you never use Root);
- **Three tiers, on demand**: Termux → Shizuku → Root; never use a higher tier when a lower one suffices (see Chapter 4);
- **"All files access"**: grant it only when you need full-disk file management; don't give it by default.

### 16.2 Credentials & keys (your lifelines)

- API keys, SSH private keys, email app passwords, MCP tokens: **all stored only on your device**, and backups don't export them by default;
- **Don't paste private keys in plain text in conversations** and ask for them to be forwarded to third parties;
- Backups containing keys (full migration export) **must be encrypted and stored separately**.

### 16.3 Network & plaintext (watch out for HTTP)

- HTTP transmits in plaintext = data can be seen by intermediaries. Keep this in mind for API / MCP / WebDAV / FTP / mini server over HTTP;
- **Before** public exposure, tunneling or LAN sharing: check the served directory, authentication, and HTTPS;
- **Web search blocklist**: add domains you don't trust; `*.x.com` blocks subdomains — add both `x.com` and `*.x.com` to block a site fully.

### 16.4 Commands & remote operations (review carefully)

::: warning High-risk operations
- Commands have no fixed whitelist — only obvious high-risk patterns are blocked (`rm -rf /`, writing system devices, formatting disks, etc.) — **when an approval popup appears, actually look at it**;
- Remote scripts, MCP services, Skills repositories, SSH commands: **you are responsible for trust decisions** — don't use anything from unknown sources;
- Attachments download into a **quarantine directory**; scan them with antivirus before opening;
- Only preview trusted local HTML (page scripts run with browser privileges).
:::

### 16.5 Approval popups: three questions before you tap OK

1. **What tool is being called and by whom?** Which path is being read/written, which command executed?
2. **Does this match what I asked?** Any extra action sneaking in?
3. **Is it sensitive?** Sending email, remote writes, deletion — form a double-confirmation habit.

> Spotted something suspicious? **Reject it** and tell the AI why ("I don't allow you to access this file").

### 16.6 Beginner security checklist

```text
□ Set a lock screen on your phone
□ API keys appear only in the provider console and the app
□ Don't install Skills/MCP/plugins from unknown sources
□ Backups with keys: encrypted storage, delete copies after use
□ Mini server bound to 127.0.0.1 unless LAN access is truly needed
□ Look at every approval popup before tapping
```

---

## 17. Common problems & troubleshooting (the repair manual)

### 17.1 Command execution unavailable / auto-disabled

**Possible causes**: Termux not installed, external-app-calls not enabled, or the Settings switch off.

**Fix** (check in order):
1. In Termux, confirm `allow-external-apps=true` is written and `termux-reload-settings` was run (Chapter 1, section 5.3);
2. Turn on the "Termux permission" switch in Lyra Code Settings.

### 17.2 File tools report "path out of bounds"

**Cause**: you passed an absolute path (e.g. `/storage/emulated/0/...`) to a workspace tool.

**Fix**: use `global_*` tools for files outside the workspace; or move the file into the workspace first; don't pass Termux-private paths.

### 17.3 edit_file says "match count mismatch"

**Cause**: the text to replace isn't unique, or the file changed since.

**Fix**: re-read the file; use a **line range** or **longer unique context**. Don't blindly retry.

### 17.4 Command output truncated / hard to read

**Fix**: redirect to a file and read it: `command > out.txt 2>&1`; or narrow the query (`head` / `tail` / `rg` with exact patterns).

### 17.5 Mini server 404 / page broken

**Fix**: have the AI check `read_mini_server_logs`:
- 404 → wrong path or missing file;
- Auth failure → username/password mismatch;
- JS error → script has syntax/path issues;
- SPA refresh 404 → enable `spa_fallback`;
- Confirm the served root actually contains the files you want.

### 17.6 Scheduled task didn't fire

**Fix**: check the task's enabled state and time/timezone/weekday (1=Monday); phone power management/killing background apps affects triggers — whitelist the app in battery settings; write the output location clearly in the prompt for later verification.

### 17.7 Email sending failed

**Fix**: most mailboxes need an **app-specific password**, not your login password; check IMAP/SMTP ports and encryption (SSL/STARTTLS); duplicate or uncertain deliveries are never auto-retried — first confirm whether the previous send actually happened.

### 17.8 WebDAV / FTP won't connect

**Fix**: test reachability with `webdav_list` / `file_transfer_list` first; check protocol (https/davs/ftps/sftp), port, username, passive mode; re-list accounts after changing passwords to get fresh IDs.

### 17.9 Model keeps erroring / spinning

**Fix**: see Chapter 2, section 4.5 — check Key, model name, network, Base URL; it's almost always one of those four.

### 17.10 I forgot where a permission is

**Quick index**:

| Permission | Where |
| --- | --- |
| Storage / notifications | System Settings → Apps → Lyra Code → Permissions |
| All files access | System Settings → Apps → Lyra Code → Permissions → All files access |
| Termux command channel | Lyra Code Settings → Termux permission |
| Shizuku | Activate in the Shizuku app + authorize in Lyra Code Settings |
| Tool switches | Lyra Code → Agent tools page |

### 17.11 Beginner FAQ

**Q: Will the AI upload my chat history?**
A: No. Conversations go only to the model provider you configured — no third-party relay; usage statistics are also estimated locally.

**Q: I posted my API key online. What now?**
A: Immediately **revoke it** in the provider console, generate a new one, and update it in the app.

**Q: My phone isn't rooted. Can I use all features?**
A: Yes. Root is only needed for a few system-level operations; daily features are unaffected.

---

*End of chapter · Next: Workflows & Appendix — real-world scenarios and a quick reference*
