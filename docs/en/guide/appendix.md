---
title: Appendix
---

# Chapter 25: Appendix — tool index and glossary

## 25.1 Tool index

| Goal | Relevant tools or page |
| --- | --- |
| Workspace files | `list_directory`, `read_file`, `read_file_lines`, `write_file`, `edit_file` |
| Shared storage outside the workspace | File tools whose names begin with `global_` |
| Native download | `download_file` |
| Termux commands | `run_command` |
| App-internal Linux commands | `proot_command` |
| Shizuku / Root commands | `execute_shell_command` / `execute_root_command` |
| Web research | `web_search` → `read_web_page` → `mark_web_sources` |
| SSH | `list_ssh_servers` → `ssh_exec` |
| Email | List accounts/folders/messages → read, change status, save draft, or send |
| WebDAV and FTP/FTPS/SFTP | List servers → browse/search → upload or download |
| Mini Server | `get_mini_server_status`, `manage_mini_server`, `read_mini_server_logs` |
| Scheduled tasks | `manage_scheduled_tasks` |
| Backup | `export_backup` / `import_backup` |
| Memory | `read_memories`, `save_memory`, `update_memory`, `delete_memory` |

Availability depends on tool switches, Android permissions, and prerequisite configuration. See [Agent Tools](/en/guide/agent-tools) and the [Tool Reference](/en/reference/files).

## 25.2 AI and API terminology

| Term | Precise definition |
| --- | --- |
| AI model | A machine-learning model that computes outputs from inputs. Text, image, tool-calling, context, and parameter support varies by model. |
| Provider | An organization or platform supplying model APIs, authentication, billing, and availability. The model developer and API provider may be different entities. |
| API | A defined interface through which software communicates. Lyra Code invokes model and remote-service APIs through HTTP requests. |
| API key | A credential issued by a provider and normally tied to an account, permissions, and quota. Revoke it immediately if exposed. |
| API format | The request paths, headers, JSON fields, and response structures of a protocol such as OpenAI Chat Completions, Anthropic Messages, or Gemini GenerateContent. A model name alone does not determine the format. |
| Base URL | The common portion of an API address, normally including scheme, host, optional port, and base path. A request path may be appended to form the final endpoint. |
| Model ID | The exact identifier used by an API to select a model. It may differ from the marketing name and may include a version suffix. |
| Token | A discrete unit produced by a model tokenizer. Tokens have no fixed one-to-one relationship with characters, Chinese characters, or words. |
| Context window | The maximum token budget handled by one model request, generally including system instructions, history, tool definitions, tool output, and current content. |
| Prompt | Instructions or context supplied to a model; it is broader than one user message. |
| System prompt | High-priority instructions describing role, capabilities, tools, and constraints. It cannot guarantee that the model never makes mistakes. |
| Streaming | Returning a response in increments while it is generated. UI animation does not change model billing or actual generation speed. |

## 25.3 Agent and project terminology

| Term | Precise definition |
| --- | --- |
| Agent | A task-execution system composed of a model, instructions, state, and a tool-call loop. The app validates, approves where required, and executes proposed calls. |
| Tool | A callable capability with a fixed name, parameter schema, and result schema. Tool-level success does not prove that the overall task was completed correctly. |
| Approval | A control step in which the user confirms parameters and impact before selected calls. Read-only tools may not prompt every time, so approval is not the only safety boundary. |
| Workspace | The directory selected for a chat or project and used as the root for relative paths and workspace file-tool boundaries. Selecting it does not upload the whole directory. |
| Project | Application data that groups a workspace with related chats; it is not the folder itself. |
| Global file tool | A tool for Android shared storage outside the workspace. “Global” does not mean bypassing Android permissions or accessing all system files. |
| Sub-agent | A separate model session that receives an independent delegated task and returns a result. Parallel calls may reduce elapsed time while increasing total tokens and cost. |
| Memory | Locally stored, cross-chat personalization supplied to the model when relevant. Relevant content may leave the device in a request to the configured provider. |
| Skill | A set of task instructions and supporting resources with `SKILL.md` as its entry point. It does not add Android permissions or bypass tool controls. |
| `AGENTS.md` | A directory-scoped project instruction file for build commands, code conventions, and repository rules. |
| TODO / plan | A visible record of Agent steps and status, not an Android scheduler. |

## 25.4 Android, files, and command terminology

| Term | Precise definition |
| --- | --- |
| Shared storage | Android media/document storage available to users and authorized apps; primary storage is commonly mapped to `/storage/emulated/0`. |
| App-private directory | Data storage assigned to one app. Other ordinary apps cannot directly access it, and uninstalling or clearing app data normally removes it. |
| SAF | Android Storage Access Framework, through which a system picker grants access to selected documents or directories. It is not equivalent to traditional path permission. |
| Shell | A command-line program such as `sh` or `bash` that parses commands and starts processes. A shell does not inherently imply Root privilege. |
| Termux | A separate Android terminal and user-space environment. `run_command` requests execution through Termux RunCommandService. |
| PRoot | A user-space compatibility tool that translates process paths and related system calls. It is not a VM, a container security boundary, or privilege escalation. |
| rootfs | A Linux root filesystem hierarchy containing directories such as `/bin`, `/etc`, and `/usr`. A rootfs archive is not an installer ISO. |
| Shizuku | A project exposing an already-started ADB or Root service to authorized apps through controlled Binder APIs. Effective privileges depend on how it was started. |
| Root | The privileged user identity with user ID 0 on Linux/Android. SELinux and other controls may still restrict a Root process. |
| ABI | Binary interface and CPU architecture conventions. `arm64-v8a` and AArch64 refer to the same 64-bit ARM family and cannot directly run x86_64 binaries. |
| `.bak` | A single-file copy made before an overwrite. It is not complete version history or a project-wide backup. |
| SHA-256 | A cryptographic hash used to compare downloaded content with a publisher-provided digest. A matching digest does not by itself establish that the publisher is trustworthy. |
| Quarantine directory | Temporary storage separating email attachments from Agent-readable workspaces. Quarantine does not mean that malware scanning has completed. |

## 25.5 Network and remote-service terminology

| Term | Precise definition |
| --- | --- |
| HTTP / HTTPS | Web request protocols; HTTPS is HTTP protected by TLS encryption and authentication. Plain HTTP may expose credentials and content. |
| TLS | A protocol providing encryption, integrity, and peer authentication. Disabling certificate validation removes a critical identity check. |
| SSH | An encrypted remote login and command-execution protocol. SFTP commonly runs as an SSH subsystem. |
| IMAP | A protocol for accessing server-side mailboxes, folders, messages, and message state. |
| SMTP | A protocol for submitting and transferring email, distinct from IMAP mailbox access. |
| WebDAV | HTTP-based remote resource and file management. A browser login URL is not necessarily a WebDAV endpoint. |
| FTP | A legacy file transfer protocol that does not encrypt authentication or content by default. |
| FTPS | FTP protected with TLS, in explicit or implicit variants. It is not SFTP. |
| SFTP | SSH File Transfer Protocol, an independent file-transfer protocol built on SSH. |
| MCP | Model Context Protocol, through which a client discovers and calls server-provided tools or resources. Connecting a server does not automatically grant it phone-file access. |
| SSE | Server-Sent Events, a mechanism for a server to push events through a persistent HTTP response. |
| Streamable HTTP | An MCP HTTP transport that exchanges protocol messages through HTTP requests and optional streamed responses. |
| mDNS | Multicast-based name resolution and service discovery on a local network; it normally does not cross routers. |
| SPA fallback | A static-server rule that returns the entry HTML when no file matches a path, commonly used for client-routed single-page applications. |

## 25.6 Data and scheduling terminology

| Term | Precise definition |
| --- | --- |
| Safe export | A backup excluding API keys, passwords, and private keys. It may still contain chats, addresses, and personal information. |
| Full migration backup | A backup explicitly including secrets so credentials can be restored on another device. Treat it as a high-sensitivity credential bundle. |
| Supplement import | A merge mode that preserves existing data and attempts deduplication; similar configurations with different IDs may still remain separate. |
| Replace import | A destructive restore mode that replaces corresponding current data with backup contents. Back up the current state first. |
| WorkManager | Android's deferred, constraint-aware background work scheduler. It targets eventual execution rather than second-level timing precision. |
| Usage estimate | Lyra Code's local estimate of tokens and messages for trend analysis, not the provider's final bill. |

## 25.7 License and scope

Original Lyra Code source is licensed under the **GNU Affero General Public License version 3 (AGPL-3.0)**. Third-party components retain their respective licenses. Refer to `LICENSE` and `THIRD_PARTY_NOTICES.md` in the application repository.

The documentation follows the current Lyra Code source, UI strings, and tool structure. Installed releases may differ; use the UI and Release notes for that version as the final reference.

- GitHub: <https://github.com/lyracode-app/Lyra-Code>
- Gitee: <https://gitee.com/yukisoffd/lyra-code>

---

*See also the project's [README](https://github.com/lyracode-app/Lyra-Code/blob/main/README.md).*
