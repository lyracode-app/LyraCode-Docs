# Third-party accounts

The Third-party accounts entry currently integrates the Mengxi API platform. You can also add ordinary [model providers](/en/manual/models) manually without signing into this account.

## Sign in or register

Open the profile entry from the sidebar or the profile page in Settings, then choose Third-party accounts → Mengxi API. Signed-out users can sign in or register; signed-in users open account details.

### Sign in

Enter the platform username and password, followed by a verification code if two-factor authentication is enabled. The app does not save the password. User information, login cookies and service keys are stored on the device.

### Register

Provide a username, password, email and email verification code, plus an optional invitation code. Verification and registration depend on the platform's current responses and rules.

## Synchronize a model service

After login the app attempts to synchronize keys and available models. Account details show the configured key and model counts and offer manual synchronization. Sync may reuse or create an app-managed key; it does not add account balance.

Check the resulting provider configuration, select a model and send a small request. An already configured usable provider may remain selected after account synchronization.

## Quota and requests

Refresh account details for remaining quota, used quota and request count returned by the platform. Sidebar [statistics](/en/manual/statistics) use local records and can have a different scope. An unlimited key remains constrained by the account's actual balance.

## Sign out, backup and data scope

Signing out clears local login state and attempts to end the platform session. Existing model providers and keys remain until removed manually in model settings. Login state is excluded from app backup and system migration; sign in again on another device. Model keys are exported only when secrets are explicitly included.

Account synchronization does not upload local conversations, attachments or other settings. Model requests using this provider go to the platform. The account page links to its website for platform information.

## Troubleshooting

- **Login succeeds but sync is partial:** inspect warnings and retry synchronization; check keys and models separately.
- **Models still work after logout:** remove the retained provider configuration and keys if access should stop.
- **Requests fail despite a balance:** check model ID, key permissions, platform errors and connectivity in [logs](/en/manual/logs).
