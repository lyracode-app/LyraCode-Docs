# Navigation and gestures

Navigate long conversations by user turn without scrolling through every tool record. Navigation changes reading position without sending messages or creating branches.

## Reveal navigation controls

Swipe left in the message area to reveal controls on its right edge. They hide after about 2.6 seconds of inactivity; clicking restarts the timer. Empty conversations have no controls. Use a predominantly horizontal swipe in a clear area to avoid conflicting card gestures.

## Four destinations

| Control | Destination | Following new output |
| --- | --- | --- |
| Double up arrow | Conversation start | Paused |
| Up arrow | User message before the current visible position | Paused |
| Down arrow | User message after the current visible position | Paused |
| Double down arrow | Conversation end | Resumed |

Previous/next controls locate user messages, skipping intervening assistant and tool records. At either boundary they fall back to the start or end.

## Message menus and card gestures

### Long-press a user message

The menu provides actions such as edit and regenerate or create branch. Regeneration affects subsequent history. [Create a branch](/en/manual/conversation-branches) first when you want to preserve another approach.

### Swipe TODO and file-change cards left

Cards can be collapsed or swiped left to hide the current set of progress or changes. Hiding does not undo files or delete history, and new state may reveal the card again. Check actual results through [change review](/en/manual/review).

## Reading history during generation

Scrolling upward pauses automatic following. Use Back to bottom, or scroll to the bottom, to follow live output again. Pausing following does not stop generation; use the conversation's stop action to interrupt execution.
