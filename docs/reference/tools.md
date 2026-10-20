# 工具与参数速查

本页覆盖常用调用与工具族，完整定义以当前源码为准。模型发送的是结构化工具调用，下面的 JSON 是参数对象示例，不是要求用户手动输入的命令。

## 工作区文件工具

| 工具 | 必需参数 | 说明 |
| --- | --- | --- |
| `list_directory` | `path` | 根目录为 `.`，返回真实文件和目录 |
| `read_file` | `path` | 读取工作区文本，大小上限 1 MB |
| `read_file_lines` | `path` | 可选 `start_line`、`line_count`，适合定位读取，文件上限 16 MB |
| `write_file` | `path` | 完整新建/替换；提供 `content` 或 `content_lines` 之一 |
| `edit_file` | `path` | 精确文本替换或行范围替换，先读取相关内容 |
| `append_file` | `path` | 追加文本；内容字段规则同写入 |
| `create_folder` | `path` | 工作区内建目录 |
| `rename_move` | `from`、`to` | 工作区内移动/重命名 |
| `delete_file_or_folder` | `path` | 删除文件或空目录 |
| `search_files` | `query`、`path` | 按名称、扩展名、路径片段查找 |
| `get_file_info` | `path` | 查询元数据 |

文件工具均使用工作区相对路径。`content_lines` 是字符串数组，不是序列化数组文本；`ensure_trailing_newline` 用于末尾换行。写入已有文件前要区分覆盖与编辑。

```json
{"path":"hello.txt","content_lines":["Hello, Lyra Code!"],"ensure_trailing_newline":true}
```

精确替换使用 `old_content`/`new_content` 或对应 `_lines` 数组；默认只匹配一次，可用 `expected_replacements` 明确预期。行范围模式使用 1 起始、包含两端的 `start_line` 与 `end_line`，不要同时混用两种定位模式。

```json
{"path":"hello.txt","old_content":"Hello, Lyra Code!","new_content":"Verified.","expected_replacements":1}
```

`global_*` 为共享存储工具，范围、路径和权限独立于普通工作区工具，不能访问其他应用私有数据或被限制目录。

## 命令工具

| 工具 | 环境与参数 |
| --- | --- |
| `proot_command` | 必须 `linux_id`；`command` 或 `command_lines` 提供命令；可选 `workDir`、`timeout_seconds`、`background` |
| `run_command` | 外部 Termux；命令与可选参数同上，不使用 `linux_id` |
| `ssh_exec` | 已配置 SSH 服务器；先通过 `list_ssh_servers` 获取真实 ID |
| `execute_shell_command` | 依赖实际 Shizuku Shell 能力 |
| `execute_root_command` | 依赖已配置且实际可用的 Root 执行能力 |

将 `REPLACE_WITH_ENABLED_LINUX_ID` 替换为应用中真实启用的 ID：

```json
{
  "linux_id": "REPLACE_WITH_ENABLED_LINUX_ID",
  "command_lines": ["pwd", "printf 'ready\\n'"],
  "workDir": "/root",
  "timeout_seconds": 60,
  "background": false
}
```

前台默认 60 秒、最多 600 秒。持久服务使用 `background=true`，再检查返回的输出文件和实际服务状态。`workDir` 的路径属于相应执行环境，不能随意互换 Android、PRoot 和 Termux 私有路径。

## 其他工具族

| 能力 | 常见入口 | 使用规则 |
| --- | --- | --- |
| 联网与下载 | `web_search`、`read_web_page`、`download_file` | 打开原始来源核对；检查下载目标及可选哈希 |
| TODO 与任务 | `set_todo_list`、`update_todo_item`、`manage_scheduled_tasks` | TODO 不负责调度，任务页核对执行结果 |
| 历史与记忆 | `search_conversation_history`、`read_conversation_history`、`read_memories`、`save_memory` | 只读取相关范围，修改记忆先取得真实 ID |
| Skills | `list_skill_files`、`read_skill_file` | 先确认相关性，再读入口和参考文件 |
| 外部服务 | SSH、邮件、WebDAV、文件传输、MCP 工具 | 先列出配置 ID，发送/上传核对目标 |
| 本地服务/数据 | `manage_mini_server`、`read_mini_server_logs`、`export_backup`、`import_backup` | 检查服务状态、备份内容和恢复模式 |
| 设备交互 | `device_get_capabilities` 与会话专用工具 | 只能在对应设备会话和已授予能力下调用 |

## 如何读取结果

普通内置工具通常包装为 `lyra_tool_output_v2`：检查 `ok`、`error`、`content` 与 `file_changes`。`content` 可能包含进一步的结构化结果或命令输出，应继续检查退出码、stderr 或服务状态。作用域/设备工具可能有自己的结果格式，不能只搜索某个“成功”词。

拒绝审批、工具关闭、无效路径和模型参数错误都应作为未完成处理；修正原因后再继续，不能在最终报告中记作已完成。
