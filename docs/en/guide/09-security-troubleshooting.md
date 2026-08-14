---
title: Security & Troubleshooting
---

## 16. Security Practices & Permission Control

### 16.1 Minimal permissions

- disable system tools you don't use in the Agent tools page (e.g. don't enable Root unless needed);
- enable Termux/Shizuku/Root tiers on demand - never escalate for a single command;
- grant all-files access only when you need full-disk management.

### 16.2 Credentials & secrets

- API keys, SSH private keys, email app passwords and MCP tokens stay on-device and are not exported by default in backups;
- don't paste private keys in plain text into conversations sent to third-party services;
- backup files containing secrets must be encrypted and stored separately.

### 16.3 Network & plaintext

- plaintext HTTP API / MCP / WebDAV / FTP / mini server traffic can be read by intermediaries;
- before exposing to the public internet, tunneling or the LAN: check the served directory, auth and HTTPS;
- web search blocklist: exact domain match; `*.x.com` blocks subdomains; add both `x.com` and `*.x.com` to block everything.

### 16.4 Commands & remote operations

::: warning
- `run_command` has no fixed allowlist - it only blocks obvious high-risk patterns (`rm -rf /`, writing `/dev/block`, `mkfs`, ...). **Review every command before approving.**
- the trustworthiness of remote scripts, MCP servers, Skill repositories and SSH commands is your call;
- attachments only go to quarantine - scan them before opening;
- only preview trusted local HTML (browser scripts run with the browser's permissions).
:::

### 16.5 Approval strategy

::: tip
- read what you approve: which tool, which path, which command;
- reject suspicious calls and tell AI why;
- double-check sensitive operations (email sending, remote writes, deletions).
:::

## 17. Troubleshooting

### 17.1 run_command unavailable / auto-disabled

- check that Termux allows external app calls (see 2.3) and run `termux-reload-settings`;
- check the Termux permission switch in Lyra Code Settings.

### 17.2 "Path out of bounds" from file tools

- native tools only accept workspace-relative paths; absolute paths (e.g. `/storage/emulated/0/...`) need global_* tools or a correct workspace selection;
- never pass Termux-private paths to native tools.

### 17.3 edit_file reports "match count mismatch"

- the target text is not unique or has changed: re-read the file and use a line range or a longer unique context;
- don't blindly retry - read the file first.

### 17.4 Command output truncated

- redirect long output to a file and read it: `cmd > out.txt 2>&1`, or narrow the query (`head` / `tail` / `rg`).

### 17.5 Mini server 404 / page errors

- check `read_mini_server_logs`: 404 means the path is wrong, auth failures mean credentials mismatch, JS errors mean script issues;
- enable spa_fallback for SPA routes;
- confirm the served root contains the static files you expect.

### 17.6 Scheduled task not firing

- check the task enable state and schedule parameters (timezone, day_of_week 1=Monday);
- power management / background kills can prevent triggers - whitelist the app if needed;
- write the output location and format into the task prompt for easy verification.

### 17.7 Email sending failed

- most providers need an app password instead of the login password;
- check IMAP/SMTP ports and encryption (SSL/STARTTLS);
- confirm the send flow finished; duplicate or uncertain deliveries are never auto-retried.

### 17.8 WebDAV/FTP unreachable

- `webdav_list` / `file_transfer_list` first to see if the root is reachable;
- check protocol (https/davs/ftps/sftp), port, username, passive mode;
- re-list after credential changes to get fresh ids.

---