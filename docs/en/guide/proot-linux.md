---
title: PRoot Linux
---

# PRoot Linux — an app-internal Linux environment

PRoot Linux runs a Debian, Ubuntu, Alpine, or another compatible root filesystem from Lyra Code's app-private storage. It does not require Root or Termux.

PRoot is not a virtual machine and does not start another kernel. Processes still use Lyra Code's Android UID and remain subject to Android permissions and SELinux. It does not grant Root privilege.

## Requirements

The bundled engine currently supports **arm64-v8a (AArch64)** only. Check **Settings → About → Device information**. A small APK is expected: Linux root filesystems are downloaded or imported separately.

## Install the recommended Debian environment

1. Open **Settings → PRoot Linux**.
2. Tap **Install Debian**.
3. Keep the network available during download, SHA-256 verification, and extraction.
4. Wait until an enabled environment appears and note its Linux ID.
5. Open **Terminal**, select it, and run `uname -m`.

Reserve several gigabytes of free space and do not force-stop the app during installation.

## Import another rootfs

The importer accepts ARM64/AArch64 `.tar.gz`, `.tgz`, and uncompressed `.tar` root filesystems containing `/bin/sh` or `/bin/bash`.

It does not accept installer ISOs, amd64/x86_64 filesystems, direct Docker/OCI references, or XZ/Zstandard archives. Suitable sources include Alpine **Mini root filesystem → aarch64**, Ubuntu Base ARM64 tarballs, and generic Arch Linux ARM AArch64 rootfs archives.

1. Download the archive to the phone.
2. Open **Settings → PRoot Linux → Import Linux**.
3. Select the archive and enter a recognizable name.
4. Wait for validation and extraction, then enable and test it.

The importer rejects path traversal, normalizes a single wrapping directory, requires a shell, and checks ELF shells for AArch64 compatibility.

## Terminal and Agent use

Every enabled environment is an independent Terminal target. Typical commands are:

```bash
cat /etc/os-release
apt update    # Debian or Ubuntu
apk update    # Alpine
```

When at least one environment is enabled, the Agent receives `proot_command`. Every call specifies `linux_id`; commands start in `/root` unless another valid working directory is supplied.

## Android file mounts

| Linux path | Meaning | Requirement |
| --- | --- | --- |
| `/workspace` | Current chat workspace | A directly accessible workspace |
| `/storage` | Android shared storage | All files access |
| `/sdcard` | Primary shared-storage alias | All files access |
| `/root` | Private home in this rootfs | Always available |

A document-provider-only SAF workspace cannot currently be bind-mounted. Reconnect existing terminals after changing All files access because mounts are fixed when the process starts.

These mounts do not bypass app-UID permissions or expose another app's private data.

## File Manager access

Open **Files → top-right menu → Open PRoot Linux instances**. These are live rootfs files; editing `/etc`, `/bin`, or `/usr` can break the environment. Stop terminals before copying a backup, and delete complete environments from **Settings → PRoot Linux**.

## Disable, delete, and data ownership

- **Disable** preserves the rootfs but removes it from Terminal and Agent availability.
- **Delete** permanently removes installed packages, configuration, and files in that environment.
- App updates do not replace rootfs data.
- Uninstalling Lyra Code or clearing app data removes all app-private environments.
- Android cloud backup does not include these potentially multi-gigabyte directories.

## Common problems

- **Unsupported device:** the current engine does not emulate non-AArch64 CPUs.
- **ISO import fails:** download a rootfs tarball, not boot or installer media.
- **No `/workspace`:** select a directly accessible workspace or copy the project out of a document-provider-only SAF location.
- **No `/storage`:** grant shared-storage access and reconnect Terminal.
- **Production hosting:** PRoot is intended for development and temporary services; Android may reclaim background processes.

---

*Continue with [Running Commands](/en/guide/commands) or [File Manager & Code Editor](/en/guide/files).*
