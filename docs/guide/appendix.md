---
title: 附录
---

# 第 25 章：附录——工具索引与术语表

## 25.1 工具索引

| 目标 | 相关工具或入口 |
| --- | --- |
| 工作区目录与文件 | `list_directory`、`read_file`、`read_file_lines`、`write_file`、`edit_file` |
| 工作区外共享存储 | 名称以 `global_` 开头的文件工具 |
| 原生下载 | `download_file` |
| Termux 命令 | `run_command` |
| 应用内 Linux 命令 | `proot_command` |
| Shizuku / Root 命令 | `execute_shell_command` / `execute_root_command` |
| 联网检索 | `web_search` → `read_web_page` → `mark_web_sources` |
| SSH | `list_ssh_servers` → `ssh_exec` |
| 邮件 | 列账号/文件夹/邮件 → 读正文、改状态、存草稿或发送 |
| WebDAV | 列服务器 → 列目录/搜索 → 上传或下载 |
| FTP/FTPS/SFTP | 列服务器 → 列目录/搜索 → 上传或下载 |
| 微型服务器 | `get_mini_server_status`、`manage_mini_server`、`read_mini_server_logs` |
| 定时任务 | `manage_scheduled_tasks` |
| 数据备份 | `export_backup` / `import_backup` |
| 记忆 | `read_memories`、`save_memory`、`update_memory`、`delete_memory` |
| 设备信息 | `get_device_hardware_info` / `list_installed_apps` |

工具是否可用取决于开关、Android 权限和前置配置。详细边界见 [Agent 工具](/guide/agent-tools)与[工具参考](/reference/files)。

## 25.2 AI 与接口术语

| 术语 | 严谨解释 |
| --- | --- |
| AI 模型（Model） | 根据输入计算输出的机器学习模型。不同模型支持的文本、图片、工具调用、上下文长度和参数并不相同。 |
| 服务商（Provider） | 提供模型 API、身份认证、计费和可用性保障的组织或平台。模型开发者与 API 服务商可能不是同一主体。 |
| API | 软件之间按约定格式通信的接口。Lyra Code 通过 HTTP 请求调用模型或远程服务 API。 |
| API Key | 服务商签发的认证凭据，通常关联账户、权限和额度。它不是普通配置文本，泄露后应立即吊销。 |
| 接口格式 | 请求路径、Header、JSON 字段和响应结构的协议约定，例如 OpenAI Chat Completions、Anthropic Messages 或 Gemini GenerateContent。模型名称不能单独决定接口格式。 |
| Base URL | API 请求的基础地址，通常包含协议、主机、可选端口和基础路径；最终端点还可能拼接请求路径。是否需要 `/v1` 由服务商定义。 |
| 请求路径（Request Path） | 相对于 Base URL 的具体 API 路径。重复或遗漏路径段都会导致请求失败。 |
| 模型 ID | API 用来选择模型的精确标识符。它可能与网页展示名称不同，通常区分字符和版本后缀。 |
| Token | 模型分词器处理文本所使用的离散单位。Token 与汉字、单词或字符不存在固定一一对应关系；计费规则以服务商为准。 |
| 上下文窗口 | 单次模型请求能够处理的 Token 总量限制，通常包含系统提示词、历史、工具定义、工具输出和本轮内容。 |
| Prompt | 提供给模型的指令或上下文统称，不等同于只由用户输入的一条消息。 |
| System Prompt | 位于高优先级上下文中的系统指令，用于描述角色、能力、工具规则和行为约束；它不能保证模型绝不出错。 |
| 流式输出 | 服务端在生成过程中分段返回结果，而不是等完整回答结束后一次返回。界面动画不改变实际模型速度或计费。 |
| 推理深度 | 部分模型支持的推理强度参数。其含义和可选值由模型 API 定义，更高通常意味着更大延迟或消耗，但不保证答案正确。 |

## 25.3 Agent 与项目术语

| 术语 | 严谨解释 |
| --- | --- |
| Agent | 由模型、指令、状态和工具调用循环组成的任务执行系统。模型提出工具调用，应用负责校验、审批和执行；不同工具的审批策略并不相同。 |
| 工具（Tool） | 具有固定名称、参数结构和返回结构的可调用能力，例如读文件、执行命令或发送邮件。工具成功不等于业务目标已经正确完成。 |
| 审批（Approval） | 在特定工具执行前由用户确认参数和影响的控制环节。只读工具不一定逐次弹窗，不能把审批当作唯一安全边界。 |
| 工作区（Workspace） | 当前会话或项目选定的文件目录，是工作区文件工具解析相对路径和限制访问范围的根。它不会自动把目录全部上传给模型。 |
| 项目（Project） | 将一个工作区与多条相关会话组织在一起的应用数据结构，不等同于文件夹本身。 |
| 全局文件工具 | 用于工作区外 Android 共享存储的文件工具。名称中的“全局”不表示能绕过 Android 权限或访问所有系统文件。 |
| 子代理（Sub-agent） | 接受主 Agent 分派的独立子任务并返回结果的模型会话。并行调用可能缩短等待时间，但通常增加总 Token 和费用。 |
| 记忆（Memory） | 本地保存、跨会话提供给模型的稳定个性化信息。相关内容在模型处理请求时可能发送给所配置的服务商。 |
| Skill | 以 `SKILL.md` 为入口的任务说明与配套资源集合。Skill 提供操作流程，但不会增加 Android 权限或绕过工具控制。 |
| `SKILL.md` | Skill 的主说明文件，通常包含名称、触发描述、步骤、边界以及其他资源索引。 |
| `AGENTS.md` | 项目目录中的 Agent 指令文件，用于记录构建命令、代码规范和目录约定；其适用范围由所在目录层级决定。 |
| TODO / 计划 | Agent 对复杂任务步骤和状态的可视化记录，不是 Android 定时调度器。 |

## 25.4 Android、文件与命令术语

| 术语 | 严谨解释 |
| --- | --- |
| 共享存储 | Android 中供用户和获授权应用访问的媒体/文档存储区域，主存储常映射为 `/storage/emulated/0`。 |
| 应用私有目录 | 由 Android 为单个应用分配的数据目录，其他普通应用不可直接访问；卸载或清除应用数据通常会删除其中内容。 |
| SAF | Android Storage Access Framework。用户通过系统文件选择器向应用授予特定文档或目录访问权，不等同于传统文件路径权限。 |
| Shell | 解析命令并启动程序的命令行环境，例如 `sh`、`bash`。Shell 本身不决定是否具有 Root 权限。 |
| Termux | 独立的 Android 终端与用户空间环境。Lyra Code 的 `run_command` 通过 Termux RunCommandService 请求它执行命令。 |
| PRoot | 在用户空间改写进程文件路径和相关系统调用的兼容工具。它不是虚拟机、容器安全边界或 Root 提权机制。 |
| rootfs | Linux 根文件系统的目录集合，包含 `/bin`、`/etc`、`usr` 等；rootfs 压缩包不同于 ISO 安装介质。 |
| Shizuku | 将已启动的 ADB 或 Root 服务能力通过受控 Binder 接口提供给授权应用的项目。实际权限取决于其启动方式。 |
| Root | Linux/Android 中用户 ID 0 的特权身份。设备获得 Root 会扩大系统修改能力和风险，但仍可能受到 SELinux 等机制限制。 |
| ABI | 应用二进制接口及 CPU 架构约定。`arm64-v8a` 与 AArch64 属于同一 64 位 ARM 架构族，不能直接运行 x86_64 二进制。 |
| `.bak` | 保存覆盖前创建的单文件备份副本。它不是完整版本历史，也不保证能恢复项目中的其他文件。 |
| SHA-256 | 生成固定长度摘要的密码学哈希算法，可用于校验下载内容是否与发布者给出的摘要一致；它本身不能证明发布者可信。 |
| 隔离目录 | 用于把邮件附件与 Agent 可读工作区分开的临时存储区。隔离不等同于已经完成恶意软件检测。 |

## 25.5 网络与远程服务术语

| 术语 | 严谨解释 |
| --- | --- |
| HTTP / HTTPS | Web 请求协议；HTTPS 是 HTTP 通过 TLS 加密和认证后的形式。HTTP 明文连接可能暴露凭据和内容。 |
| TLS | 为网络连接提供加密、完整性和服务器身份认证的协议。关闭证书验证会失去关键身份保障。 |
| SSH | 加密的远程登录与命令执行协议；SFTP 通常作为 SSH 子系统运行。 |
| IMAP | 访问和管理服务器端邮箱、文件夹和邮件状态的协议。 |
| SMTP | 提交和传输电子邮件的协议，与 IMAP 的收取/管理职责不同。 |
| WebDAV | 基于 HTTP 的远程资源和文件管理协议，常用于网盘目录操作和备份。网页登录地址不一定是 WebDAV 端点。 |
| FTP | 传统文件传输协议，默认不加密认证和内容。 |
| FTPS | FTP 通过 TLS 加密的形式，分为显式和隐式模式；它不是 SFTP。 |
| SFTP | SSH File Transfer Protocol，基于 SSH 的独立文件传输协议。 |
| MCP | Model Context Protocol，用于客户端发现并调用服务器提供的工具或资源。连接 MCP Server 不等于自动授予其手机文件权限。 |
| SSE | Server-Sent Events，服务器通过一个持久 HTTP 响应向客户端单向推送事件的机制。 |
| Streamable HTTP | MCP 使用的 HTTP 传输方式之一，支持通过 HTTP 请求与可选流式响应交换协议消息。 |
| mDNS | 在本地网络中通过组播进行名称解析和服务发现的协议，通常不跨越路由器。 |
| SPA fallback | 静态服务器在请求路径没有对应文件时返回入口 HTML 的策略，常用于客户端路由的单页应用。 |

## 25.6 数据与调度术语

| 术语 | 严谨解释 |
| --- | --- |
| 安全导出 | 不包含 API Key、密码和私钥等秘密的备份；仍可能包含对话、地址和个性化信息。 |
| 完整迁移备份 | 显式包含秘密、可在另一设备恢复连接凭据的备份，应按高敏感凭据集合保管。 |
| 补充导入 | 在现有数据上合并并尽量去重的导入模式，不保证所有不同 ID 的相似配置都能自动合并。 |
| 覆盖导入 | 以备份内容替换现有对应数据的破坏性恢复模式，执行前应先备份当前状态。 |
| WorkManager | Android 的延迟、约束型后台工作调度框架，适合保证任务最终获得执行机会，不保证秒级准时。 |
| 用量估算 | Lyra Code 在本地估算的 Token 和消息统计，用于观察趋势，不等同于服务商最终账单。 |

## 25.7 许可证与贡献

Lyra Code 原创源代码依据 **GNU Affero General Public License version 3（AGPL-3.0）** 开源，第三方组件遵循各自许可证。具体以项目的 `LICENSE` 与 `THIRD_PARTY_NOTICES.md` 为准。

贡献代码前应完成实际测试和人工审查。不要提交签名密钥、keystore、API Key、`.env`、`local.properties` 或其他隐私文件。

- GitHub：<https://github.com/lyracode-app/Lyra-Code>
- Gitee：<https://gitee.com/yukisoffd/lyra-code>

## 25.8 文档适用范围

本文档根据 Lyra Code 当前项目源码、界面文案和工具结构维护。不同发行版本的功能、字段和权限行为可能不同，实际使用应以已安装版本界面及对应 Release 说明为准。

远程脚本、MCP Server、Skill 仓库、模型服务商和 SSH 命令的可信性需要用户独立判断。

---

*建议同时阅读项目的 [README_zh-CN.md](https://github.com/lyracode-app/Lyra-Code/blob/main/README_zh-CN.md)*
