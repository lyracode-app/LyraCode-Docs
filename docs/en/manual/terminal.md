# Terminal: local Linux and SSH

Goal: work directly in the on-device PRoot Linux or a remote SSH host, and confirm that keyboard input, output and session persistence behave as expected. The Agent-side equivalents are described in [PRoot, Termux and commands](/en/manual/commands).

## Open the terminal

The **SSH terminal** page in the main navigation is the terminal page. Its target picker lists, in order:

1. Enabled PRoot Linux environments, shown as `name · Linux ID`.
2. Enabled SSH servers, shown with the name from their configuration.

Select a target and choose **Connect**. While connected the button becomes **Disconnect**. With no enabled environment or server, the picker reports that no server is available; enable one in [PRoot Linux settings](/en/manual/commands) or [SSH configuration](/en/manual/remote-services) first.

## Local Linux sessions

A local target is an interactive shell inside a PRoot environment, with no SSH involved.

- Each environment has one independent session. After navigating to another page, returning to a conversation or switching targets, jobs and editors in that shell keep running.
- The session lasts for the app's lifetime. Disabling the environment in settings or deleting it ends the session.
- The working directory belongs to the same environment as the Agent's `proot_command`: same rootfs, same mounts. A selected workspace appears at `/workspace`, shared storage at `/storage` and `/sdcard`.
- The terminal session and Agent calls are separate processes. They share files and mounts but not shell variables, working directory or background jobs. Do not run a long command by hand in the terminal while the Agent builds in the same directory.

If the environment is not ready, its rootfs is missing or permissions changed, follow the [commands page](/en/manual/commands) first, then reconnect.

## Remote SSH sessions

Remote targets need a working server configuration; credentials and host details are covered in [SSH and remote files](/en/manual/remote-services).

Status messages match actual connection stages:

| Message | Meaning |
| --- | --- |
| Establishing a secure connection… | Handshake and authentication started |
| Connected securely | Authenticated and ready for input |
| Connection lost, reconnecting (attempt N)… | Automatic reconnect with increasing delay |
| Disconnected | Manual disconnect or reconnects stopped |
| Server host key changed; connection refused for safety | The remote fingerprint no longer matches the saved value |
| Authentication failed; check the username and credentials | Password or private key was rejected |
| Connection timed out; check the server and network | Host unreachable or not responding |

A changed host key is never accepted automatically or silently ignored. Update the server configuration only after confirming the remote key really changed; stop using the host if the new fingerprint has no clear origin.

Long-running work relies on SSH keepalives and a bounded number of reconnects. Foreground processes may have ended while disconnected, so check `pwd`, `jobs` or the process list instead of assuming a command is still running.

## Input, copy and links

Two rows of extra keys below the terminal cover what the soft keyboard lacks:

- First row: `Esc`, `/`, `-`, `Home`, `↑`, `End`, `PgUp`.
- Second row: `Tab`, `Ctrl`, `Alt`, `←`, `↓`, `→`, `PgDn`.

`Ctrl` and `Alt` are sticky modifiers: highlight one and the next key is combined with it, for example `Ctrl` plus `c` to send an interrupt. A physical keyboard works directly.

- Long-press and drag selects text; the status bar offers copy.
- **Paste** inserts clipboard content. **Clear terminal** empties the visible screen and scrollback without ending the session.
- Recognised URLs in the output appear as links; tapping one opens a dialog where the address can be copied to the clipboard.

## Appearance settings

Terminal font, size and colour scheme live in the appearance settings:

1. Open **Settings → Appearance and display → Fonts and size**.
2. Choose a terminal font below the font library. The app bundles no terminal fonts and defaults to the system monospace font; Maple Mono or JetBrains Mono are good monospace choices.
3. Drag the size slider within the 8–28 sp range.
4. Choose a palette: Campbell or Solarized Dark. The swatch below shows the actual values of the 16 ANSI colours.

A palette only resolves indexed colours; 24-bit colour output from programs is unaffected. After changing settings, check Chinese text, box-drawing characters and ANSI colours in the terminal.

**Success:** a local target runs `pwd` and reports the expected directory; an SSH target runs `uname -a`; extra keys, copy/paste and non-ASCII text all render correctly.

## Troubleshooting

- **No local target listed:** the environment is disabled or still preparing. Enable it in settings and reopen the terminal page.
- **A command seems gone after reconnecting:** foreground processes may have ended while disconnected. Inspect the process state and restart the command if needed.
- **Chinese text renders as boxes:** install a CJK font inside Linux, or select a font in the library that covers those characters.
- **Pasting adds unexpected newlines:** multiline content is executed line by line. Review each command before pasting.
- **Passing a terminal path to the Agent:** use the absolute path. The Agent's `proot_command` runs in the same environment and sees the same files.
