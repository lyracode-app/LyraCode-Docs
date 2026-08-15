---
title: Remote Services
---

# Chapter 14: Remote Services — connect servers, email and file transfers

> This chapter covers Lyra Code's "remote powers": connecting your own servers, email, cloud drives and FTP.
> In plain words: **let the AI on your phone "remote-control" your other computers and accounts**.
> (For MCP, see [Chapter 15](/en/guide/mcp).)
>
> Reading time: about 20 minutes.

---

## 14.1 First, what can remote integration do? (examples)

- **SSH**: you have a Linux cloud server; you want the AI to check logs, restart services, deploy projects;
- **Email**: you have a QQ/163/Gmail mailbox; you want the AI to read unread mail and draft replies;
- **WebDAV**: you use a cloud drive (Nutstore, Nextcloud, etc.); the AI uploads/downloads files and backs up automatically;
- **FTP/SFTP**: you have a traditional FTP space; the AI uploads files to it.

All remote features follow the **same safety pattern**:

> **List accounts first, then operate.** Every operation needs your confirmation. Credentials are stored only on your device.

## 14.2 Account management rules

- All remote configs (SSH, email, WebDAV, FTP) are managed in the app's **config manager**;
- When adding accounts, **missing passwords, keys and private keys must be provided by you** — the AI never invents them;
- When identity is unclear, the AI **lists existing accounts first** for you to confirm, then operates;
- After changing a password, old account IDs become invalid — re-list to get fresh ones.

::: tip How do I add an account?
Either way works:
1. **Fill it yourself**: Settings → Config manager → add SSH/Email/WebDAV…, enter host, user, password;
2. **Let the AI fill it**: just say "add a WebDAV account, address xxx, username xxx, password xxx" — the AI walks through the config flow (the password stays on your device).
:::

## 14.3 SSH: connect to your server

**What it is**: SSH is the standard way to connect to Linux/Windows servers. Once configured, the AI can run commands on the server just like on your phone.

**You need**: server address, port (default 22), username, password (or private key); both password and key authentication are supported.

**Example**:

> Check the disk usage on my server: run `df -h` via ssh_exec

**Safety points (must read for beginners)**:

- Every command needs confirmation;
- Before **installing software or changing config** remotely, the AI checks the server's OS, CPU, memory, disk and permissions;
- When reading logs, check size and line count first, read only a small slice (`ls -lh app.log && tail -50 app.log`);
- No interactive programs (`vim`, `top`, nested ssh);
- Don't chain "install, modify, restart" into one command — do it step by step with your confirmation at each step.

::: warning Note
Highly interactive commands are poorly supported — never run complex strongly-interactive commands. (Nothing much would happen if you did…)
:::

## 14.4 Email (IMAP / SMTP): let the AI handle mail

**What it is**:
- **IMAP**: reading your mailbox (inbox, drafts…);
- **SMTP**: sending email.

Support for connecting to SMTP and IMAP mail servers has been available since **version 3.5.0** — you can have the AI operate your mail and assist with handling it.

**Typical use**: list unread mail → extract key points → draft a reply → you review and send.

**Pipeline**:

```text
List accounts → List folders → List emails → Read one / save draft / send
```

**Safety points**:

- **Reading doesn't change state**: reading an email does not mark it as read;
- **Text only**: inline images and attachment bytes are never shown to the AI (prevents leaks);
- **Attachments go to quarantine**: downloaded attachments sit in an isolated directory that **the AI never reads** — scan them with antivirus yourself before opening;
- **Sending needs a fresh confirmation every time**, and possibly-duplicate deliveries are never auto-retried; **the email-send confirmation is enforced** — it is not auto-approved just because no-approval mode is on;
- **The safer way**: have the AI **save a draft** (to the drafts folder), review it, then send manually in your mailbox;
- **Don't reply to yourself**: never reply to emails sent by the configured account itself.

::: tip Note
Some mail providers don't allow direct password login — they use an **authorization code** (app-specific password), and this feature may need to be enabled separately before external apps can connect.
:::

## 14.5 WebDAV: use your cloud drive as "cloud backup"

**What it is**: WebDAV is a network file protocol supported by Nutstore, Nextcloud, Cloudreve, 123 Cloud Drive and more (most self-hosted and third-party WebDAV servers). Once configured, the AI treats the cloud drive as a remote folder.

**Typical uses**:

- Upload/download files: `webdav_upload_from_workspace` / `webdav_download_to_workspace`;
- **Cloud backups**: export Lyra Code backups directly to WebDAV (see [Chapter 20 "Backup & Migration"](/en/guide/backup));
- Browse the drive: `webdav_list` (prefer listing over searching — it's more intuitive).

## 14.6 FTP / FTPS / SFTP: classic file transfer

**What it is**: the old-school file transfer protocol, handy for older servers, virtual hosts and website operations.

- Listing, searching, uploading and downloading all supported;
- Supported by almost all servers and PC devices — very useful for website admins;
- Credentials, passive mode and other parameters are maintained in the config (check these first when connections fail).

## 14.7 Natural-language config management: just speak

You don't need to memorize any config menus — say it in plain language:

```text
Add a WebDAV account: https://dav.example.com, user alice, password ********
Update the private key of SSH server "nas" with this new private key content
Disable FTP account server-02
```

The AI lists current configs to confirm identity first, then applies the change (with your confirmation).

## 14.8 Beginner FAQ

**Q: Do I have to configure all of these?**
A: No. Configure only what you use. A chat-only user needs nothing.

**Q: Where are my account passwords stored? Is it safe?**
A: On your phone, locally; backups don't export keys by default. That's safer than cloud notes — but still set a lock screen.

**Q: Can the AI peek at my emails?**
A: Only when you ask it to; reading doesn't change state, attachments never enter the chat, and sending always requires your confirmation.

**Q: Can't connect to server/mailbox?**
A: Check in order: ① correct credentials? ② correct port and encryption (SSL/STARTTLS)? ③ network reachable? ④ re-list accounts after a password change.

---

*End of chapter · Next: MCP — plug in external tools*
