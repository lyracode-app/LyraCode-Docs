# Testing and debugging

Choose verification by the affected behavior and record which checks ran locally or on Android. Run these commands from the application root.

## JVM tests

::: code-group
```powershell [Windows]
.\gradlew.bat :app:testDebugUnitTest
```
```sh [Linux / macOS]
./gradlew :app:testDebugUnitTest
```
:::

For one class, add `--tests 'com.yukisoffd.lyracode.ai.AgentTextEditsTest'`. Use the actual declared package. Reports normally appear in `app/build/reports/tests/testDebugUnitTest/`.

## Node tests for web assets

These files use Node's built-in runner; no root npm project is needed:

```sh
node --test app/src/test/web-access/stream.test.cjs
node --test app/src/test/charts/circuit.test.cjs
```

They cover the corresponding JavaScript logic, not Android WebView behavior, real networking or UI.

## Device tests

Enable debugging on a supported device/emulator and verify `adb devices`. On Windows:

```powershell
.\gradlew.bat :app:connectedDebugAndroidTest
```

Use `./gradlew` on Linux/macOS. Read relevant prerequisites first: PRoot, vision, live APIs, accessibility and overlays may need extra setup or human grants. App/test variants, signatures and data must match.

| Change | Appropriate checks |
| --- | --- |
| Edits/paths | Parsing and confinement tests; actual writes and diff |
| Protocol | Compatibility, history and stream tests; tool round trip/cancellation |
| PRoot | Preparation/architecture tests; device import, mounts, background lifecycle |
| Web access | Node stream and HTTP tests; synchronized browser/phone actions |
| Pets | Archive tests; device import, lifecycle, switching and fallback |
| Settings/UI | Resource/navigation tests; affected screens and languages on device |

Record command, result, device/Android version, reproduction and limitations. A successful build is not feature verification. Start failures at the first relevant error, distinguish environment problems from regressions, and preserve meaningful assertions.

Limit collected logs to the relevant package/tags and remove credentials, private screen contents and sensitive request bodies before sharing.

## Choose regression scope by interface

| Change | First checks | Device/integration validation |
| --- | --- | --- |
| Conversation stop/continue | `ConversationRunLifecycleTest` | Stop during approval, immediate continue, switching |
| HTTP streams/cancellation | `ModelResponseLifecycleTest` | Network loss, timeout, open connection after terminal event |
| MCP | `McpConfigurationTest`, `McpHttpClientTest`, `McpServerProtocolTest` | Binding, auth, actual clients and tool errors |
| File editing | Edit/path/change-record tests | Editor conflict, save failure, revoked grants |
| Web access | `WebAccessHttpTest` | Stale-action 409, SSE reconnect, uploads |
| Pets | `PetArchiveTest`, example JS syntax | Mount/events/unmount/resource disposal |
| Documentation | `npm run docs:check` | Groups, deep links, languages and mobile |

This is recommended scope, not a claim that Android tests ran for a documentation edit. Compile Kotlin teaching fragments in their host context. Docs checks validate structure, links and JSON/JavaScript syntax rather than Android behavior.
