# Customize model requests

Goal: add or override request headers and body fields for one model, to satisfy gateway checks, proxy requirements or non-standard providers. Basic setup is covered in [Models and providers](/en/manual/models).

## Where to find it

1. Open **Settings → Models and providers** and select the configuration to adjust.
2. Enter that configuration's edit page and choose **Customize** at the top right.
3. Pick an enabled model from the menu at the top of the model request customization page.

When the configuration has no enabled model, the page asks you to enable one first. Services that use account credentials (ChatGPT and DeepSeek Harness) do not show this entry: their request shape is fixed by the authorization method and cannot be overridden.

Settings are stored per configuration and model. Switching models in the same configuration edits a separate override set.

## What the preview shows

The page shows the native field structure of the most recent request, or the protocol defaults before any request has been sent.

- Messages, prompts and tool content appear as empty placeholders; real conversation content is not displayed.
- Unmodified fields are still generated dynamically when sending, including history, tool definitions and context.
- Overrides affect only the listed fields and never freeze the whole request.

The three protocols differ, for example OpenAI-compatible services use `Authorization: Bearer {{apiKey}}`, Anthropic uses `x-api-key` with `anthropic-version`, and Gemini uses `x-goog-api-key`. Treat what the page shows as authoritative.

## Add or override headers

1. Choose **Add header** and enter a name and value.
2. Saving applies it to that model's next request.

Rules:

- Names must be non-empty and unique within the model. Names differing only in case count as duplicates and the save fails.
- A header whose name matches an existing one (ignoring case) overrides its value; the header is not sent twice.
- Renaming an existing header removes the old name and adds the new one in the same save.
- Deleting a built-in header asks for confirmation and takes effect after saving.

Values may contain `{{apiKey}}`, which resolves to the provider's current API key. Prefer it whenever a key must go into a custom header instead of writing plaintext into the configuration.

## Add or override body fields

1. Choose **Add body field** and enter a key and a JSON value.
2. Values are parsed as JSON: quote strings, and write numbers, booleans and objects with JSON syntax.

Rules:

- Keys must be non-empty and unique; empty values are rejected.
- A key matching an existing top-level field overrides that field's value.
- Deleting a built-in body field also asks for confirmation and takes effect after saving.
- Trailing content after the value is rejected, and a failed parse refuses the save with a request to check names and JSON.

Write nested objects whole, for example adding `{"provider":{"order":["deepseek"]}}` for a gateway.

## Replay historical reasoning

**Replay historical reasoning** is enabled by default. When disabled, `reasoning_content`, `thinking`, `reasoning_details` and similar fields in historical messages, plus `reasoning` items in Responses input, are no longer sent back.

Disabling it reduces request size but can remove the previous reasoning step from models that need continuity. If a server rejects these fields or the request body is too large, change only this switch and compare results.

## Save, switch and restore

- Switching models warns you to save first; unsaved edits do not apply.
- **Save model configuration** commits only the current model.
- **Restore model defaults** clears every override for that model and returns reasoning replay to its default.

**Success:** after saving, requests carry the added fields, the server stops returning the corresponding field error, and other models are unchanged.

## Data and backups

Overrides are part of the model configuration. A header containing a plaintext key travels with the model configuration into app backups even when secrets are not included. Use `{{apiKey}}` for anything long-lived.

For request diagnosis start with [Logs and request diagnosis](/en/manual/logs): HTTP audit exports exclude account-credential services, and ordinary provider headers are redacted according to the audit rules.

## Troubleshooting

- **Save asks you to check fields:** a name is empty or duplicated, or a JSON value is invalid. Fix each item and retry.
- **Changes do not appear in requests:** confirm the save happened, the same model is selected, and the field is not regenerated when sending.
- **The server reports an unknown field (400):** remove the field and retry rather than probing with near-miss names.
- **401 or 403:** check whether a custom header replaced the original authentication header, or whether the `{{apiKey}}` key is valid.
- **No Customize entry:** the configuration uses account credentials, or no model is enabled yet.
