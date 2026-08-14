---
title: Remote Integrations
---

# Chapter 5: Remote Integrations — connect servers, email and file transfers

> This chapter covers Lyra Code's "remote powers": connecting your own servers, email, cloud drives, FTP, and MCP — the AI's "external devices".
> In plain words: **let the AI on your phone "remote-control" your other computers and accounts**.
>
> Reading time: about 25 minutes.

---

## 8. Remote integrations: SSH / Email / WebDAV / FTP / MCP

### 8.0 First, what can remote integration do? (examples)

- **SSH**: you have a Linux cloud server; you want the AI to check logs, restart services, deploy projects;
- **Email**: you have a QQ/163/Gmail mailbox; you want the AI to read unread mail and draft replies;
- **WebDAV**: you use a cloud drive (Nutstore, Nextcloud, etc.); the AI uploads/downloads files and backs up automatically;
- **FTP/SFTP**: you have a traditional FTP space; the AI uploads files to it;
- **MCP**: connect the AI to third-party professional tools (database queries, weather, etc.).

All remote features follow the **same safety pattern**:

> **List accounts first, then operate.** Every operation needs your confirmation. Credentials are stored only on your device.

### 8.1 Account management rules

- All remote configs (MCP, SSH, email, WebDAV, FTP) are managed in the app's **config manager**;
- When adding accounts, **missing passwords, keys and private keys must be provided by you** — the AI never invents them;
- When identity is unclear, the AI **lists existing accounts first** for you to confirm, then operates;
- After changing a password, old account IDs become invalid — re-list to get fresh ones.

::: tip How do I add an account?
Either way works:
1. **Fill it yourself**: Settings → Config manager → add SSH/Email/WebDAV…, enter host, user, password;
2. **Let the AI fill it**: just say "add a WebDAV account, address xxx, username xxx, password xxx" — the AI walks through the config flow (the password stays on your device).
:::

### 8.2 SSH: connect to your server

**What it is**: SSH is the standard way to connect to Linux/Windows servers. Once configured, the AI can run commands on the server just like on your phone.

**You need**: server address, port (default 22), username, password (or private key).

**Example**:

> Check the disk usage on my server: run `df -h` via ssh_exec

**Safety points (read these)**:

- Every command needs confirmation;
- Before **installing software or changing config** remotely, the AI checks the server's OS, CPU, memory, disk and permissions;
- When reading logs, check size and line count first, read only a small slice (`ls -lh app.log && tail -50 app.log`);
- No interactive programs (`vim`, `top`, nested ssh);
- Don't chain "install, modify, restart" into one command — do it step by step with your confirmation at each step.

### 8.3 Email (IMAP / SMTP): let the AI handle mail

**What it is**:
- **IMAP**: reading your mailbox (inbox, drafts…);
- **SMTP**: sending email.

**Typical flow**: list unread mail → extract key points → draft a reply → you review and send.

**Pipeline**:

```text
List accounts → List folders → List emails → Read one / save draft / send
```

**Safety points**:

- **Reading doesn't change state**: reading an email does not mark it as read;
- **Text only**: inline images and attachment bytes are never shown to the AI (prevents leaks);
- **Attachments go to quarantine**: downloaded attachments sit in an isolated directory that **the AI never reads** — scan them with antivirus yourself before opening;
- **Sending needs a fresh confirmation every time**, and possibly-duplicate deliveries are never auto-retried;
- **The safer way**: have the AI **save a draft** (to the IMAP drafts folder), review it, then send manually;
- **Don't reply to yourself**: never reply to emails sent by the configured account itself.

### 8.4 WebDAV: use your cloud drive as "cloud backup"

**What it is**: WebDAV is a network file protocol supported by Nutstore, Nextcloud and others. Once configured, the AI treats the cloud drive as a remote folder.

**Typical uses**:

- Upload/download files: `webdav_upload_from_workspace` / `webdav_download_to_workspace`;
- **Cloud backups**: export Lyra Code backups directly to WebDAV (see backup section in Chapter 7);
- Browse the drive: `webdav_list` (prefer listing over searching).

### 8.5 FTP / FTPS / SFTP: classic file transfer

**What it is**: the old-school file transfer protocol, handy for older servers and virtual hosts.

- Listing, searching, uploading and downloading all supported;
- Credentials and passive mode are maintained in the config (check these first when connections fail).

### 8.6 MCP: the AI's "plug-in devices"

**What it is**: MCP (Model Context Protocol) is a standard way for the AI to connect external tools/data. Think of it as **plugging a USB stick or attaching a sensor to the AI**.

**As a client (AI connects to others' tools)**:

- Connect to remote MCP servers over Streamable HTTP or SSE;
- MCP tools run on **external servers** and **do not automatically get access to your phone's files** — every call needs your approval;
- Config needs the server address and any required token/auth.

**As a server (expose Lyra Code's abilities to others)**:

- Expose the currently enabled tools to other MCP clients over local/LAN HTTP;
- Configurable port and optional auth key;
- ⚠️ **Exposing to the LAN = other devices can access it** — always set an auth key; public exposure is riskier and should be avoided unless necessary.

### 8.7 Natural-language config management: just speak

You don't need to memorize any config menus — say it in plain language:

```text
Add a WebDAV account: https://dav.example.com, user alice, password ********
Update the private key of SSH server "nas"
Disable FTP account server-02
```

The AI lists current configs to confirm identity first, then applies the change (with your confirmation).

### 8.8 Beginner FAQ

**Q: Do I have to configure all of these?**
A: No. Configure only what you use. A chat-only user needs nothing.

**Q: Where are my account passwords stored? Is it safe?**
A: On your phone, locally; backups don't export keys by default. That's safer than cloud notes — but still set a lock screen.

**Q: Can the AI peek at my emails?**
A: Only when you ask it to; reading doesn't change state, attachments never enter the chat, and sending always requires your confirmation.

**Q: Can't connect to server/mailbox?**
A: Check in order: ① correct credentials? ② correct port and encryption (SSL/STARTTLS)? ③ network reachable? ④ re-list accounts after a password change.

---

*End of chapter · Next: Mini Server & Skills — run a website on your phone, teach the AI new skills*
