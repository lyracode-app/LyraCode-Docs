# Download and install

Goal: install Lyra Code and preserve the data needed for future upgrades.

## Get an APK

Choose an APK suitable for your device from a project release page and read that release's notes. Documentation does not establish that an unpublished build or feature is available.

- [GitHub Releases](https://github.com/lyracode-app/Lyra-Code/releases)
- [Gitee Releases](https://gitee.com/yukisoffd/lyra-code/releases)

The minimum Android version is 8.0 (API 26). Model APIs generally require network access, credentials and available quota. Linux root filesystems and project dependencies need additional storage. PRoot availability depends on a matching packaged runtime and device architecture.

## Install and verify

1. Open the APK and follow Android's instructions to allow installation from that source.
2. Launch the application and read the first-use information.
3. Add a model configuration in Settings and complete a short conversation.
4. Follow [your first task](/en/manual/quick-start) to verify workspace reads and writes.

Grant permissions as their features require them. Basic chat does not require accessibility, Shizuku or Root. See the [permission table](/en/reference/permissions).

## Upgrades and build variants

Updates with a compatible package name and signature normally preserve application data. If installation fails, check package name, signature and Android version first. Debug uses the `.debug` package suffix and Beta uses `.beta`; their private data is separate from Release.

[Export a backup](/en/manual/data) before upgrading or switching builds. Uninstalling or clearing data deletes private conversations, settings and Linux environments. Application backup does not contain complete rootfs data or replace project backups.

For local builds, read [Build from source](/en/developer/build). Original application code is licensed under AGPLv3; third-party components retain their own licenses. See [LICENSE](https://github.com/lyracode-app/Lyra-Code/blob/main/LICENSE) and [THIRD_PARTY_NOTICES.md](https://github.com/lyracode-app/Lyra-Code/blob/main/THIRD_PARTY_NOTICES.md).
