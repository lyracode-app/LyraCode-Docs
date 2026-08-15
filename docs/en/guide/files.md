---
title: Files & Code Editing
---

# Chapter 12: Files & Code Editing — let the AI edit files safely

> This chapter teaches you **how to let the AI safely modify files**: editing best practices, content search, the rollback safety net, and setting rules for the AI with AGENTS.md.
> Master this chapter and you've unlocked the core power of Lyra Code.
>
> Reading time: about 15 minutes.

---

## 12.1 First, understand: how does the AI "edit a file"?

The AI does **not** rewrite whole files. Like a surgeon, it makes **precise incisions**:

1. **Read first**: the AI reads the file content and sees the current state;
2. **Locate**: it finds the exact spot ("lines 30–40" or "a unique text fragment");
3. **Replace**: only the target section changes; everything else stays untouched;
4. **Back up**: before overwriting, it automatically creates a `.bak` backup in the same directory;
5. **Report**: it shows you the diff (what changed).

So rest easy: **the AI won't "conveniently" modify parts you didn't ask it to** — unless you tell it to rewrite everything.

## 12.2 Four editing rules

1. **Read before writing**: before touching anything, the AI must read the relevant files, README and build scripts — and you should ask it to do so too ("read this file first");
2. **Small and precise**: change 3 lines instead of 30; use exact matches instead of fuzzy rewrites;
3. **Follow conventions**: reuse the project's existing style, helpers and commands; don't invent new dependencies;
4. **Verify at the end**: after editing, run the relevant tests/build and **only report success when it actually passes**.

::: tip You can ask the AI like this
"Read the README and main.py first, then modify it following the project style, run the tests, and report the results."
:::

## 12.3 Which edit tool, when?

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

## 12.4 Content search (searching "what's inside files")

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

## 12.5 Rolling back: your "undo button"

- **Automatic `.bak` backup**: before the AI overwrites a file, a `xxx.bak` appears in the same directory (e.g. `main.kt` → `main.kt.bak`, the pre-edit version);
- **How to restore**: tell the AI "restore main.kt from main.kt.bak";
- **Unsaved editor changes**: the editor prompts you when exiting;
- **Double insurance for important files**: have the AI copy it first: `cp file file.bak`.

## 12.6 Project instruction files (AGENTS.md): set rules for the AI

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

*End of chapter · Next: Running Commands — the Termux / Shizuku / Root channels*
