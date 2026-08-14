---
title: Files & Commands
---

## 6. File Operations & Code Editing Best Practices

### 6.1 Editing principles

1. **Read before writing**: read the relevant files, nearby code, README and build scripts first;
2. **Small and precise**: use edit_file with a unique match or an exact line range instead of blind full-file rewrites;
3. **Follow conventions**: reuse the repository's style, helpers and build commands; never invent dependencies;
4. **Verify at the end**: run the most relevant tests/build/lint, then report the result.

### 6.2 Choosing the right edit tool

| Scenario | Tool | Key points |
| --- | --- | --- |
| Create a new file | write_file | pass either content or content_lines (a real JSON array) |
| Precise replacement | edit_file | old_content must be unique; expected_replacements mismatch rejects the write |
| Line-range replacement | edit_file(start_line/end_line) | 1-based inclusive range, good for large edits |
| Append | append_file | append at the end of the file |
| Move/rename | rename_move | inside the workspace |
| Delete | delete_file_or_folder | deletes files or empty directories |
| Large files | read_file_lines | read fragments first, then locate and edit |

### 6.3 Content search tips

```bash
# Preferred: ripgrep (fast, clean output)
rg -n "TODO|FIXME" --glob '*.kt'

# Fallback: grep
grep -rn "TODO" --include='*.kt' .

# Show only matched lines or counts; truncate with head when output is long
rg -c "pattern" . | head -50
```

### 6.4 Rolling back changes

- Before overwriting, Lyra Code automatically creates a `.bak` backup in the same directory (e.g. `main.kt.bak`);
- unsaved edits are prompted on exit;
- for important files, ask AI to back up first: `cp file file.bak` or just say "back it up before editing".

### 6.5 Project instruction files (AGENTS.md)

Put an `AGENTS.md` (or `AGENT.md`) at the project root, and AI reads and follows it before starting work:

```markdown
# Project conventions
- Build: ./gradlew assembleDebug
- Tests: ./gradlew test
- Style: Kotlin, 2-space indent, no magic numbers
- Reject any operation involving secrets
```

Instruction files apply per directory subtree: deeper rules override shallower ones, but they can never override your direct requests or the base security rules.

## 7. Command Execution: Termux / Shizuku / Root

### 7.1 The three privilege tiers

| Tool | Identity | Use cases | Prerequisite |
| --- | --- | --- | --- |
| run_command | Termux app user | build, Git, scripts, package management, content search | Termux authorized |
| execute_shell_command | Shizuku shell (ADB level) | pm / cmd / dumpsys / protected paths | Shizuku installed & authorized |
| execute_root_command | root (su) | system files, /data, system packages | rooted with su configured |

::: warning
**Do not escalate just to make a command pass.** If Termux can do it, don't reach for Shizuku/Root.
:::

### 7.2 run_command essentials

- the default working directory is the selected workspace; use `workDir` or absolute paths to operate elsewhere;
- use the `command_lines` array for multiline or indentation-sensitive commands;
- chain dependent steps with `&&` so later steps stop on failure; keep unrelated commands separate;
- do not run interactive programs; use `background=true` for long-running services (returns launcher_pid and an output file);
- **background launch does not mean healthy** - check the process/log with a separate foreground call;
- timeouts are 5-600 seconds; when output is too long, redirect to a file and read it: `cmd > out.txt 2>&1`;
- high-risk operations (`rm -rf /`, writing `/dev/block`, `mkfs`, ...) are blocked, but human review is still required.

### 7.3 Safe command examples

```bash
# Safe deletion workflow: list first, then delete
find . -name '*.tmp' -type f

# Check disk usage
du -sh * | sort -h | tail -20

# Clone a repository (needs network and git)
git clone --depth 1 https://github.com/lyracode-app/Lyra-Code.git

# Save long output to disk and read it
rg -n 'error' --glob '*.log' . > /storage/emulated/0/Lyra/rg.out; wc -l /storage/emulated/0/Lyra/rg.out
```

### 7.4 Destructive operation discipline

- before executing: resolve and verify the **exact target path**, minimize scope;
- prefer recoverable operations (rename over delete, `.bak` backups);
- confirm the target with `ls -la` before deleting;
- on failure, read the error, adjust and retry - never blindly rerun the same command.

---