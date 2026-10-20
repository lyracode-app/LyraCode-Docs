# Workspaces and runtimes

Goal: preserve storage-provider semantics and boundaries when changing paths, edits or PRoot behavior.

## Workspace abstraction

`workspace/WorkspaceManager.kt` distinguishes `content` URIs with persistent directory grants, `file` shared-storage wrappers and PRoot's dedicated scheme with Linux ID. Picker labels, URIs and real paths are not interchangeable.

| Responsibility | Files relative to the Kotlin package directory |
| --- | --- |
| URI/grants/root | `workspace/WorkspaceManager.kt`, `GrantedWorkspaceDirectory.kt` |
| Shared-storage wrapper | `workspace/SharedStorageWorkspace.kt` |
| PRoot guest/host mapping | `workspace/ProotWorkspace.kt`, `ProotPathResolver.kt` |
| IO and index | `workspace/NativeFileManager.kt`, `GlobalFileManager.kt`, `WorkspaceFileIndexer.kt` |
| Agent mutation/diff | `ai/agent/AgentFileToolHandler.kt`, `ai/AgentFileMutation.kt`, `ai/AgentTextEdits.kt` |

Custom `DocumentFile` implementations are under `app/src/main/java/androidx/documentfile/provider/`. Not every document has a bindable filesystem path.

## Paths and mutations

Workspace tools accept relative paths and validate confinement to the root. Global tools have separate shared-storage scope and restricted directories; do not add unrestricted absolute-path access to ordinary tools.

Exact edits validate match counts; line ranges are inclusive and one-based. Preserve before/after/diff recording, conflict checks and sub-agent write coordination because content may change after the initial read.

## PRoot lifecycle

Under `app/src/debianRuntime/java/.../debian/`, `ProotLinuxManager.kt` manages instances/processes, `ProotArchitecture.kt` reads runtime ELF architecture, and `ProotCommandExecutor.kt` / `DebianCommandExecutor.kt` handle calls.

Keep IDs, rootfs and enabled state distinct. Validate archives, paths, shells and architecture in staging before activation. Rootfs is user data and must not be replaced during app updates based on seed versions. Close corresponding terminal and retained processes before disable/delete.

Foreground timeout affects that invocation. Background services retain their PRoot supervisor; later commands must not kill earlier services. Mounts reflect permissions at process startup, so changed permissions require reconnection.

## Verification

Cover SAF, direct shared paths and PRoot-internal directories, plus traversal, symlinks, missing files, revoked grants and concurrent edits. Run `GrantedWorkspacePathTest`, `ProotPathResolverTest`, `ProotCommandPreparationTest` and `ProotArchitectureTest`, then device tests for real mounts and process lifecycle.

User-visible behavior belongs in [Workspaces](/en/manual/workspaces).

## WorkspaceManager API

### Selection and resolution

| Method | Contract |
| --- | --- |
| `persistWorkspace(uri)` | Save selection/grants and return the stored URI string |
| `setActiveWorkspaceUri(uri)` | Switch reference; does not grant a new directory |
| `activeWorkspaceUri()` / `rootUri()` | Return stored/parsed reference |
| `root()` | Nullable DocumentFile root |
| `prootLinuxId()` / `prootGuestPath()` | Instance and guest directory from PRoot URI |
| `displayName()` / `displayPath()` | Display values, not execution paths |
| `termuxRootPath()` / `termuxPath(relativePath)` | Attempt command-path mapping; may be unavailable |
| `searchFiles(query, limit)` / `invalidateFileIndex()` | File-reference lookup and invalidation |

### Read-only example

```kotlin
// Existing host objects; keep Result failure semantics on IO.
val content = withContext(Dispatchers.IO) {
    check(workspaceManager.root() != null) { "Select a workspace first" }
    nativeFileManager.readFile("README.md").getOrThrow()
}
```

Reuse managers instead of assembling private Android paths from display values. Invalidate indexes after changes so search does not retain stale entries.

## Mutations and editor cooperation

Read old content and compute a precise edit before using the `AgentFileToolHandler` ownership path. `NotHandled`, `Applied` and failure control fallback, duplicate writes and aborts respectively; see [hooks](/en/developer/hooks). After a successful write, generate `FileDiff` and notify mutations. An empty diff must not hide failure.

## Runtime separation example

An SAF-only workspace can support DocumentFile IO without having a bindable command path. PRoot projects use Linux ID/guest paths; a private host root is not a Termux path.

For “edit succeeds but build cannot find it”, compare workspace URI, Linux ID, command `pwd` and target file. Establish that all operations refer to the same copy before changing mounts or permissions.
