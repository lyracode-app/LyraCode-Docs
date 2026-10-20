# PRoot, Termux and commands

Goal: configure a development environment and know where commands execute. Internal PRoot and external Termux can be used independently or together.

| Environment | Agent tool | Typical use |
| --- | --- | --- |
| Internal PRoot Linux | `proot_command` with `linux_id` | Distribution user space and separate environments |
| External Termux | `run_command` | Existing Termux packages, scripts and directories |
| SSH machine | `ssh_exec` | Configured remote development machine |
| Shizuku / Root | `execute_shell_command` / `execute_root_command` | Device operations requiring actual system capabilities |

Use PRoot or Termux for ordinary project development. PRoot shares Android's kernel and Lyra Code's app permissions; it provides neither VM isolation nor Android Root access.

## Set up internal Linux

1. Open Settings > PRoot Linux and download the provided Debian image or import a compatible rootfs.
2. Import tar, tar.gz or tgz containing `/bin/sh` or `/bin/bash`. ISOs cannot be imported directly; decompress xz/zstd archives into a supported format first.
3. Match rootfs to the installed runtime. Current source contains arm64-v8a and x86_64 engines without cross-architecture emulation; use the app's architecture result.
4. Enable the instance, note its Linux ID and select it in the terminal. Each environment has a separate persistent terminal session.
5. Run `pwd` and `uname -m`, then inspect the project. An accessible selected workspace appears at `/workspace`; without one the default is `/root`.

```sh
pwd
printf 'Linux shell is ready\n'
```

**Success:** terminal output is correct and an Agent call using the same Linux ID sees the intended files. Install dependencies with the imported distribution's package manager.

With All files access, shared storage can appear at `/storage` and primary storage at `/sdcard`. Reconnect existing terminals after permission changes. Disabling or deleting an environment stops its retained processes; uninstalling or clearing app data removes its rootfs.

## Connect Termux

Run once inside Termux:

```sh
mkdir -p ~/.termux
grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || printf '%s\n' 'allow-external-apps=true' >> ~/.termux/termux.properties
termux-reload-settings
```

Grant Termux `RUN_COMMAND` in Lyra Code settings. Have `run_command` execute `pwd` and check exit code 0. Termux:API is not required. Packages and visible directories belong to Termux's own environment.

## Commands and persistent services

Specify working directory, dependencies and verification. Interactive installers are unsuitable for normal Agent calls. Use `command_lines` for multiline commands; foreground timeout defaults to 60 seconds and is capped at 600 seconds.

Use `background=true` for development servers and watchers. Record the output file and process information, then independently check logs, ports and service health. Android may terminate the app process, so persistent services are not guaranteed to run forever.

See [Tool arguments](/en/reference/tools) and [Preview and web access](/en/manual/local-services).
