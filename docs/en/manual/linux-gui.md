# Linux GUI desktops

Goal: run an X11 desktop or a single graphical program inside PRoot Linux, operate it inside the app, take screenshots and preview applications in a floating window. The command-line environment itself is covered in [PRoot, Termux and commands](/en/manual/commands).

## Open a desktop

1. Enable an environment under **Settings → PRoot Linux**.
2. Tap the desktop icon on that environment's row.
3. Choose LXDE, Xfce, LXQt, Openbox, a recent command or a custom command in **Presets / Recent**.
4. After the session connects the toolbar collapses; the small button at the top right expands it again.

Each environment remembers its last desktop command, resolution, frame rate and eight most recent commands, so the form does not need to be filled in every time. The full-screen page rotates to landscape and hides system bars; the toolbar floats without shrinking the picture.

Desktops are not bundled with the app. The app provides the native X server, XKB data, authentication cookie and session shell; the distribution, desktop environment and window manager are yours to prepare in the rootfs.

## Install the minimal dependencies

On first use, have the AI call `linux_gui(action="guide")` for the install and troubleshooting rules of that environment, then install only the missing pieces with `proot_command`. The LXDE set for Debian and Ubuntu looks like this:

```sh
apt update
apt-get install -y --no-install-recommends x11-utils dbus-x11 fonts-dejavu-core lxde-core lxterminal
```

To preview a single program, install `openbox` plus that program's own libraries. Other distributions use their own package names; never mix one distribution's repositories into another.

Desktops that require systemd, a display manager, the system bus or a login manager must be prepared inside the rootfs yourself. Those components are outside this feature's support scope; when startup fails, switch to a desktop or window manager that does not depend on them.

## Display backends

`display_backend` decides how the picture reaches Android:

| Value | Behaviour |
| --- | --- |
| `auto` | Prefer the embedded X.Org/Lorie DDX, fall back to VNC only if startup fails |
| `native` | Use only the embedded server, returning its error on failure |
| `vnc` | Use the optional TigerVNC fallback pipeline |

The default path hands root-window pixels to the UI as AHardwareBuffer → EGLImage → SurfaceView. Normal presentation performs no compression, no RFB decoding and no CPU readback; frames are read back only for an explicit screenshot. The fallback runs TigerVNC inside the guest and carries RFB over a private Unix socket.

Automatic fallback happens before the desktop command runs, so the command executes exactly once. `display_backend.backend`, `transport`, `fallback_reason` and `ahb_frames` in the session status show which path was used; read those fields before installing VNC components.

X11 TCP is disabled: guests connect through a socket under `/tmp/.X11-unix` with the session's own Xauthority. Do not switch to `-ac`, `xhost +` or patched authentication scripts.

## Sessions, capacity and lifecycle

- One Linux session maps to one Android desktop surface; window placement inside it belongs to the Linux window manager.
- Different environments, and different displays in the same environment, are separate sessions. At most 4 concurrent sessions, a combined desktop area of 16,588,800 pixels and 3840×2160 per desktop.
- Desktops keep running after you navigate away. The foreground-service notification offers a way back and **Stop all desktops**.
- Closing one session terminates its PRoot supervisor and child processes.
- Disabling or deleting an environment closes its GUI sessions first.
- GUI sessions are not restored when Android kills the app process; open the desktop again.

If the startup log reports that a display is already in use, a previous X server is usually still around. Clean it up inside that Linux environment, or restart the app's runtime and try again.

## Touch, pointer, keyboard and IME

- Tap for the left button, long-press for the right button, drag for a left-button drag, two fingers to scroll.
- USB and Bluetooth mice with wheels and physical keyboards with modifiers are supported.
- The Android pointer is hidden over the desktop; a Linux cursor is drawn scaled to the framebuffer.
- The IME sends a Unicode keysym once a candidate is committed, and handles backspace and enter.
- Losing focus or switching sessions releases held keys and mouse buttons so drag state is not carried into other screens.
- A few system keys and shortcuts stay reserved by Android and are not forwarded.

Text rendering depends on fonts inside Linux; install fonts that cover the target script, and the command above already includes DejaVu as a baseline.

Session audio is routed through PulseAudio or PipeWire to Android's audio path, so at least one working audio service is required inside the guest.

## Let the AI preview an app or open a floating window

The AI entry point is `linux_gui` with the actions `guide`, `list`, `start`, `status`, `show`, `hide`, `stop`, `screenshot` and `request_overlay_permission`. Arguments and approval rules are listed in [Tools and arguments](/en/reference/tools).

```json
{"action":"start","linux_id":"debian","app_command":"cd /workspace/demo && python3 main.py","mode":"overlay","width":1024,"height":768,"fps":30}
```

- `app_command` is started with Openbox and a session D-Bus added automatically; your remembered desktop command is unaffected. Openbox and the project's GUI libraries must already be installed.
- Overlay mode needs Android's **Display over other apps** permission. Without it the tool opens the system permission page; retry after granting.
- A floating window can be moved by its title bar, resized from the bottom-right corner, minimised, given an IME, opened full screen or closed.
- `hide` only hides the floating window while the session keeps running; `stop` terminates the session.
- When a background AI run opens an overlay preview, the real preview window appears first and the foreground service starts afterwards, satisfying the Android 15+ visibility requirement. A failure at either step stops the new session.

When `start` returns `starting`, poll `status` until the session is `connected` with `has_frame=true` before treating the display as ready.

## Screenshots

The screenshot button and `screenshot` save the Linux framebuffer directly, so the image never contains Android toolbars and no screenshot utility is needed inside Linux. Android 10 and later saves to `Pictures/LyraCode`; older versions use the app's external pictures directory. The tool returns the actual URI or path.

## Launch another program on a running desktop

Starting an X11 program from another terminal in the same environment requires the session's `DISPLAY` and `XAUTHORITY`. Use the two lines at the top of the session log, or `environment_exports` from `status`:

```sh
export DISPLAY=:100
export XAUTHORITY=/path/to/session/Xauthority
gtk4-demo
```

Never paste the contents of an Xauthority cookie into a conversation or screenshot. Each session has its own display and cookie, and they cannot be reused across sessions.

**Success:** the desktop shows a usable window manager, a terminal opens and `xdpyinfo` runs, and a screenshot is saved containing only the Linux desktop.

## Troubleshooting

- **Startup fails or the screen stays black:** call `linux_gui(action="guide")` to verify dependencies, then read `fallback_reason` and the session log.
- **A display is reported as already in use:** clean up the leftover X server, or restart that environment.
- **Windows appear but text is boxes:** install fonts covering those characters inside the guest.
- **No floating window appears:** check the **Display over other apps** permission, or use full-screen mode.
- **No audio:** confirm PulseAudio or PipeWire works inside the guest and that the app is not muted.
- **The desktop disappears after Android reclaims the app:** GUI sessions do not survive the process; open it again.
