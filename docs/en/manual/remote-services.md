# SSH and remote files

Use SSH for remote commands/terminals, and WebDAV or FTP/FTPS/SFTP for remote files. Add a configuration in its settings page and begin with a read-only test.

## SSH

Configure host, port, username and password or key authentication. List configured servers, use the returned ID to run `pwd`, then enter the project directory. Do not assume a terminal's current directory also applies to individual command calls.

## File services

| Protocol | Configuration | First check |
| --- | --- | --- |
| WebDAV | Base URL, username and password/token | List a directory and download a test file |
| FTP / FTPS | Host, port, encryption and account | Check directory and TLS settings |
| SFTP | SSH authentication and remote path | List a directory and verify identity/path |

Plain FTP, FTPS and SFTP are different protocols; select what the service supports. WebDAV can also store [app backups](/en/manual/data).

## Transfer workflow

1. List configurations for the service ID and list the target directory.
2. Check local workspace-relative and full remote paths.
3. Upload/download a small file in a test directory.
4. Read back content or verify size before handling real files.

A display name is not a configuration ID. Preserve copies before overwriting. After a connection loss, inspect the destination before retrying.

## Connection diagnosis

Check network/port, TLS, authentication, directory permissions and arguments in that order. Compare redacted errors and paths with [logs](/en/manual/logs). An open port does not prove write permission.
