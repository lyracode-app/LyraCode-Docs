# Logs and request diagnosis

Open Logs in the sidebar to inspect audit records for model requests, tool calls and errors. Process stdout/stderr and static-server request logs are available through their respective features.

## Find a record

1. Note the failure time, model and operation, then refresh Logs.
2. Filter by type and enter search keywords.
3. Open a record's details. Use Load more for older entries.

Changing filters or queries reloads the list. Refresh when diagnosing a recent failure so an older error is not mistaken for the latest result.

## Read details

### Model requests

Check provider, model, target address, HTTP status and error body. For authentication errors inspect the key; for path errors inspect base URL and request path. For tool failures inspect arguments and output. HTTP success alone does not prove the task completed.

### Tools and execution

Distinguish a proposed call, approval and completed execution. Check command exit code/stderr and file targets/diffs. For background work inspect [output and service status](/en/manual/automation).

## Example: diagnose a failed conversation

Find the relevant time and type, search a model name or error keyword and save a redacted error code. Correct one setting, send a small request and inspect the new record. Changing many settings at once makes causes harder to identify.

## Delete and report

Single-record deletion and clearing logs require confirmation. Save diagnostic evidence first. Deleting logs does not undo operations.

Remove Authorization, cookies, API keys, private messages and real service addresses before sharing. Include reproduction steps, version, time and redacted errors; see [troubleshooting](/en/reference/troubleshooting). See [statistics](/en/manual/statistics) for usage interpretation.
