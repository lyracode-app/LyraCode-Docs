---
title: Files & Directories
---

## Overview

Native file tools operate only inside the **current workspace** (relative paths). The `global_*` tools can access the whole `/storage/emulated/0` shared storage (except `Android/data`, `Android/obb` and `/data`).

## Listing & searching

### list_directory

List directory contents. The most common exploration tool.

### search_files

Search the workspace by **file name/path fragment**.

::: tip
- put only a file name or fragment in `query`, with `path` as `.` or a relative subdirectory;
- it matches names only - **it does not search contents**;
- if it returns `SEARCH_EMPTY` and the target may be outside the workspace, use `global_search_files` once.
:::

### global_search_files

Search `/storage/emulated/0` by file name, returning absolute paths for global_* tools.

### get_file_info

File/directory metadata: size, type, modified time, real path.

## Reading

### read_file

Read a text file (up to 1 MB). Good for small/medium files.

### read_file_lines

Read by line range (up to 16 MB files). **Read a fragment of a large file first, then edit precisely.**

## Writing & editing

| Tool | Scenario | Key points |
| --- | --- | --- |
| write_file | create / full replace | pass either `content` or `content_lines`; `content_lines` must be a real JSON array |
| edit_file | precise edits | unique text match or 1-based line range; `expected_replacements` mismatch rejects the write |
| append_file | append at the end | good for logs and changelogs |
| global_write_file / global_edit_file / global_append_file | outside the workspace | require user approval |

::: warning
Read before you edit. When a match count mismatches, re-read and use a longer unique context - never blind-retry.
:::

## Directories & moving

| Tool | Notes |
| --- | --- |
| create_folder | create a directory |
| rename_move | rename / move (inside the workspace) |
| delete_file_or_folder | delete files or **empty directories** |
| global_create_folder / global_rename_move / global_delete_file_or_folder | global variants, require approval |

## General notes

- never pass Termux-private paths (`/data/data/com.termux`) to native tools - they will be rejected;
- `Download` / `Downloads` both map to `/storage/emulated/0/Download`;
- a `.bak` backup is created in the same directory before overwrites; back up important files explicitly first;
- list targets before batch delete/move and verify paths before confirming.