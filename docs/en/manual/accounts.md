# Third-party accounts

Third-party accounts currently provides Mengxi API and ChatGPT account entries. You can also add ordinary [model providers](/en/manual/models) manually without signing into a third-party account.

## Mengxi API

### Sign in or register

Open the profile entry from the sidebar or the profile page in Settings, then choose Third-party accounts → Mengxi API. Signed-out users can sign in or register; signed-in users open account details.

#### Sign in

Enter the platform username and password, followed by a verification code if two-factor authentication is enabled. The app does not save the password. User information, login cookies and service keys are stored on the device.

#### Register

Provide a username, password, email and email verification code, plus an optional invitation code. Verification and registration depend on the platform's current responses and rules.

### Synchronize a model service

After login the app attempts to synchronize keys and available models. Account details show the configured key and model counts and offer manual synchronization. Sync may reuse or create an app-managed key; it does not add account balance.

Check the resulting provider configuration, select a model and send a small request. An already configured usable provider may remain selected after account synchronization.

### Quota and requests

Refresh account details for remaining quota, used quota and request count returned by the platform. Sidebar [statistics](/en/manual/statistics) use local records and can have a different scope. An unlimited key remains constrained by the account's actual balance.

### Sign out, backup and data scope

Signing out clears local login state and attempts to end the platform session. Existing model providers and keys remain until removed manually in model settings. Login state is excluded from app backup and system migration; sign in again on another device. Model keys are exported only when secrets are explicitly included.

Account synchronization does not upload local conversations, attachments or other settings. Model requests using this provider go to the platform. The account page links to its website for platform information.

## ChatGPT

### Sign in and add accounts

Open the profile entry from the sidebar or Settings → Profile → Third-party accounts → ChatGPT. Choose **Continue with ChatGPT** on first use, or **Add another account** when an account is already saved. The dedicated sign-in page offers two modes, with authorization completed in the system browser:

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
- **Mengxi models still work after logout:** remove the retained provider configuration and keys if access should stop.
- **Requests fail despite a balance:** check model ID, key permissions, platform errors and connectivity in [logs](/en/manual/logs).
- **ChatGPT allowance is unavailable:** try refreshing on the account page; missing data, expired observations or a recent reset can all cause this state.
- **ChatGPT login succeeds but models are missing:** retry synchronization and inspect subscription authorization and the error returned by OpenAI. Ordinary API keys do not apply to this account entry.
