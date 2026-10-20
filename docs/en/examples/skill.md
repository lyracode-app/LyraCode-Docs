# Write an importable Skill

Goal: turn a read-first project review into reusable instructions. Download the [complete project-review ZIP](/examples/project-review.zip) and inspect it before import.

```text
SKILL.md
references/
  checklist.md
```

The entry defines metadata and procedure; its checklist uses a relative path:

<<< ../../public/examples/project-review/SKILL.md

<<< ../../public/examples/project-review/references/checklist.md

## Import and verify

1. Import and enable the ZIP in Skills; check its displayed name and description.
2. Select a test workspace and this Skill, then ask: “Review this project and propose a minimal change plan; this turn is read-only.”
3. Check that tool records show reads of `SKILL.md` and `references/checklist.md`.
4. Expect current behavior, evidence, proposed files, acceptance checks and uncertainties, with no workspace writes.

Skill metadata is shown first; content must be read when relevant. Seeing a name does not prove the procedure ran.

## Adapt it

Change applicability and checklist for your task. Document environments, dependencies and verification for any script; import does not automatically install tools or execute code.

This example makes the review stage read-only. If the user already authorized implementation afterward, finish the review and continue within that authorization without duplicate approval. Skill text cannot expand user authorization or system capabilities.
