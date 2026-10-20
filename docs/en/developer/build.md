# Build from source

Goal: build an installable Debug APK with the repository's Gradle Wrapper. Run commands from the application repository root.

## Configuration

| Setting | Current source |
| --- | --- |
| Android SDK | `app/build.gradle.kts`: compile/target 37, minimum 26 |
| Java/Kotlin target | Java 17 and JVM 17 in the same file |
| Android Gradle Plugin | `gradle/libs.versions.toml`: 9.1.1 |
| Gradle | `gradle/wrapper/gradle-wrapper.properties`: 9.3.1 |
| Application ID | `com.yukisoffd.lyracode` |

Prepare JDK 17, SDK Platform 37 and Android build tools. Android Studio can install required SDK components during sync. The JDK running Gradle and the compilation target are separate settings; use a JDK accepted by the Wrapper/plugin and confirm it with `--version` and sync output.

Set the SDK location in local `local.properties` or your configured SDK environment. Keep machine-specific paths out of commits.

## Debug build

::: code-group
```powershell [Windows]
.\gradlew.bat --version
.\gradlew.bat :app:assembleDebug
```
```sh [Linux / macOS]
./gradlew --version
./gradlew :app:assembleDebug
```
:::

The first build downloads the Wrapper and dependencies. Find the resulting APK under `app/build/outputs/apk/debug/`, then install through Android Studio or `adb install -r <actual-apk-path>`. Debug has the `.debug` package suffix and separate private data.

## Variants and PRoot

Debug, Beta and Release are configured. Beta uses `.beta` and Debug signing. Release needs valid local signing configuration; the repository's empty release signing configuration is not a publish-ready setup.

The main source set includes Kotlin, resources and native libraries from `app/src/debianRuntime/`. `verifyBundledProotRuntime` checks fixed SHA-256 values for packaged ARM64/x86_64 engines and loaders. Investigate missing files or mismatches instead of skipping verification. User-managed rootfs data is not packaged in the APK.

See [jniLibs/README.md](https://github.com/lyracode-app/Lyra-Code/blob/main/app/src/debianRuntime/jniLibs/README.md) for replacing binaries. Changing ordinary application code does not require cross-compiling PRoot.

## Failures

- Missing SDK: install Platform 37 and check its path.
- JDK/Gradle mismatch: inspect the IDE's Gradle JDK and Wrapper version output.
- Native checksum mismatch: verify provenance and restore a matching binary set.
- Release signing: configure locally; do not commit keystores or passwords.

After building, verify the affected behavior using the [testing guide](/en/developer/testing).
