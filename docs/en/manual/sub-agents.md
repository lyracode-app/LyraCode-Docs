# Sub-agents

Sub-agents handle independent analysis or edits and return results to the main task. They differ from [conversation branches](/en/manual/conversation-branches), which copy history.

## Configure and enable

Enable orchestration and configure usable provider/model candidates in Settings. The switch alone is insufficient without enabled models. Start with a read-only code review.

## Divide work

### Read-only tasks

Split UI logic, data flow or test coverage into concrete questions with reading scope and expected output. Avoid duplicated investigation.

### Tasks that write

Declare non-overlapping write paths. Read-only tasks cannot also declare writes, and writable tasks require a write scope. Coordinate shared files and interfaces through the main task.

## Example

> Have sub-agents independently inspect UI event handling and persistence without edits. Return file-specific causes. The main task should consolidate findings, implement the fix and run relevant checks.

Compare reports with actual code and inspect the final diff. A successful sub-agent report does not prove files are saved or tests pass.

## Limits and diagnosis

Sub-agents cannot recursively delegate. Check orchestration, candidates, tool switches and path scope when unavailable. Reread files after write conflicts. Extra calls affect [usage](/en/manual/statistics); see [tool integration](/en/developer/agent-tools).
