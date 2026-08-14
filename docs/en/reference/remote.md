---
title: Remote Integrations
---

All remote tools follow the same pattern: **list accounts first, then operate**.

## Account management (manage_app_config)

- manages MCP, SSH, email, WebDAV, FTP/FTPS/SFTP configs;
- missing keys/passwords/app passwords/private keys must come from you - AI never invents them;
- when identity is ambiguous, list first and use the returned id; re-list after credential changes.

## SSH

```text
list_ssh_servers → ssh_exec(server_id, command)
```

- password/key login for Linux / Windows / Git servers;
- every execution needs confirmation; check the system, resources and permissions before installing or changing config remotely;
- check log size first: `ls -lh app.log && tail -50 app.log`;
- avoid interactive programs (vim, top, nested ssh); confirm step by step.

## Email (IMAP / SMTP)

```text
list_email_accounts → list_email_folders → list_emails → read_email / save_email_draft / send_email
```

- reading never changes state (no seen flag); bodies are text only, media/attachment bytes omitted;
- attachments download only into **quarantine** - AI never reads them; scan before opening;
- sending requires fresh confirmation every time and never auto-retries possibly duplicate deliveries;
- safer: save a draft (save_email_draft) and send it manually;
- never reply to messages from the configured account itself.

## WebDAV

```text
list_webdav_servers → webdav_list / webdav_search / webdav_download_to_workspace / webdav_upload_from_workspace
```

- prefer `webdav_list` (PROPFIND) for directory structure;
- cloud backup supported (export_backup destination=webdav).

## FTP / FTPS / SFTP

```text
list_file_transfer_servers → file_transfer_list / file_transfer_search / upload / download
```

Listing, searching, uploading and downloading; credentials and passive mode are maintained in the config.

## MCP

**Client**: connect to remote MCP servers (Streamable HTTP / SSE); tools run on external servers, do not automatically gain workspace access, and every call needs approval.

**Server**: expose enabled local tools and connected MCP tools over HTTP to other clients, with a configurable port and optional auth key.

::: danger
Always set an auth key before exposing to LAN/public; MCP tools run on external servers - their trustworthiness is your call.
:::