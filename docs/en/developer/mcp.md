# MCP protocol, client and server

The client imports external tools; the local server exposes Agent tools. They share protocol helpers but have distinct ownership, permissions and lifecycles.

## Source structure

Paths are relative to `app/src/main/java/com/yukisoffd/lyracode/mcp/`.

| File | Responsibility |
| --- | --- |
| `McpJsonConfig.kt` | Preserve raw JSON and project form fields |
| `McpClientManager.kt` | Refresh tools, save configuration, call and invalidate |
| `McpHttpClient.kt` | Connection cache, HTTP/SSE, negotiation, JSON-RPC |
| `McpProtocol.kt` | Versions, metadata, header encoding and errors |
| `LocalMcpServerManager.kt` | Listener, authentication, tool adapter and lifecycle |
| `McpServerProtocol.kt` | Validate and route requests, wrap results |

## Client API and lifecycle

`testAndRefreshTools(server): Result<List<McpToolDefinition>>` discovers tools and updates configuration. `callTool(server, tool, arguments)` returns `McpCallResult` with server/tool names and content. Handle connection errors and inspect business results.

```kotlin
// Existing host manager/server objects; discover before choosing a tool.
val tools = manager.testAndRefreshTools(server).getOrThrow()
val tool = tools.firstOrNull { it.name == requestedName }
    ?: error("Tool is not advertised by this server")
val result = manager.callTool(server, tool, JSONObject())
```

Empty arguments only suit parameterless tools. Otherwise follow input schema. Call `invalidate(serverId)` after configuration changes, disable or deletion so cached connections and old SSE responses close. Updating a form alone must not retain old headers/session state.

Configuration accepts HTTP(S), one server and string header values. Simultaneous `url`/`baseUrl` must agree. Preserve custom fields by using the same raw-JSON projection for forms.

## Server API and resources

| Method | Contract |
| --- | --- |
| `attachAgent(agent)` | Bind definitions and execution |
| `start(config)` | Stop previous listener, normalize/start and return status |
| `syncWithSettings()` | Start/stop from persisted enabled state |
| `status()` / `statusJson()` | Running state, addresses, port, time and message |
| `stop(saveDisabled)` | Close listener and optionally persist disabled state |
| `close()` | Stop listener and cancel manager scope |

An IO SupervisorJob accepts connections with per-client processing and request-scoped socket closing. `/mcp` currently supports POST, not arbitrary GET subscriptions.

## HTTP and JSON-RPC contract

| Request | Result |
| --- | --- |
| `GET /` or `/status` | Authenticated status JSON |
| `POST /mcp` | JSON-RPC response |
| Other methods on `/mcp` | 405 |
| Valid notification without ID | 202 with no body |
| Invalid JSON/request | 400 plus protocol error |

Legacy negotiation uses `initialize`, with implemented versions `2025-11-25`, `2025-06-18`, `2025-03-26` and `2024-11-05`. Current source also implements a `2026-07-28` branch using `server/discover` and request metadata. This describes repository behavior, not universal client support.

Modern requests validate `Mcp-Protocol-Version`, `Mcp-Method` and `_meta` version/client information/capabilities. `tools/call` also checks `Mcp-Name` against the argument name. Mismatched metadata returns `-32020`; unsupported versions return `-32022`.

### Minimal legacy request

POST to the configured `/mcp` with real authentication:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-11-25",
    "capabilities": {},
    "clientInfo": { "name": "docs-client", "version": "1" }
  }
}
```

Use the negotiated version for `tools/list`, then follow returned schemas for `tools/call`. Protocol state is processed per request; do not assume a separate persisted client session.

## Tool mapping and execution

`localMcpToolDefinitions` maps Agent functions to `name`, `description` and `inputSchema`. `executeLocalMcpTool` uses a dedicated conversation ID and `executeTool(..., skipApproval=true)`, bypassing ordinary chat approval. Consider server exposure when adding tools.

MCP text content wraps internal output; `isError` derives from internal `ok`. HTTP/JSON-RPC success and tool success are separate. Empty keys allow unauthenticated access. Nonempty keys accept Authorization/Bearer, `X-Lyra-MCP-Key`, `X-API-Key` or `Api-Key`.

## Regression checks

Use `McpConfigurationTest`, `McpHttpClientTest` and `McpServerProtocolTest` for configuration, negotiation, SSE, IDs, metadata, notifications and errors. Verify binding, keys and switches on-device. See the [client](/en/manual/mcp-client) and [server](/en/manual/mcp-server) manuals.
