# Build an API 2 pet

Goal: render a status orb with a complete local module and no external images, network or build step. Download the [importable ZIP](/examples/status-orb.zip) and import it in the device-interaction pet settings.

```text
manifest.json
config.toml
scripts/main.js
```

## Manifest and configuration

<<< ../../public/examples/status-orb/manifest.json

`apiVersion`, `id`, `name`, `version`, `author` and a `.js` entry are required. Include exactly one manifest. Paths are relative to the package root without absolute paths or `..`.

<<< ../../public/examples/status-orb/config.toml

Configuration uses the host's TOML scalar subset. The manifest declares the custom color control. Values resolve from defaults, package configuration and locally saved personal settings.

## Lifecycle module

<<< ../../public/examples/status-orb/scripts/main.js

`mount` creates a node, `onEvent` handles config/state/tap and `unmount` cancels animation and removes the node. The host owns taps, long-press and dragging; DOM clicks are not a way to perform system operations.

## Device acceptance

1. Import the ZIP and confirm a `Ready` orb; long-press should open settings.
2. Change its color and confirm the update and saved personal preference.
3. Run a task and inspect states such as Thinking, Working, Waiting or Done.
4. Tapping should briefly scale the orb. Switch away and back without duplicate nodes.
5. Remove the example if no longer needed. On failure, retain the error and check unique manifest, entry and syntax.

Scripts cannot arbitrarily access the network or execute Shell. Load packaged animation assets with `api.asset()` or sprite helpers and clean up timers/audio on unmount. See the application's [API 2 guide](https://github.com/lyracode-app/Lyra-Code/blob/main/docs/DESKTOP_PET_SCRIPTING_ZH.md) for the full protocol.
