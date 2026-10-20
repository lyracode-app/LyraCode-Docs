# Provider integration

Goal: decide whether configuration is sufficient or protocol code must change, while preserving streaming, tool and history semantics.

## Start with configuration

Read `ProviderCatalog.kt`, `ApiProfile` in `data/settings/SettingsModels.kt`, `ApiProfileJson.kt`, `ModelRequestCustomization.kt` and `ui/settings/model/`.

For a provider using an existing protocol, prefer preset, URL, path and capability changes. Change protocol handling when authentication, messages or stream events actually differ.

`ApiProfile.chatEndpoint` joins a trimmed `baseUrl` with normalized `chatPath`. Model listing, Responses and Gemini construct their own paths. Check duplicated `/v1`, full endpoints placed in the base URL and model-prefix handling first.

## Request and parsing locations

| Behavior | Implementation |
| --- | --- |
| Chat Completions | `streamOpenAiModel` in `ai/agent/OpenAiAgent.kt` |
| Responses | `streamResponsesModel`; `ai/ResponsesApiCompatibility.kt` |
| Anthropic | `requestAnthropicModel` in the same Agent file |
| Gemini | `requestGeminiModel`; `ai/GeminiHistory.kt` |
| Customization/retry | `ai/ModelRequestCustomization.kt`, `ai/agent/AiRequestRetry.kt` |
| Completion/cancellation | `ai/ModelResponseLifecycle.kt`, `ConversationRunLifecycle.kt` |

Files physically in `ai/agent/` may still declare package `com.yukisoffd.lyracode.ai`; inspect declarations before choosing imports.

## Integration process

1. Collect sanitized requests, normal stream events, tool events and errors.
2. Try configuration first, then isolate authentication, request, history, parsing or conversion behavior.
3. Preserve text, reasoning content, tool IDs/argument fragments, finish reasons and usage semantics.
4. Handle cancellation, empty events, incomplete arguments and server errors without marking interrupted streams successful.
5. Verify the next history round after tool execution, including duplicate-execution prevention and retained results.

A greeting alone is insufficient. Verify text streaming, a complete tool round trip, cancellation, errors and any affected image/reasoning features.

Relevant tests under `app/src/test/java/.../ai/` include `ChatCompletionsCompatibilityTest`, `ResponsesApiCompatibilityTest`, `GeminiHistoryTest`, `ModelToolPayloadTest`, `ModelResponseLifecycleTest` and `ModelRequestCustomizationTest`. HTTP auditing is in `ai/ModelHttpAudit.kt`; remove credentials and private context from samples.

Update [model setup instructions](/en/manual/models) to distinguish application handling from server capability requirements.

## Adapter input/output contracts

### Configuration and endpoints

`ApiProfile` holds protocol, base URL, paths, credentials and model settings; customization handles headers/JSON. Presets define defaults, while protocol implementations define messages/events. Do not duplicate parsers just for different provider defaults.

### History conversion

| Record | Semantics to retain |
| --- | --- |
| user | Text, attachments, vision routing and order |
| assistant | Text, thinking and associated calls |
| tool | Call ID and actual output, including failure |
| Compressed context | Summary and retained-history boundary |

Keep tool calls/results matched, including multiple calls per assistant. Interrupted rounds must not produce orphan results. Reuse existing history helpers for protocol-specific blocks.

## Streaming lifecycle

### Establish and receive

Build request → validate HTTP status → read events → aggregate text/thinking/arguments → detect termination → close response. Customization must preserve capability and compatibility handling.

### Aggregate tool arguments

Arguments can span events. Merge by call ID/index and parse complete JSON before dispatch. Duplicate events must not repeat side effects. Return `ChatUpdate` to the host instead of modifying UI inside a parser.

### Terminate or fail

Terminal events stop reading even if the peer keeps TCP open. Distinguish EOF, timeout, cancellation and server errors. Reuse `useModelResponse`/`consumeModelStream`; see [request lifecycle](/en/developer/conversation-lifecycle).

## Adaptation example

If text works but the second tool round fails, retain redacted first-round calls, results and the next request. Compare call IDs, argument JSON, roles and termination. Reproduce history conversion with fixed fixtures before changing protocol code. Suppressing tool results only hides the issue.

New protocols/fields must also support usage, audit and [history persistence](/en/developer/persistence). A chat smoke check does not replace a complete tool round trip.
