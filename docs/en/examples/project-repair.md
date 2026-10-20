# Repair a project

Goal: produce a reviewable fix supported by evidence. Prepare the workspace, dependencies and a command environment. Read the actual project README and instructions before executing commands.

## Reproduce

Describe actual and expected behavior with steps:

> The counter displays 0 after Reset, but the next increment continues from its old value. Reset should update internal state. Inspect the current workspace, identify the cause, make a minimal fix following project rules, run relevant existing tests and report the diff and results. Keep the framework and unrelated pages unchanged.

Preserve a starting point with existing version control or a separate copy. Do not include production credentials in reproduction data.

## Locate evidence

Read the README, project rules, entry points and test configuration, then inspect event handlers and state updates. Run commands from the actual project directory and use configured scripts rather than guessing from the framework.

If existing tests pass despite the bug, add a regression check for its trigger. If reproduction is unavailable, record missing setup or steps before rewriting modules.

## Fix and verify

Change the faulty state-update path and avoid introducing duplicate state. Run relevant tests again and repeat the original interaction. Distinguish fix-related regressions from pre-existing environment failures.

For this counter, increment three times → reset → increment once must produce 1. Report commands actually executed and their exit results; identify UI checks still needing manual execution.

## Review delivery

| Check | Expected evidence |
| --- | --- |
| Scope | Only files related to the cause and regression validation |
| Diff | No unrelated formatting, dependency upgrades or credentials |
| Tests | Real results and explicit unexecuted checks |
| Processes | Temporary services stopped or their purpose/port documented |

Record unrelated findings separately so the fix remains understandable. See [Conversation review](/en/manual/conversations).
