# Scheduled and background tasks

Goal: distinguish conversation progress, persistent processes and time-triggered tasks, and verify their results.

| Type | Purpose | Verify through |
| --- | --- | --- |
| Conversation TODO | Track steps | Steps and actual deliverables |
| Download task | Track transfer and errors | Download state, file and optional checksum |
| Background command | Run a server or watcher | Output file, process, port and service |
| Scheduled task | Run at a planned time | Next run, status, result and errors |

## Create a schedule

1. Create a task with a clear goal and allowed services or data.
2. Choose a supported one-off, daily, weekly or monthly schedule and verify device time zone.
3. Select a valid model profile and model, save and enable it.
4. Check the next-run time. Start with a small read-only task scheduled soon.
5. Inspect the actual run record, result and error. Disable or delete tasks no longer needed.

A useful initial prompt is “Report the current device time and time zone; do not change files or contact external services.” Success requires a run record and result, not merely an enabled switch.

## Timing and interaction limits

Android WorkManager performs scheduling. Battery policies, network and background restrictions can delay execution; this is not a second-accurate alarm. Recheck times after time-zone changes, and turn relative expressions such as “tomorrow” into explicit scheduling choices.

Operations requiring interactive confirmation are unsuitable for unattended execution. Email sending still requires foreground confirmation. Revalidate tasks after changing model or service credentials.

## Background processes

Use `background=true`, retain the returned output path and independently check logs and health. Before launching again, check whether an earlier process holds the port. Stop the actual process or environment and verify the port afterward.

Disabling/deleting a PRoot instance stops its retained processes. Force-stop and Android process reclamation can also stop services. Ending a conversation is not a universal stop control for background work.
