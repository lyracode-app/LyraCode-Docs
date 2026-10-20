# MCP client

Client connections let Lyra Code call tools on an external MCP service. To let a computer call phone tools, see the [MCP server](/en/manual/mcp-server).

## Add a server

### Address and transport

Add an HTTP(S) endpoint in MCP settings and choose Streamable HTTP or SSE as supported by the service. The app accepts URL configurations; stdio configurations containing only `command` and `args` require a service that exposes an HTTP endpoint.

### Authentication and JSON

Enter the required key or headers. Each configuration accepts one server, either as a single node or a one-member `mcpServers` object. Add multiple servers separately.

```json
{
  "mcpServers": {
    "example": {
      "url": "https://mcp.example.com/mcp",
      "headers": { "Authorization": "Bearer REPLACE_ME" }
    }
  }
}
```

The address and token are placeholders. See the [MCP example](/en/examples/mcp) for importable configuration.

## Discover and call tools

1. Save and enable the server, then connect/refresh tools.
2. Check actual tool names and parameters.
3. Request a read-only call in conversation and verify its source and output.

Connectivity does not prove business permissions or dependencies. Refresh after changing the endpoint, headers or transport so stale tool metadata is replaced.

## Common errors

- **Configuration rejected:** check JSON, string header values and the single-server constraint. If both `url` and `baseUrl` are present, they must agree.
- **401/403:** check authentication, token permissions and expiration.
- **Empty tool list:** check tools capability, protocol and transport.
- **Visible tool fails:** inspect its schema and [logs](/en/manual/logs); do not guess remote IDs or paths.

See [MCP development](/en/developer/mcp) for implementation and tests.
