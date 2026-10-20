---
name: project-review
description: Inspect a workspace project and propose a verified, minimal change plan before editing.
---

# Project review

Use when the user asks to inspect a project or prepare a change plan.

1. Confirm the selected workspace. Read its README and applicable project instructions.
2. List relevant files using workspace tools. Never assume a shell path is the workspace.
3. Read `references/checklist.md` and inspect only files relevant to the request.
4. Report the current behavior, likely cause, proposed files and acceptance checks.
5. During this review, do not write files, install dependencies, run project scripts or contact remote services.
6. If the user has already authorized implementation, finish this read-only review, then continue within that authorization; do not ask for duplicate approval.

Report in the user's language. Distinguish observed evidence from assumptions. Never claim a test passed without running it.
