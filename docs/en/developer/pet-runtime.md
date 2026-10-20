# Pet modules and lifecycle hooks

An API 2 pet is an imported ES module hosted in the app's WebView. Design its manifest, resources, events and cleanup together.

## Package structure

```text
manifest.json
config.toml
scripts/main.js
images/...
```

The manifest specifies `apiVersion: 2`, unique ID, name, version, author and `entry`; add configuration/controls as needed. `PetArchive.kt` validates/extracts, `DevicePetStore.kt` stores imports, and `PetWebRuntime.kt` with `assets/desktop-pet/runtime.js` hosts execution.

## Lifecycle order

1. Host prepares manifest, package file list, root and API.
2. Import the entry and validate its three default-export functions.
3. Await `mount(api)`, then mark mounted.
4. Dispatch queued events and continue receiving host configuration/state; rendering must accept updates.
5. `pagehide` or host disposal calls `unmount(api)` and releases registered host resources/listeners.

The pre-mount queue is bounded, so do not depend on retaining every early event. Initial `mount` configuration may not be final; handle `config`. Cleanup should tolerate repetition, partial initialization and unfinished asynchronous work.

## Hooks and minimal example

```js
let node;
let unsubscribe;

export default {
  mount(api) {
    node = document.createElement('div');
    node.textContent = 'Ready';
    api.root.append(node);
    unsubscribe = api.on(({ type }) => {
      if (type === 'tap') node?.animate(
        [{ opacity: 0.5 }, { opacity: 1 }], { duration: 150 }
      );
    });
  },
  onEvent(type, data, api) {
    if (type === 'state' && node) node.textContent = data.state;
    if (type === 'config' && node) {
      node.style.color = api.config.color || '#ffffff';
    }
  },
  unmount() {
    unsubscribe?.();
    unsubscribe = undefined;
    node?.getAnimations().forEach(animation => animation.cancel());
    node?.remove();
    node = undefined;
  }
};
```

The default export must provide `mount`, `onEvent` and `unmount`. `onEvent(type, data, api)` differs from `api.on(callback)`, whose callback receives an event object and whose return value unsubscribes. Avoid duplicate handling that starts animations twice.

## Host API

| API | Purpose/constraint |
| --- | --- |
| `root`, `manifest` | Mount container and manifest |
| `config`, `state` | Frozen current snapshots, not mutable settings |
| `asset(path)` | Validate package path and return resource URL |
| `files(directory)` | List bundled resources, including animation frames |
| `json(path)` | Read package JSON |
| `createSprite(parent)` | Images/frame playback with stop/destroy |
| `audio(path, options)` | Package audio governed by host sound/volume |
| `on(callback)` | Subscribe and obtain unsubscribe function |
| `emit(type, data)` | Send supported events for host validation |

Use package APIs for resources; online modules/npm imports are unavailable. TOML supports the host's scalar subset. Declare user-adjustable fields through `controls`.

## Errors and cleanup

Import validation does not prove mounting works. Runtime errors are reported with fallback feedback. Avoid blocking WebView. Stop script-owned timers, animation frames, observers and global listeners during unmount; automatic host cleanup does not manage every custom resource.

The host owns window dragging, click recognition, capabilities and approvals. Scripts render and respond to supported events without gaining Shell or arbitrary network access.

## Example and validation

The importable [status orb](/en/examples/pet) includes a complete manifest, configuration and script with no external resources. Check mounting, initial config, state, taps, config changes, repeated cleanup and resource disposal, then verify actual WebView/floating-window behavior on-device. `PetArchiveTest` covers archive validation; see application `docs/DESKTOP_PET_SCRIPTING_ZH.md` for native event details.
