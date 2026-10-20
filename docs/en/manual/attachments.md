# Attachments and context

Uploads, workspace references and history summaries all affect model context, with different sources and update behavior.

## Add attachments

### Files and images

Attach files/images from the composer. Review the list and explain what to read. Images can use the original or crop workflow. Understanding requires a capable model or configured vision support.

Uploading a file does not grant access to its entire directory. [Select a workspace](/en/manual/workspaces) for project editing. Recheck the list after removing unsent attachments.

### Workspace references

With a workspace selected, use `@` in the composer to search and select files. Check project paths and subsequent read results. Reselect references after changing workspaces.

## Inspect and compress history

Compress manually or configure automatic turn/token thresholds. A summary replaces part of future request context; it does not rewrite project files.

### Before compression

Check that the compression model works. Preserve key paths, unfinished work, restrictions and acceptance criteria. Large attachments/tool output can still consume context, and summaries cannot replace reading current files.

### After compression

Inspect context information, restate essential constraints and ask the Agent to check current files. Supply missing details if needed. Start another conversation when the objective has fundamentally changed.

## Troubleshooting

Check vision configuration for image failures, workspace/relative paths for missing files, and attachments/tool output/summary state for large contexts. See [rendering](/en/manual/customization) and [provider implementation](/en/developer/providers).
