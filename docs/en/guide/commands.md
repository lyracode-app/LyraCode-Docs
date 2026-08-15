---
title: Running Commands
---

# Chapter 13: Running Commands — the Termux / Shizuku / Root channels

> This chapter covers **how to let the AI run commands**: the three privilege channels, run_command usage essentials, safe command examples, and destructive-operation discipline.
>
> Reading time: about 15 minutes.

---

## 13.1 Three channels, three privilege levels

Remember Chapter 2? Commands aren't run directly by the AI — they go through one of three "channels":

| Channel | Identity | What it can do | Needs |
| --- | --- | --- | --- |
| **Termux** | Normal app user | Build, Git, scripts, install software, search | Termux installed & authorized ([Chapter 2, 2.6](/en/guide/install#_2-6-setting-up-termux-so-ai-can-run-commands)) |
| **Shizuku** | ADB-level privilege | System commands (pm/dumpsys), protected paths | Shizuku installed & activated |
| **Root** | Highest privilege | System files, /data, system packages | Rooted phone |

::: warning The most important rule
**Never escalate just to make a command pass.** Use Termux for ordinary tasks; configure Shizuku/Root only when you truly need system-level operations.
:::

::: tip Why is Termux required?
Termux is the command-execution channel — **the Agent's `run_command` tool only works while Termux is running with permissions properly granted**. It's recommended to keep Termux in a **foreground small window** while in use so the system doesn't kill it in the background.
:::

## 13.2 run_command (Termux channel) essentials

- **Default directory**: commands run in your selected workspace — **no `cd` needed**;
- **Other directories**: use the `workDir` parameter or absolute paths;
- **Multiline commands**: tell the AI to pass them as a multiline array (e.g. scripts);
- **Chained steps**: the AI uses `&&` so a failed step stops the rest;
- **No interactive programs**: `vim`, `top`, games — anything needing continuous input can't run;
- **Long-running services**: use background mode (the AI gets a process ID and log file) — **but started ≠ healthy**; check the process and logs separately (see [Chapter 17](/en/guide/scheduled-tasks));
- **Timeout**: commands can run up to 600 seconds; when output is too long, save it to a file first: `command > out.txt 2>&1`;
- **High-risk blocking**: `rm -rf /`, writing system devices, etc. are blocked by the app — but **you should still review every command yourself**; the AI isn't infallible.

## 13.3 Safe command examples (understand these and you're in)

```bash
# Want to delete something? List first, decide later
find . -name '*.tmp' -type f

# Which folder eats the most space?
du -sh * | sort -h | tail -20

# Clone a GitHub project (shallow clone, latest only)
git clone --depth 1 https://github.com/lyracode-app/Lyra-Code.git

# Too much output? Save to a file and read it
rg -n 'error' --glob '*.log' . > /storage/emulated/0/Lyra/rg.out; wc -l /storage/emulated/0/Lyra/rg.out
```

## 13.4 Destructive operation discipline (recite before executing)

1. **Confirm the target**: before delete/overwrite, make the AI show the exact path and confirm it's correct;
2. **Minimal scope**: delete one file, not a whole folder; prefer rename over delete;
3. **Recoverable first**: back up (`.bak`) before acting;
4. **Read failures, don't repeat them**: error → read the message → adjust → retry. Never blindly rerun the same command.

## 13.5 System permissions: Shizuku & Root

System privileges can be obtained through:

- **Root manager**: obtain device Root permission to run Root commands.
- **Shizuku**: obtain adb shell permission to run adb and shell commands.

::: danger High-risk operations
This feature is high-risk. Review carefully before allowing execution, so the AI doesn't damage the system or your files. The app will block extremely dangerous commands as a last resort.
:::

**Shizuku special cases:**

Sometimes Shizuku shows it's running and has granted the app permission, yet still doesn't work. This usually happens after:

- The device has been restarted
- The adb process was lost after prolonged non-use

**Solution:** go to Shizuku, revoke the authorization for this app, tap enable again, grant the authorization to this app again, then restart this app — Shizuku should work normally.

## 13.6 Beginner FAQ

**Q: What happens if I ask the AI to run `rm -rf`?**
A: High-risk commands are blocked. But you shouldn't ask for them anyway — there are safer alternatives (back up, then delete).

**Q: A command timed out mid-run?**
A: It may still be running in the background. First check with a read-only command (is the process alive? did the file appear?), then decide whether to wait or retry.

**Q: Why does the AI say "command unavailable"?**
A: Termux isn't installed/authorized, or the Termux switch in Settings is off. Go back to [Chapter 2, 2.6](/en/guide/install#_2-6-setting-up-termux-so-ai-can-run-commands) and check.

**Q: Can I run commands myself?**
A: Yes — open Termux and type manually. It shares the same environment as the AI, so there's no conflict.

---

*End of chapter · Next: Remote Services — connect servers, email and file transfers*
