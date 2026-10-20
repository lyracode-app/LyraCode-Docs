# Conversation branches

A branch starts another approach from a historical message. The app creates a conversation containing history through that message and keeps the original conversation.

## Create a branch from a message

1. Wait for the current run to stop and locate a user message or assistant reply.
2. Long-press a user message or open the assistant reply's action menu, then choose Create branch.
3. Check the new title, final historical message, model and workspace after the app switches conversations.
4. Send the alternative request, such as “Keep the requirements above, but propose a different layout first.”

The selected message is included; later messages are excluded. Tool messages within that range are copied, but cannot themselves be selected as branch points.

## What is inherited

| Content | Behavior |
| --- | --- |
| Messages through the branch point | Copied into the new conversation |
| Provider, model, mode, project and workspace | Inherited |
| Compressed history summary | Cleared; compression thresholds remain |
| TODOs and conversation auto-approval | Current controller state is copied, rather than reconstructed at the branch point |
| Pin, archive and running state | Unpinned, unarchived and idle |

## Files and external effects remain

Branches use the same workspace directory. Existing file edits, sent email and remote operations are not undone. Two branches can still conflict when writing the same file. Save separate code states with Git branches, separate directories or another version-control workflow.

If the original task changed `index.html` to design A, branching from an earlier message leaves design A on disk. Read the current file before requesting design B.

## If creation fails

Check that the conversation has persisted history, no active run and a selected user or assistant message belonging to it. To move through existing history, use [conversation navigation](/en/manual/conversation-navigation). See [persistence](/en/developer/persistence) for implementation details.
