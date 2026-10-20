# 测试与调试

目标：根据改动选择相关验证，并准确记录哪些结果来自本地测试、哪些来自 Android 设备。命令均在应用根目录执行。

## JVM 单元测试

::: code-group
```powershell [Windows]
.\gradlew.bat :app:testDebugUnitTest
```
```sh [Linux / macOS]
./gradlew :app:testDebugUnitTest
```
:::

聚焦一个用例时可添加 `--tests 'com.yukisoffd.lyracode.ai.AgentTextEditsTest'`。使用文件中的真实包名，不能根据物理子目录推断。报告通常位于 `app/build/reports/tests/testDebugUnitTest/`。

## 网页资源的 Node 测试

这两个测试文件直接使用 Node 内置测试运行器，不需要为应用根目录创建 npm 项目：

```sh
node --test app/src/test/web-access/stream.test.cjs
node --test app/src/test/charts/circuit.test.cjs
```

它们覆盖对应 JavaScript 逻辑，不能替代 Android WebView、真实网络或 UI 测试。

## 设备/模拟器测试

准备支持的 Android 设备，启用调试并确认 `adb devices` 识别。在 Windows 执行：

```powershell
.\gradlew.bat :app:connectedDebugAndroidTest
```

Linux/macOS 使用 `./gradlew`。先阅读相关测试前置条件；PRoot、视觉、真实接口、无障碍和悬浮能力可能需要额外环境或人工授权。测试包签名、构建变体与应用数据也需要匹配。

## 按改动选择范围

| 改动 | 建议验证 |
| --- | --- |
| 文本编辑/路径 | 解析与越界单元测试，真实工作区读写与 Diff |
| 模型协议 | 兼容/历史/流事件测试，实际工具往返与取消 |
| PRoot | 命令准备/架构测试，设备导入、挂载、后台进程与禁用 |
| 网页访问 | Node 流测试、HTTP 测试，手机与浏览器同步操作 |
| 桌宠 | 包校验测试，设备导入、生命周期、切换与错误回退 |
| 设置/UI | 资源/导航测试，受影响屏幕和语言下的设备操作 |

## 报告有效结果

记录命令、结果、设备/Android 版本、复现步骤和剩余限制。构建成功不能替代功能验证。失败时从首个相关错误开始，区分环境缺失与行为回归，不要通过删除断言或跳过验证来消除失败。

需要日志时限定包名或相关标签；公开之前移除密钥、屏幕私人内容与请求正文中的敏感信息。

## 按接口选择回归

| 修改范围 | 首先检查 | 设备/集成验证 |
| --- | --- | --- |
| 会话取消与继续 | `ConversationRunLifecycleTest` | 审批中停止、立即继续、快速切换 |
| HTTP 流与取消 | `ModelResponseLifecycleTest` | 断网、超时、终止后连接保留 |
| MCP | `McpConfigurationTest`、`McpHttpClientTest`、`McpServerProtocolTest` | 手机监听、鉴权、真实客户端与业务错误 |
| 文件编辑 | 文本编辑、路径与文件变更相关测试 | 编辑器冲突、保存失败、撤回授权 |
| 网页访问 | `WebAccessHttpTest` | 旧会话动作 409、SSE 重连、上传 |
| 桌宠 | `PetArchiveTest`、示例脚本语法 | mount、事件、unmount、资源清理 |
| 文档目录 | `npm run docs:check` | 分组折叠、深链接、双语、移动端 |

这里列出建议验证范围，不表示文档更新时已运行 Android 测试。Kotlin 教学片段需放回对应宿主上下文编译；文档脚本只检查双语结构、链接和 JSON/JavaScript 语法等静态条件。
