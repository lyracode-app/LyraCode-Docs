---
title: 附录
---

# 第 25 章：附录——工具速查表与术语表

> 附录可永久收藏：**工具速查表**（想做什么，用哪个）、**术语表**（看不懂的词回来查）、许可证与学习路线。
>
> 预计阅读 10 分钟。

---

## 25.1 工具速查表（想做什么，用哪个）

| 想做什么 | 用哪个 |
| --- | --- |
| 列出目录 | list_directory / global_list_directory |
| 找文件 | search_files（工作区）→ global_search_files（全盘） |
| 读文件 | read_file / read_file_lines（大文件分段） |
| 新建/改写文件 | write_file（新文件）/ edit_file（精确改）/ append_file（追加） |
| 下载 | download_file（优先于 curl/wget） |
| 跑命令 | run_command（Termux） |
| 系统操作 | execute_shell_command（Shizuku）/ execute_root_command（root） |
| 联网查资料 | web_search → read_web_page → mark_web_sources |
| 远程 Linux | list_ssh_servers → ssh_exec |
| 邮件 | list_email_accounts → list_emails → read_email / save_email_draft |
| 云盘 | list_webdav_servers → webdav_list / upload / download |
| FTP/SFTP | list_file_transfer_servers → file_transfer_* |
| 本地站点预览 | manage_mini_server + read_mini_server_logs |
| 定时任务 | manage_scheduled_tasks |
| 备份 | export_backup / import_backup |
| 设备信息 | get_device_hardware_info / list_installed_apps |

各工具的详细参数见[工具参考](/reference/files)部分。

## 25.2 术语表（看不懂的词回来查）

| 术语 | 大白话解释 |
| --- | --- |
| 工作区（Workspace） | AI 默认能操作的项目文件夹，路径相对化 |
| 全局存储（Global） | `/storage/emulated/0` 整个手机存储，需 global_* 工具 |
| Termux | 手机上的终端 App，命令执行通道 |
| Shizuku | 借用系统调试权限的服务（ADB 级别） |
| Root | 手机最高权限 |
| API Key | 模型服务商的"通行证密码"，别泄露 |
| Token | 计费单位，可粗浅理解为"字数" |
| Agent | 能动手干活、受你审批控制的 AI |
| MCP | AI 连接外部工具/数据的标准协议 |
| Skill | 包含 SKILL.md 与资源的技能包 |
| AGENTS.md | 项目根目录的指令文件，AI 动工前自动读 |
| .bak | 修改文件前自动生成的同目录备份 |
| Mini Server | 内置静态网页服务器 |
| 隔离目录 | 附件下载的安全隔离区，AI 不读内容 |
| 补充导入 | 非破坏、自动去重的备份恢复模式 |
| Base URL | 服务商服务器地址（官方服务商一般不填） |
| System Prompt | 系统提示词，设定 AI 的人设和规则 |

## 25.3 许可证与贡献

- 项目采用双重许可：原创代码 **AGPLv3**；闭源分发/私有修改/商业例外需商业许可；
- 接受组织成员 PR；AI 辅助代码亦可提交，但提交者需完成测试与人工审查；
- **不要提交**签名密钥、keystore、API Key、`.env`、`local.properties` 等隐私文件。

**其他帮助？** 可以联系开发者或者在托管仓库提交 Issue：

- GitHub：<https://github.com/lyracode-app/Lyra-Code>
- Gitee：<https://gitee.com/yukisoffd/lyra-code>

## 25.4 免责声明

- 本手册基于 Lyra Code 3.6.0 官方 README 与内置 Agent 工具契约编写，**界面细节以实际版本为准**；
- 远程脚本、MCP 服务、Skills 仓库与 SSH 命令的可信性需自行判断；
- 使用过程中产生的数据安全责任由使用者承担。

## 25.5 读完以后：给你的学习路线

```text
第 1-2 章 ✅ 安装配置（必读）
快速上手 ✅ 接上模型（必读）
第 3-5 章 🔜 界面与对话（核心）
第 8 章 ✅ 模型配置（必读）
第 11-13 章 ✅ 文件/命令/工具（核心）
第 14-21 章 🔜 按需：远程 / 服务器 / 自动化 / 备份统计
第 22-24 章 🔜 按需：安全 / 排障 / 实战
第 25 章 📌 本附录随时回来翻
```

> 恭喜你读完了！现在去对 AI 说一句「帮我创建一个 TODO」，体验一下 Agent 干活的感觉吧。

---

*文档完 · 建议结合官方 [README_zh-CN.md](https://github.com/lyracode-app/Lyra-Code/blob/main/README_zh-CN.md) 阅读*
