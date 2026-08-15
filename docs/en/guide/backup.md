---
title: Backup & Migration
---

# Chapter 20: Backup & Migration — keep your data safe

> Lyra Code stores your conversations, model configs, remote accounts, memory and Skills — **hard to rebuild if lost**. Get into the backup habit, and switching phones, wiping or deleting by accident is no big deal.
>
> Reading time: about 15 minutes.

---

## 20.1 What can be backed up?

| Category | Contents |
| --- | --- |
| Profile | Preferences, UI configuration |
| Conversations | All normal sessions (scheduled-task sessions excluded) |
| Model configs | Providers, Base URLs, default models |
| System prompts | Your custom prompt library |
| Remote configs | MCP, SSH, email, WebDAV, FTP accounts |
| Skills | Installed skill packs |
| Memory | Cross-session memory entries |

You can export specific data files on the **data export/import page**, and the export supports **custom content selection**.

## 20.2 The two export modes (know the difference!)

| Mode | Includes keys? | Purpose | Caution |
| --- | --- | --- | --- |
| **Safe export (default)** | ❌ No API keys/passwords/private keys | Regular backup, shareable | Must re-enter keys after restore |
| **Full migration export** | ✅ Everything, including keys | Phone switch, full migration | ⚠️ **Handing over all your keys — encrypt it, never share it publicly** |

::: danger Important warning
**A full migration backup contains ALL your passwords and keys.** Putting it on a cloud drive or in a chat tool = giving your keys to someone else. Delete copies after use.
:::

## 20.3 How to export / import?

**Export** (just say it):

> Export a backup to local (Download/LyraCode folder), including conversations and settings, without keys.

- You can also export directly to **WebDAV** (cloud backup): just name the drive account;
- When no file name is given for WebDAV, it overwrites `/LyraCode/lyra_backup_latest.zip`;
- Both **local zip backup** and **WebDAV cloud backup** are supported.

**Import** (just say it):

> Import the backup file `lyra_backup.zip` from my workspace

- Import sources: local files, Downloads, global storage, WebDAV;
- There are two import modes:
  - **Supplement import**: adds to your existing configuration. The app detects configs in the backup that you don't have yet and adds them, deduplicating identical ones — suitable for importing backups in any situation;
  - **Overwrite import**: removes all existing configs and uses the backup's data as the new configuration — only suitable for migrating data into a freshly installed app.

## 20.4 Backup strategy (copy this homework)

1. Turn on **WebDAV cloud backup** for important data (automatic, off-device);
2. Clean up old local backups regularly, keep only recent ones;
3. **Before switching phones**: do a full migration export → import on the new phone → verify the restore path with a safe export;
4. Name backups with dates (e.g. `lyra-2026-08-14.zip`) to avoid overwriting old versions.

## 20.5 Beginner FAQ

**Q: What if someone else gets my backup file?**
A: A safe export has no keys — low risk; a **full migration export** is all your keys — it must never leave your hands.

**Q: Will import overwrite my current data?**
A: Supplement import won't — it's non-destructive: new content merges in, existing content is kept where possible. Overwrite import clears and rebuilds everything, and is only for migrating to a fresh install.

**Q: How often should I back up?**
A: Weekly if you change things often; monthly is enough for chat-only users. With WebDAV, set a scheduled task to back up automatically (see [Chapter 17](/en/guide/scheduled-tasks)).

---

*End of chapter · Next: Usage Stats & Device Diagnostics — see your spending and check your phone*
