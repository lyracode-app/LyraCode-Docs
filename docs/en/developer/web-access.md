# Web bridge and state sync

Web access shares the phone's `ChatController`, conversations and settings. The browser submits actions and subscribes to state, without creating another Agent/database. These are internal contracts; change browser assets and server together.

## Modules and lifecycle

| Entry | Responsibility |
| --- | --- |
| `webaccess/WebAccessManager.kt` | Listener, authentication, routing and SSE |
| `WebAccessHttp.kt` | Bounded parsing, responses, headers and Bearer checks |
| `WebAccessBridge.kt` | State projection, actions, session checks and uploads |
| `WebAccessMedia.kt` | Temporary referenced-media access |
| `WebAccessForegroundService.kt` | Android service integration |
| `assets/web-access/` | Browser UI and state consumption |

`start` establishes listener/resources; `stop` closes them and connections. Disconnecting SSE clients cancel their producer, close the Channel and release the Socket. Subscriptions must not survive into another service run.

## HTTP API

| Route | Purpose | Access |
| --- | --- | --- |
| `GET /api/locale` | Connection-page language | Public interface data |
| `GET /api/state` | Full snapshot | Bearer header with current access code |
| `GET /api/events` | SSE updates/heartbeats | Same |
| `POST /api/action` | Controller actions | Same; some require session identity |
| `POST /api/upload` | Pending attachment upload | Authentication/upload validation |
| `GET/HEAD /api/media?id=...` | One referenced file | Unguessable temporary ID, about 5 minutes |

A media ID grants single-file read access; do not publish it in logs. JSON actions are limited by `MAX_JSON` and return 413 when oversized. Parsing rejects ambiguous duplicate headers and chunked requests.

## Snapshots and deltas

`snapshot()` projects conversations, projects, models, tools, approvals and settings. `configurationSignature()` controls full refreshes; `liveSnapshot(previous)` handles message updates. Compose state is sampled on Main; socket writing runs in the service thread.

SSE sends JSON through `event: state` and idle heartbeats. A rendezvous Channel retains backpressure so dependent deltas are not discarded. Update browser merging whenever delta semantics change.

## Actions and session consistency

`action(args)` dispatches on Main. Actions including `send`, `stop`, `continue`, `workspace`, `model`, `branch` and `editMessage` call `requireSession`, checking `sessionRevision`, `conversationId`, `projectId` and the supplied `instanceId`.

### Send example

```js
// The connected page supplies baseUrl, accessCode and the current state.
const response = await fetch(`${baseUrl}/api/action`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessCode}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'send', text: 'Read README and summarize the build steps.',
    instanceId: state.instanceId,
    sessionRevision: state.sessionRevision,
    conversationId: state.conversationId,
    projectId: state.projectId
  })
});
if (response.status === 409) {
  // Refresh state and ask the user to check the destination before resending.
}
```

Use current snapshot fields rather than fixed cached IDs. Stale browser actions after phone navigation must return 409; do not automatically replay sends into another conversation. Add new session-sensitive actions to the validation set.

## Workspaces and uploads

`authorizedWorkspace` validates browser-submitted URIs. Browsers cannot grant arbitrary Android directory access. Uploads become pending controller attachments; inspect the response/list before sending. Media access, uploads and project permissions are separate.

## Validation

Use `WebAccessHttpTest` for parser boundaries, then test wrong codes, stale actions, SSE reconnect, uploads, media expiry and service shutdown with a device/browser. See [web access](/en/manual/local-services) and [lifecycle](/en/developer/conversation-lifecycle).
