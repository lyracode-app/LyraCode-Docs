# Third-party accounts

Third-party accounts offers three sign-in entries: New API compatible sign-in, ChatGPT and DeepSeek Harness. Ordinary [model providers](/en/manual/models) can still be added manually without signing into a third-party account. All three entries can be used at the same time and are independent.

## Entry and common rules

Open the profile entry in the sidebar, or **Settings → Profile → Third-party accounts**. The list shows New API, ChatGPT and DeepSeek Harness in that order.

- A signed-in entry shows the account name; a signed-out entry shows its sign-in prompt.
- Sign-in state is stored only on the device and is excluded from app backup, Android cloud backup and device migration. Sign in again on another device.
- Signing out does not delete synchronized model services; remove them in model service settings.
- Account pages only handle sign-in, synchronization and quota display. The model used in a conversation is still chosen from the model service list.

## New API compatible sign-in

### How it differs from the former Mengxi API

The previous entry was bound to a single Mengxi platform. It is now a general New API compatible sign-in: enter a site address before signing in, and any site exposing New API compatible endpoints with password sign-in can be used.

- The site address must be a full address starting with `https://` or `http://` and is saved as part of the account.
- A different site is a different account; synchronized model services are kept per site.
- After upgrading, model services named `梦汐 API · …` are renamed to `New API · …` and the configuration itself is preserved.
- If a site requires another sign-in method (single sign-on, QR code), in-app password sign-in does not apply; open the site directly.

### Sign in

1. Open **Third-party accounts → New API compatible sign-in** and choose **Sign in / Register**.
2. Enter the site address, username and password.
3. When the account uses two-factor authentication, enter the authenticator code or a backup code.

With **Remember credentials** enabled, the credentials are encrypted on this device and filled in next time. **Auto sign-in** requires remembered credentials: the session is checked when the app starts and restored with the saved credentials when it has expired. Two-factor verification always requires manual input. If encrypted storage is unavailable, the app says you can still sign in but cannot remember credentials.

### Register

Switch to register mode on the same page and fill in username, password, email and email verification code, plus an optional invitation code. Whether email and similar fields are required depends on the site. After registering, sign in with the new account.

Sending verification codes and registration itself depend on the site's state and rules; the actual response decides.

### Synchronize keys and models

After signing in, the app attempts to synchronize the account's API keys and model list. **Sync keys and models** retries at any time, and **Refresh account details** updates the profile.

- The account page shows key and model counts.
- Synchronization may reuse or create an app-managed key; it does not add account balance.
- On partial success the page offers another synchronization. Check the synchronized keys and models before sending requests.

Then verify the provider configuration, select a working model and send a small request. When a usable provider already exists, synchronization does not necessarily change the current selection.

The primary key is used first; on HTTP 401, 402, 403 or 429 the added secondary keys are tried in order. Secondary keys are a fallback only and do not change permissions or quota on the site.

### Account details and quota

The account page shows user ID, display name, user group, balance, amount spent and request count. Amounts use the site's conversion settings and show a dash when those settings are unavailable.

Sidebar [statistics](/en/manual/statistics) are local records with a different scope. An unlimited key is still constrained by the account's actual balance.

### Sign out and data scope

**Sign out of platform account** disables auto sign-in, clears the local session and attempts to end the session on the site. Remembered credentials are kept for the next manual sign-in, and configured model services and keys remain.

Sign-in state and remembered credentials are excluded from app backup and system migration. Primary and secondary model keys are exported only when secrets are included. Synchronization does not upload local conversations, attachments or other settings; model requests through this site send their content to that site. The page links to the site for its own terms and privacy policy.

## DeepSeek Harness

### Sign in

1. Open **Third-party accounts → DeepSeek Harness** and choose **Sign in with DeepSeek Harness**.
2. Complete authorization on the official DeepSeek platform in the system browser.
3. Return to the app and wait for the local callback to exchange the credential.

The app exchanges an authorization code and a device identifier for a dedicated credential, so no API key or password is entered. The sign-in request times out after five minutes; a missing browser, a callback port already in use or an incomplete authorization payload each produce their own message, and retrying is enough.

### Model service

After a successful sign-in the app creates a dedicated model service for the account and synchronizes its model list. The service uses DeepSeek's Anthropic-compatible endpoints, and its request shape is fixed by the authorization method:

- API key fields, advanced configuration, custom endpoints and request overrides are not shown, and [custom model requests](/en/manual/request-customization) do not apply.
- Models come from the account and can be refreshed on the account page; if the refresh fails, the existing model configuration keeps working.
- An expired session asks you to sign in again, and the model service does not need to be recreated afterwards.

### Balance and low-balance alerts

The account page shows the top-up balance and bonus balance, with a manual refresh. If reading fails while older data exists, the page marks it as the last retrieved value. An unavailable amount means neither a full balance nor a zero balance.

**View usage** and **Top up** both continue on the DeepSeek platform.

**Low-balance alert** sets a threshold per currency and enables a notification: the top-up balance dropping below the threshold notifies once, and it must recover above the threshold before another drop notifies again. Enabling it requires the Android notification permission; the page offers a shortcut to notification settings when it has not been granted. With alerts enabled the app periodically queries the top-up wallet.

### Sign out and service rules

Signing out clears the local credential and attempts to end the session on the DeepSeek platform. If the platform request fails, the app reports that you are signed out locally; disconnect the authorization on the DeepSeek platform to complete it.

The credential is encrypted on the device and excluded from app backups, model profiles, request previews and HTTP audit exports. When using this service, the selected context, tool results and any attachments in the request are sent to DeepSeek; account queries and model requests connect directly to DeepSeek under its terms and privacy policy.

DeepSeek provides this service and may change, restrict or stop it at any time. Do not share or resell credentials, and do not use this sign-in for prohibited purposes.

## ChatGPT

### Sign in and add accounts

Open the ChatGPT account page from the same entry. Choose **Continue with ChatGPT** on first use, or **Add another account** when an account is already saved. The dedicated sign-in page offers two modes, with authorization completed in the system browser:

- **Official ChatGPT sign-in (SIWC):** OpenAI subscription authorization for open-source apps.
- **Codex compatibility sign-in:** A separate Codex authorization flow using private endpoints. It requires its own login and may be changed or restricted by OpenAI.

Successful sign-in returns to the account dashboard and attempts to synchronize and activate the account's model service. If synchronization fails, the account stays signed in and synchronization can be retried. Accounts and workspaces are saved separately. Reauthorization opens the sign-in flow for the selected saved account.

### Dashboard and model service

A 2×2 card layout shows email, subscription plan, five-hour allowance and weekly allowance. Circular indicators show the remaining percentage in the center and the reset time underneath. A five-hour window that does not apply displays **No time limit**. The circled exclamation button at the top right opens service, privacy and usage information.

This integration uses no user API key. Available models come from the authorized account and requests use Responses. API-key fields, advanced configuration, custom endpoints and request overrides are unavailable for this service; media generation uses other providers. ChatGPT services display the OpenAI logo in both the service list and conversation provider picker.

### Allowance beside the composer

The composer shows **Using ChatGPT plan · 5-hour remaining: …**, switching to weekly allowance when the five-hour window does not apply. This line has no **Manage usage** button. Detailed usage and its management link remain available on the account page.

Allowance below 10% does not trigger a warning dialog. Values come from data actually returned by OpenAI. Codex usage is refreshed about once a minute while the app is visible, on the account page, and before requests when the cache needs refreshing. Official SIWC may not provide complete usage data. Missing, stale or reset data displays **Unavailable** and does not imply a full allowance or guarantee request admission.

If an applicable window is exhausted or the service rejects further usage, the task pauses with a usage-limit notice. Conversation history, generated content and completed tool operation records are retained. After allowance becomes available, or after selecting another model service, use **Continue** in the same conversation. Pausing does not undo completed external actions.

### Credentials, sign-out and service rules

Authorization takes place in the system browser. Lyra Code does not receive your ChatGPT password or existing ChatGPT chats. OAuth credentials are encrypted on the device and excluded from app backups, model profiles, request previews and HTTP audit exports. Account queries and model requests connect directly to OpenAI; model requests include the selected context, tool results and any attachments included in that request.

Signing out stops tasks using the account, clears local credentials and attempts remote session revocation. Conversations and provider configuration remain; the account needs authorization before reuse. If remote revocation cannot be confirmed, disconnect the app in ChatGPT settings.

OpenAI provides this service and may change, restrict or stop it at any time. Use the authorized subscription only within Lyra Code and follow ChatGPT terms and policies. Reselling or sharing credentials, abuse and prohibited activity may result in an official warning, restrictions or suspension of your ChatGPT account.

## Troubleshooting

- **Login succeeds but sync is partial:** inspect warnings and retry synchronization; check keys and models separately.
- **Models still work after logout:** remove the retained provider configuration and keys if access should stop.
- **Requests fail despite a balance:** check model ID, key permissions, platform errors and connectivity in [logs](/en/manual/logs).
- **New API reports an invalid site address:** enter a full `https://` or `http://` address rather than a bare host or path fragment.
- **A New API site cannot be used in the app:** the site may require another sign-in method or may not expose password sign-in.
- **DeepSeek Harness waits for the browser:** confirm the system browser opened and authorization completed; retry after the timeout, or close the app holding the callback port.
- **DeepSeek Harness says you are signed out locally:** platform-side revocation did not complete; disconnect the authorization on the DeepSeek platform.
- **ChatGPT allowance is unavailable:** try refreshing on the account page; missing data, expired observations or a recent reset can all cause this state.
- **ChatGPT login succeeds but models are missing:** retry synchronization and inspect subscription authorization and the error returned by OpenAI. Ordinary API keys do not apply to this account entry.
