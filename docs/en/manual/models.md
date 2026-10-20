# Models and providers

To synchronize Mengxi API keys/models, see [third-party accounts](/en/manual/accounts). Manual provider setup can follow the steps below.

Goal: connect a model and verify the capabilities needed by your task. Prepare the provider's API endpoint, key and exact model ID.

## Add a configuration

1. Add a clearly named provider in the model/provider settings.
2. Choose its protocol. The app includes OpenAI-compatible, Anthropic and Gemini paths; compatible APIs may also distinguish Chat Completions from Responses.
3. Follow the configuration screen's base-URL rules. Avoid mixing endpoint formats or duplicating path segments such as `/v1`.
4. Enter the key and load the model list or manually enter a supported ID.
5. Select this profile and model in a conversation. Test text first, then a read-only tool call.

**Success:** text returns and a real tool lists the workspace. Verify a non-sensitive test image separately if you need vision.

## Match capabilities to tasks

| Task | Requirement | Check |
| --- | --- | --- |
| Questions | Text generation | Short response |
| Project changes | Tool calling | List and read files before a small edit |
| Screenshots | Vision input or configured supplementary model | Describe details you can verify |
| Device image recognition | Working visual model and device capabilities | Check capabilities and a fresh screenshot |
| Sub-agent work | Enabled orchestration and valid sub-agent configuration | Start with an independent read-only task |

An app capability switch cannot add server-side support. An existing model ID does not guarantee tools, images, reasoning options or long-context support.

## Advanced settings

Keep defaults until the connection and basic task work. Adjust temperature, output limit, context or reasoning depth one at a time. Custom headers and JSON must match fields accepted by the server. A small output limit can truncate text or tool arguments; a larger context setting does not ensure server acceptance.

Check pure-prompt mode and Agent tool settings when expecting execution. Web search has its own configuration and backend; a working model connection does not establish search availability.

## Diagnose failures

| Symptom | First checks |
| --- | --- |
| 401/403 | Key, account access and provider restrictions |
| 404 or missing model | Endpoint construction, protocol and exact ID |
| 400 or unsupported field | Custom request fields and reasoning/output options |
| 429 | Provider quota and rate limits; avoid rapid repeats |
| Text works but tools fail | Model tool support, pure-prompt mode, tool switches and arguments |

Keep sanitized errors, protocol and model ID for diagnosis. Never share full keys. Implementation details are in [Provider integration](/en/developer/providers).
