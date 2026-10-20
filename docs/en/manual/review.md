# Approvals and change review

Completion claims, tool records and actual artifacts should agree. Review targets and arguments before execution, then inspect results.

## Before execution

Check tool, path, command, remote target and task scope. Explain the desired correction when rejecting. Conversation auto-approval changes subsequent ordinary chat approvals; confirm scope before enabling it. [Device full access](/en/manual/device-interaction) and the [MCP server](/en/manual/mcp-server) have separate behavior.

## After execution

### Commands

Check exit code, stdout and stderr. For background commands continue with output files, processes and ports. “Started” does not prove service health.

### Files

Expand file changes, check paths, added/deleted lines and diffs, then read back critical sections. Recent change cards do not replace a full Git diff. Hiding cards does not undo writes.

## Manual-edit conflicts

Files may change after the Agent reads them. On a mismatch or conflict, preserve manual edits, reread current content and make a precise edit. Repeated whole-file overwrites can lose work.

## Acceptance example

For a button fix, inspect related file changes, run existing checks and click the actual page. State unavailable tests and remaining validation. A completed TODO or “fixed” reply alone is not evidence.

See [tool output reference](/en/reference/tools) and [logs](/en/manual/logs).
