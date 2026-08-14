# 构建

本文档指导你如何从源码构建 Lyra Code。

## 项目结构

```text
app/                         Android 应用模块
app/src/main/java/...        Kotlin / Jetpack Compose 源码
app/src/main/assets/textmate/ TextMate 语法、语言配置和配色主题
third_party/jlatexmath/      JLaTeXMath Android fork，用于 LaTeX 公式渲染
example-img/                 README 示例截图
gradle/                      Gradle Wrapper 配置
```

## 构建要求

- Android Studio 或命令行 Android SDK
- JDK 17
- Android SDK 36
- Gradle Wrapper

## 构建 Debug 包

在项目根目录执行：

```powershell
.\gradlew.bat assembleDebug
```

生成文件通常位于：

```text
app/build/outputs/apk/debug/
```

## 构建 Release 包

Release 包建议在 Android Studio 中**手动配置签名**后构建。

::: danger 请勿提交
请勿提交签名密钥、keystore、API Key、`.env`、`local.properties` 或任何本地隐私文件。
:::

## Termux 配置

使用 `run_command` 前，需要在 Termux 中允许外部应用调用：

```bash
mkdir -p ~/.termux && (grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || echo 'allow-external-apps=true' >> ~/.termux/termux.properties) && termux-reload-settings
```

然后在 Lyra Code 的设置页面中授予 **Termux 通信权限**。未授权时，`run_command` 会自动禁用。

## 许可证

本项目采用**双重许可**：

- Lyra Code 原创源代码可在 **AGPLv3** 下使用。
- 如果需要闭源分发、私有修改、商业例外或不希望遵守 AGPL copyleft 义务，需要获取**商业许可证**。
- 第三方组件仍以其各自许可证为准。

## PR 说明

本项目**不接受外部 PR**。若你有反馈或建议，请提交 Issue。若需要长期修改，请 Fork 本仓库自行维护，或联系仓库持有人。