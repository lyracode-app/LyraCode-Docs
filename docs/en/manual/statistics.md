# Statistics and token usage

Statistics in the sidebar shows local conversation, request and token trends. Provider invoices and [third-party account quota](/en/manual/accounts) have different data sources.

## Select a period

Choose day, week, month, year or all history. Navigate periods or select a date, verify the displayed boundaries and refresh. Switch between compact and exact numbers when needed.

## Interpret metrics

| Metric | Purpose | Caveat |
| --- | --- | --- |
| Conversations | Count tasks | One conversation can make many requests |
| Requests / model requests | Observe call frequency | One user message can trigger multiple tool rounds |
| Input / output / total tokens | Inspect context and generation volume | Provider counts and local estimates can differ |
| User / assistant / tool records | Inspect record composition | Message counts are not HTTP request counts |
| Top models | Compare model usage | Check period and model IDs |

## Trends and model rankings

Expand usage, request composition and model cards. Compare equal-length periods using the same number format. Multiplying total tokens by one price can be misleading because model, cache, reasoning and billing rules differ.

## Example: a sudden increase

Select the affected period and inspect input/output proportions and model rankings. For input growth, check long histories, attachments and repeated reads. For request growth, use [logs](/en/manual/logs) to investigate tool rounds, retries and background tasks. Statistics suggest where to look rather than proving the cause.

## Data boundaries

Results depend on records retained on this device. Imports, deletions, missing history and absent provider usage affect totals. Provider statements determine charges. Check selected data before and after [backup or migration](/en/manual/data).
