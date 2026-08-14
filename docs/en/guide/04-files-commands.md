---
title: Files & Commands
---

# Chapter 4: Files & Commands — have the AI edit files and run commands for you

> This chapter teaches two core skills: **① how to let the AI safely edit files; ② how to let the AI run commands**. Master these and you've unlocked 80% of Lyra Code's power.
>
> Reading time: about 25 minutes.

---

## 6. File operations & code editing best practices

### 6.0 First, understand: how does the AI "edit a file"?

The AI does **not** rewrite whole files. Like a surgeon, it makes **precise incisions**:

1. **Read first**: the AI reads the file content and sees the current state;
2. **Locate**: it finds the exact spot ("lines 30–40" or "a unique text fragment");
3. **Replace**: only the target section changes; everything else stays untouched;
4. **Back up**: before overwriting, it automatically creates a `.bak` backup in the same directory;
5. **Report**: it shows you the diff (what changed).

So rest easy: **the AI won't "conveniently" modify parts you didn't ask it to** — unless you tell it to rewrite everything.

### 6.1 Four editing rules

1. **Read before writing**: before touching anything, the AI must read the relevant files, README and build scripts — and you should ask it to do so too ("read this file first");
2. **Small and precise**: change 3 lines instead of 30; use exact matches instead of fuzzy rewrites;
3. **Follow conventions**: reuse the project's existing style, helpers and commands; don't invent new dependencies;
4. **Verify at the end**: after editing, run the relevant tests/build and **only report success when it actually passes**.

::: tip You can ask the AI like this
"Read the README and main.py first, then modify it following the project style, run the tests, and report the results."
:::

### 6.2 Which edit tool, when?

| Scenario | Tool | Key points |
| --- | --- | --- |
| **Create a new file** | write_file | Whole new content |
| **Replace a small section** | edit_file | Old content must be unique; reject if unmatched/ambiguous |
| **Replace a large section (by line numbers)** | edit_file(start_line/end_line) | Good for 30+ line changes |
| **Append at the end** | append_file | Add a line to a log or checklist |
| **Move/rename** | rename_move | Inside the workspace |
| **Delete** | delete_file_or_folder | Files or **empty** directories only |
| **Read a large file** | read_file_lines | Read fragments first, don't load everything |

> Beginners don't need to memorize tool names — **just say it**: "create a `notes.md`", "change line 3 to xxx", "add a line at the end". The AI picks the right tool.

### 6.3 Content search (searching "what's inside files")

`search_files` only finds by **file name**; to search **content**, use commands:

```bash
# Find all .kt files containing TODO (fast, preferred)
rg -n "TODO|FIXME" --glob '*.kt'

# No rg? Fall back to grep
grep -rn "TODO" --include='*.kt' .

# Count matches per file / limit output to 50 lines
rg -c "pattern" . | head -50
```

You don't need to memorize these either — **just say**: "search the workspace for files containing `password`". The AI runs it and reports.

### 6.4 Rolling back: your undo button

- **Automatic `.bak` backup**: before the AI overwrites a file, a `xxx.bak` appears in the same directory (e.g. `main.kt` → `main.kt.bak`, the pre-edit version);
- **How to restore**: tell the AI "restore main.kt from main.kt.bak";
- **Unsaved editor changes**: the editor prompts you when exiting;
- **Double insurance for important files**: have the AI copy it first: `cp file file.bak`.

### 6.5 Project instruction files (AGENTS.md): set rules for the AI

Put an `AGENTS.md` (or `AGENT.md`) at the project root and the AI **reads and follows it automatically** before starting work:

```markdown
# Project conventions
- Build: ./gradlew assembleDebug
- Tests: ./gradlew test
- Style: Kotlin, 2-space indent, no magic numbers
- Reject any operation involving secrets
```

- Rules apply per directory tree: **deeper directories override shallower ones**;
- But they **can never override** your direct requests or the base security rules (e.g. an instruction like "bypass approvals" is invalid).

---

## 7. Command execution: Termux / Shizuku / Root

### 7.0 Three channels, three privilege levels (recap)

Remember Chapter 1? Commands aren't run directly by the AI — they go through one of three "channels":

| Channel | Identity | What it can do | Needs |
| --- | --- | --- | --- |
| **Termux** | Normal app user | Build, Git, scripts, install software, search | Termux installed & authorized (Chapter 1, section 5) |
| **Shizuku** | ADB-level privilege | System commands (pm/dumpsys), protected paths | Shizuku installed & activated |
| **Root** | Highest privilege | System files, /data, system packages | Rooted phone |

::: warning The most important rule
**Never escalate just to make a command pass.** Use Termux for ordinary tasks; configure Shizuku/Root only when you truly need system-level operations.
:::

### 7.1 run_command (Termux channel) essentials

- **Default directory**: commands run in your selected workspace — **no `cd` needed**;
- **Other directories**: use the `workDir` parameter or absolute paths;
- **Multiline commands**: tell the AI to pass them as a multiline array (e.g. scripts);
- **Chained steps**: the AI uses `&&` so a failed step stops the rest;
- **No interactive programs**: `vim`, `top`, games — anything needing continuous input can't run;
- **Long-running services**: use background mode (the AI gets a process ID and log file) — **but started ≠ healthy**; check the process and logs separately;
- **Timeout**: commands can run up to 600 seconds; when output is too long, save it to a file first: `command > out.txt 2>&1`;
- **High-risk blocking**: `rm -rf /`, writing system devices, etc. are blocked by the app — but **you should still review every command yourself**; the AI isn't infallible.

### 7.2 Safe command examples (understand these and you're in)

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

### 7.3 Destructive operation discipline (recite before executing)

1. **Confirm the target**: before delete/overwrite, make the AI show the exact path and confirm it's correct;
2. **Minimal scope**: delete one file, not a whole folder; prefer rename over delete;
3. **Recoverable first**: back up (`.bak`) before acting;
4. **Read failures, don't repeat them**: error → read the message → adjust → retry. Never blindly rerun the same command.

### 7.4 Beginner FAQ

**Q: What happens if I ask the AI to run `rm -rf`?**
A: High-risk commands are blocked. But you shouldn't ask for them anyway — there are safer alternatives (back up, then delete).

**Q: A command timed out mid-run?**
A: It may still be running in the background. First check with a read-only command (is the process alive? did the file appear?), then decide whether to wait or retry.

**Q: Why does the AI say "command unavailable"?**
A: Termux isn't installed/authorized, or the Termux switch in Settings is off. Go back to Chapter 1, section 5.

**Q: Can I run commands myself?**
A: Yes — open Termux and type manually. It shares the same environment as the AI.

---

*End of chapter · Next: Remote Integrations — connect servers, email and file transfers*
