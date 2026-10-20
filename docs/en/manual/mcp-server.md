# MCP server

The server exposes enabled phone Agent tools to other clients over HTTP. It is separate from [external MCP connections](/en/manual/mcp-client) and [browser access to phone conversations](/en/manual/local-services).

## Start the service

1. Open Local MCP server in Settings and configure bind address, port and authentication key.
2. Start it and check status, endpoint and errors. The default bind configuration is `0.0.0.0:8791`; the endpoint path is `/mcp`.
3. Local clients use `127.0.0.1`. Other devices use the phone's reachable LAN address shown in settings.

Use `127.0.0.1` for local-only binding. `0.0.0.0` binds all IPv4 interfaces and is not the phone's destination address. Listed LAN addresses must still match the actual binding and network reachability.

## Configure another client

```json
{
  "mcpServers": {
    "lyra-phone": {
      "url": "http://192.168.1.20:8791/mcp",
      "headers": { "Authorization": "Bearer REPLACE_WITH_YOUR_KEY" }
    }
  }
}
```

Replace the IP and key and adapt the file to the client's format. The server accepts HTTP POST JSON-RPC. `GET /mcp` is not a browser homepage or SSE stream. The client must support the endpoint's protocol negotiation; see [development details](/en/developer/mcp).

## Verify connectivity

Check status, list tools, then call a read-only tool. From a desktop terminal:

```sh
curl -H "Authorization: Bearer REPLACE_WITH_YOUR_KEY" http://192.168.1.20:8791/status
```

Expect JSON containing `running`, `host`, `port` and `url`. Inspect `isError` and the inner tool result as well as the HTTP status.

## Authentication and execution

An empty key permits access without a key, so configure one before remote use. The current local server execution entry skips individual phone conversation approvals. Treat authorized clients as trusted callers; tool switches, argument validation and Android permissions still apply. Do not assume the phone will prompt again.

The service uses HTTP. Use a trusted network or an additional encrypted channel across untrusted networks. Force-stopping the app, process reclamation or stopping the service ends availability.

## Stop and diagnose

- **Start fails:** check occupied ports and bind address, then restart.
- **Computer cannot connect:** check phone IP, binding, network and client isolation.
- **401:** check key/header. The implementation also accepts designated headers such as `X-Lyra-MCP-Key`.
- **405:** `/mcp` requires POST.
- **Empty or unavailable tools:** check Agent attachment, switches and dependencies.

Stop the service in Settings when finished and confirm its stopped status.
