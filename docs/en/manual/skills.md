# Import and use Skills

A Skill is a reusable workflow with `SKILL.md` as its entry and optional references/examples. Tools, dependencies and permissions must still be configured separately.

## Import

Use the Skills page to import Markdown, a ZIP containing `SKILL.md`, or a supported repository/raw-file URL. Inspect metadata, instructions and references before enabling. Start with the [project review example](/en/examples/skill).

## Use in conversation

Describe the objective or select a Skill for the current turn. The Agent reads the entry and references as needed. Inspect tool records to confirm what was actually read.

### Example prompt

> Use the project review Skill to inspect build and test configuration without editing. Report available commands with evidence.

### Verify results

Selection is not completion. Check artifacts, commands and acceptance criteria. Bundled scripts do not run merely because the Skill was imported.

## Manage and update

Disable/delete unused Skills and review updated instructions and triggers. Avoid conflicting workflows. Unrelated requests for credentials or directories are not authorization.

See [instructions and memory](/en/manual/memory) for lasting preferences, and [extensions](/en/developer/extensions) for authoring/loading.
