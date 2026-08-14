---
title: Introduction & Setup
---

## 1. What is Lyra Code?

Lyra Code is an **Android-first local AI Agent app**. It brings model chat, a dual-pane file manager and code editor, native downloads, command execution, web search, MCP client/server support, SSH, SMTP/IMAP email, WebDAV, FTP/FTPS/SFTP, a built-in mini server, data backup, Skills, device diagnostics and usage statistics into a mobile workflow.

What makes it different from an ordinary AI chat app:

- **Local-first**: model keys, conversations, files and credentials stay on your device.
- **Agentic**: AI does more than answer - it reads files, edits code, runs commands and drives remote servers, with every action under your approval.
- **On-device engineering**: built around Android, with real shell capability through Termux.
- **Extensible**: Skills, MCP, scheduled tasks and configurable Agent tools cover personal automation and lightweight engineering workflows.

### 1.1 Who is it for?

- Developers who want code editing, scripting and file management on a phone;
- Power users who want AI to handle email, cloud drives, FTP servers and remote hosts;
- Content creators building local knowledge bases and automated writing/learning pipelines;
- Advanced users who want a controlled, approved Agent workflow.

### 1.2 Capability overview

| Area | Details |
| --- | --- |
| Model access | OpenAI-compatible APIs, Anthropic Messages, Gemini GenerateContent; multiple providers |
| Agent tools | Workspace/global file ops, native downloads, Termux commands, TODO planning, web search, scheduled tasks |
| Files & code | Dual-pane file manager, Sora Editor (TextMate highlighting), editor AI sidebar |
| Remote | MCP client/server, SSH, IMAP/SMTP, WebDAV, FTP/FTPS/SFTP |
| Server | Built-in HTTP/HTTPS static server with live logs |
| Extensions | Skills packages (zip / SKILL.md / Git repo import) |
| Data | Local zip backup, WebDAV cloud backup, deduplicated supplement import |
| System | Device info, hardware-check Agent, app list, optional Shizuku/Root |
| Statistics | Offline token estimation, day/week/month/year/range views |

## 2. Installation & Setup

### 2.1 Install

1. Download the latest APK from GitHub Releases or Gitee and install it;
2. Android 8.0 (API 26) or later is supported;
3. Grant the requested permissions (storage, notifications) on first launch.

### 2.2 Grant "All files access" to the file manager

The dual-pane file manager defaults to `/storage/emulated/0` and needs the all-files access permission (`MANAGE_EXTERNAL_STORAGE` on Android 11+):

```text
Settings → Apps → Lyra Code → Permissions → All files access → Allow
```

### 2.3 Configure Termux (required for command execution)

`run_command` relies on Termux's RunCommandService. First enable external app calls inside Termux:

```bash
mkdir -p ~/.termux && (grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || echo 'allow-external-apps=true' >> ~/.termux/termux.properties) && termux-reload-settings
```

Then grant the Termux communication permission in **Lyra Code Settings**. **Without it, `run_command` is disabled automatically.**

It is recommended to install the basic Termux packages:

```bash
pkg update && pkg install git openssh python nodejs-lts ripgrep file
```

::: tip
`run_command` runs as the Termux app user - **not root**, and not the Shizuku shell. For system-level operations, configure Shizuku or Root separately (see Chapter 7).
:::

### 2.4 Key settings

| Setting | Description |
| --- | --- |
| Model providers | Manage providers, API keys, base URLs and default models |
| System prompt | Custom global prompts; multiple presets, quick switch |
| Termux permission | Enable/disable the command channel |
| Web search blocklist | Block domains you don't want AI to open |
| Agent tool switches | Enable/disable system tools individually |
| Theme/font/refresh rate | Display preferences |
| Backup | Export/import local or WebDAV backups |

---