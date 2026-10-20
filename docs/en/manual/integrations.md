# Choose and check services

Choose by access direction before opening the relevant guide. Model configuration and third-party login are covered in [models](/en/manual/models) and [accounts](/en/manual/accounts).

## Choose a service

| Goal | Feature | Guide |
| --- | --- | --- |
| Phone AI calls external tools | MCP client | [Add and refresh tools](/en/manual/mcp-client) |
| Computer client calls phone tools | MCP server | [Binding, auth and endpoint](/en/manual/mcp-server) |
| Browser controls phone conversations | Web access | [Web access and previews](/en/manual/local-services) |
| Run remote commands | SSH | [SSH and remote files](/en/manual/remote-services) |
| Transfer remote files | WebDAV, FTP/FTPS/SFTP | [File services](/en/manual/remote-services) |
| Read/send mail | IMAP, SMTP | [Email](/en/manual/email) |

## Prepare configuration

Obtain an actual endpoint, protocol, credentials and permissions. Distinguish display names from configuration IDs, and phone-local addresses from remote hosts. Do not guess IDs from names.

## Verify connections

### Start read-only

Save and enable configuration, list tools/directories and read test data. Connectivity only verifies part of the chain; business permissions need their own check.

### Test writes

Use test directories, recipients or recoverable data. Verify destinations and effects. After a connection loss inspect the target before retrying.

## Diagnose failures

Check network/port, TLS, authentication, permissions and arguments, then MCP transport/protocol if relevant. Preserve redacted errors in [logs](/en/manual/logs). See [backup](/en/manual/data) for credential coverage.
