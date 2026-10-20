# Connect an HTTP MCP service

Goal: add a real HTTP endpoint, load tools and perform a read-only call. This example provides configuration shape, not a running server. `mcp.example.com` and the token are placeholders.

Download [the JSON](/examples/mcp/http-server.json) and replace both with values supplied by the service operator:

<<< ../../public/examples/mcp/http-server.json

Remove Authorization for a service that needs none. Keep `streamableHttp` only when the actual server supports it; legacy SSE needs its matching transport. Negotiate protocol versions with the service rather than copying an arbitrary version number.

## Connect and call

1. Add an MCP configuration and paste the edited JSON into its editor.
2. Verify parsed name, URL, transport and authentication, then enable and connect.
3. Load tools and inspect a read-only tool's input schema.
4. Request that tool in conversation using schema-valid arguments.
5. Check the actual server identity and returned business fields.

**Success:** connection, listing and a meaningful business result all work. HTTP 200 alone does not establish a valid MCP session or tool success.

## Constraints and failures

- One server per `mcpServers` object; configure additional endpoints separately.
- This entry accepts HTTP(S), not stdio `command`/`args`.
- Header values are strings; simultaneous `url` and `baseUrl` must match.
- For 401/403 check authentication; for 404 check the endpoint; for handshake/parsing errors check transport and protocol.
- Replace secrets with placeholders before sharing. The example domain cannot be used as a connectivity test.

See [Extensions](/en/developer/extensions) for parser and client source.
