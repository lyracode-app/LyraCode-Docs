---
title: Command Execution
---

## Privilege tiers

| Tool | Identity | Use cases | Prerequisite |
| --- | --- | --- | --- |
| run_command | Termux app user | build, Git, scripts, package management, content search | Termux authorized |
| proot_command | selected app-internal Linux environment | Linux packages, scripts, and tools | an enabled PRoot environment |
| execute_shell_command | Shizuku shell (ADB level) | pm / cmd / dumpsys / protected paths | Shizuku authorized |
| execute_root_command | root (su) | system files, /data, system packages | rooted with su configured |

::: warning
Don't escalate just to make a command pass. If Termux can do it, don't reach for Shizuku/Root.
:::

## run_command

Run non-interactive commands in Termux; returns exit_code / stdout / stderr.

::: tip
- the default working directory is the workspace; use `workDir` or absolute paths elsewhere;
- use the `command_lines` array for multiline/indentation-sensitive commands;
- chain dependent steps with `&&`, keep unrelated commands separate;
- don't run interactive programs; use `background=true` for long-running services (returns launcher_pid + output file); **launch success does not mean healthy** - check the process/log separately;
- timeouts are 5-600 seconds; redirect long output to a file and read it: `cmd > out.txt 2>&1`;
- high-risk operations (`rm -rf /`, `/dev/block`, `mkfs`) are blocked, but human review still matters.
:::

## execute_shell_command

Run system commands via Shizuku at ADB privilege, often `pm`, `cmd`, `dumpsys`. Inspect read-only first before making changes.

## proot_command

Runs through `/bin/bash -lc` or `/bin/sh -lc` in the environment selected by `linux_id`. The default directory is `/root`; a directly accessible workspace may be mounted at `/workspace`. With All files access, shared storage is available at `/storage` and `/sdcard`. This is not Root and remains subject to the Android app UID and SELinux. See [PRoot Linux](/en/guide/proot-linux).

## execute_root_command

Run as root. Before touching /data, system files or system packages, confirm the exact target and prepare a recovery plan (backup/snapshot).

## Command safety discipline

- before destructive operations: verify the **exact target path** and minimize scope;
- prefer recoverable operations (rename over delete, backup first);
- confirm with `ls -la` before deleting;
- read the error, adjust and retry - never blindly rerun.
