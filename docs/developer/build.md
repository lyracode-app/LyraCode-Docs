# 从源码构建

目标：使用仓库自带 Wrapper 构建可安装的 Debug APK。以下命令在应用源码仓库根目录执行。

## 环境与真实配置

| 配置 | 当前源码位置与值 |
| --- | --- |
| Android | `app/build.gradle.kts`：compile/target SDK 37，min SDK 26 |
| Java/Kotlin 目标 | 同一文件：Java 17、JVM 17 |
| Android Gradle Plugin | `gradle/libs.versions.toml`：9.1.1 |
| Gradle | `gradle/wrapper/gradle-wrapper.properties`：9.3.1 |
| 应用包名 | `com.yukisoffd.lyracode` |

准备 JDK 17、Android SDK Platform 37 和构建工具。建议让 Android Studio 按项目同步所需 SDK；实际运行 Gradle 的 JDK 与编译目标是两项配置，应与 Wrapper/插件要求匹配。以 `--version` 和同步输出核对，避免只看系统 `java`。

通过本地 `local.properties` 指定 SDK 路径，或使用已配置的 SDK 环境。该文件不应提交，也不要复制他人的机器路径。

## 构建 Debug

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

首次构建需要下载 Wrapper 和依赖。成功后在 `app/build/outputs/apk/debug/` 查找 APK；使用 Android Studio 或 `adb install -r <实际APK路径>` 安装。Debug 包名后缀是 `.debug`，不会共享正式版私有数据。

## 构建变体与 PRoot

当前包含 Debug、Beta 和 Release，Beta 使用 `.beta` 包名及 Debug 签名；Release 需要在本地完成有效签名配置后构建，仓库中的空签名配置不能当作已具备发布条件。

`app/src/debianRuntime/` 通过 main source set 加入 Kotlin、资源与原生库。`verifyBundledProotRuntime` 校验仓库内 ARM64/x86_64 的 PRoot 可执行文件和 loader 固定 SHA-256；缺失或不匹配时应核对来源，不能通过跳过校验“修复”。rootfs 由用户下载或导入，不打包进 APK。

原生库替换说明见 [jniLibs/README.md](https://github.com/lyracode-app/Lyra-Code/blob/main/app/src/debianRuntime/jniLibs/README.md)。不修改引擎时无需自行交叉编译 PRoot。

## 构建失败时

- **SDK 缺失：** 安装 Platform 37，核对 SDK 路径。
- **JDK/Gradle 兼容错误：** 核对 IDE 的 Gradle JDK 和 `--version`，保留首个错误。
- **原生库校验失败：** 检查文件是否完整及哈希，按原生库说明恢复匹配版本。
- **Release 签名失败：** 在本地配置签名，不提交 keystore、密码或机器配置。

构建通过后仍需按[测试指南](/developer/testing)验证受影响的行为。
