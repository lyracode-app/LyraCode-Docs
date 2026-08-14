---
title: Remote Integrations
---

## 8. Remote Integrations: SSH / Email / WebDAV / FTP / MCP

All remote tools follow the same pattern: **list accounts first, then operate**. Credentials are stored locally.

### 8.1 Account management rules

- all remote configs (MCP, SSH, email, WebDAV, FTP/FTPS/SFTP) are managed through the configuration manager;
- when adding accounts, missing keys, passwords, app passwords and private keys must be provided by you - AI **never invents them**;
- when identity is ambiguous, `list` first, then use the returned id; re-list after credential changes.

### 8.2 SSH

```text
list_ssh_servers → ssh_exec(server_id, command)
```

- password or key login for Linux / Windows / Git servers;
- every command requires confirmation; before installing or changing config remotely, check OS, CPU/memory/disk and permissions;
- when reading logs, check size and line count first, read a small range: `ls -lh app.log && tail -50 app.log`;
- avoid interactive programs (vim, top, nested ssh); confirm step by step instead of chaining everything into one command.

### 8.3 Email (IMAP / SMTP)

```text
list_email_accounts → list_email_folders → list_emails → read_email / save_email_draft / send_email
```

- **reading does not change state**: read_email does not mark messages as read;
- bodies are returned as text; inline media and attachment bytes are omitted;
- attachments are downloaded only into a **quarantine directory** and never read by AI - scan them with a trusted antivirus first;
- sending (send_email) requires **fresh confirmation every time** and never auto-retries possibly duplicate deliveries;
- the safer path is saving a draft (save_email_draft) and sending it manually after review;
- never reply to messages sent by the configured account itself.

### 8.4 WebDAV

```text
list_webdav_servers → webdav_list / webdav_search / webdav_download_to_workspace / webdav_upload_from_workspace
```

- prefer `webdav_list` (PROPFIND) to inspect directory structure instead of searching ".";
- cloud backups are supported (export_backup destination=webdav).

### 8.5 FTP / FTPS / SFTP

```text
list_file_transfer_servers → file_transfer_list / file_transfer_search / upload / download
```

Listing, searching, uploading and downloading are all supported; credentials and passive mode are maintained in the config.

### 8.6 MCP: client and server

**As a client**:

- connect to remote MCP servers over Streamable HTTP or SSE;
- MCP tools run on external servers and **do not automatically have workspace access** - every call requires approval;
- provide the server address and any required token/auth when configuring.

**As a server**:

- expose Lyra Code's enabled local tools and connected MCP tools to other MCP clients over local/LAN HTTP;
- configurable port and optional auth key;
- exposing to the LAN means other devices can access it - always set an auth key; public exposure is riskier.

### 8.7 Natural-language config management

You can manage remote configs in plain language, for example:

```text
Add a WebDAV account: https://dav.example.com, user alice, password ******
Update the private key of SSH server "nas"
Disable FTP account server-02
```

AI lists the current config to confirm identity first, then applies the change.

---