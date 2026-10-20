# Device interaction and pets

Goal: start device tasks through floating chat, use available capabilities and verify the resulting state.

## Enable interaction

1. Enable Device interaction in Settings and grant accessibility and overlay access as prompted.
2. Connect and authorize the relevant service if Shell access is needed. Image recognition requires a working visual model.
3. Begin with a read-only task such as inspecting the current screen.
4. Have the Agent call `device_get_capabilities` to check actual permissions and connection state first.
5. Inspect the tool result and resulting screen. Issuing a tap or command does not prove the goal succeeded.

Accessibility, Shizuku Shell, Root and vision provide different capabilities. The main feature switch does not grant all of them.

## Full access

Device interaction full access is off by default. Enabling it requires Android lock-screen credentials or biometric authentication; devices without secure lock credentials cannot enable it. It permits interaction with arbitrary apps and sensitive operations with fewer repeated confirmations, so understand its scope first.

Android handles authentication; Lyra Code does not read or save credentials. Authorization is not restored through backups or device migration and does not grant Shell, Root or other system privileges. Disabling it restores normal-mode restrictions.

## Pets

Pets provide a floating entry point and task-state feedback. Long-press to configure size, docking, opacity and sound, or import, switch and export packages.

API 2 ZIP packages contain `manifest.json`, an entry module and optional configuration/assets. Import adds a library entry and selects it without removing other styles. Removing the current style falls back to the default. Personal settings are kept separately from exported source.

A fallback icon after import can indicate script syntax or lifecycle failure; long-press remains available. Start customization with the [complete API 2 example](/en/examples/pet).

For failures, check accessibility connection, overlay access, actual Shell/vision capabilities and request errors. Refresh snapshots after screen changes instead of repeatedly acting on stale coordinates. See [Troubleshooting](/en/reference/troubleshooting).
