---
title: 高级工作流与附录
---

# 第 10 章：高级工作流与附录——实战案例和速查手册

> 最后一章：**6 个真实场景的完整流程**（照着做就学会），加上**工具速查表和术语表**（以后随时回来翻）。
>
> 预计阅读 25 分钟，附录可永久收藏。

---

## 18. 高级工作流示例（照着做就会了）

### 18.1 场景一：在手机上维护一个开源插件项目

**目标**：改一个 GitHub 上的插件代码，测试，推送。

```text
1. 告诉 AI：「工作区是插件仓库目录，帮我列出当前改动」
2. AI 创建 TODO：改代码 → 补测试 → 更新 README → 推送
3. 让 AI 先 search_files + read_file 熟悉现有代码
4. 让 AI 精确修改逻辑（edit_file），再 run_command 跑回归测试
5. 让 AI 更新 README 追加「更新日志」条目
6. 你确认后，AI 执行 git add / commit / push
7. AI 汇报：改了什么、测试结果、推送状态
```

**新手要点**：每一步都能看到审批弹窗；推送前记得让 AI 展示将要执行的命令。

### 18.2 场景二：逐章写作小说 + 进度管理

**目标**：用 AI 按大纲逐章写小说，并维护进度文件。

```text
1. 项目目录放「写作计划.json」和章节正文；写一个 AGENTS.md 约定字数口径与命名规则
2. 每章任务：「先读上一章结尾和计划文件，然后写第 34 章正文，最后更新计划文件的完成数和字数」
3. 用记忆保存设定（主角寿命、卷结构、基调），跨会话保持一致
4. 设一个定时任务，每周自动生成进度总结
```

**新手要点**：AGENTS.md + 记忆 + 计划文件三者配合，AI 就能"记得"整本书的设定。

### 18.3 场景三：本地网站开发与预览

**目标**：在手机上写一个网站并在本地预览。

```text
1. Termux 安装 node/npm（第 1 章 5.4）
2. 工作区初始化 Vite/VitePress 项目
3. 让 AI 写代码、构建静态产物
4. 对 AI 说：「启动微型服务器，端口 8080」
5. 浏览器打开地址预览；出问题让 AI 看服务器日志
6. 改完重新构建，最后关闭服务器
```

**新手要点**：微型服务器根目录=当前工作区，预览前确保构建产物在工作区里。

### 18.4 场景四：邮件 + 云盘自动化

**目标**：让 AI 处理邮件、自动备份。

```text
1. 配置 IMAP/SMTP 和 WebDAV 账号（第 5 章）
2. 让 AI「列出未读邮件 → 提取关键信息 → 生成回复草稿」
3. 你在邮箱里审阅草稿后手动发送（更稳）
4. 重要附件下载到隔离目录，杀毒后再用
5. 设定时任务：每月自动 export_backup 到 WebDAV
```

**新手要点**：发送邮件要单独确认；"存草稿再手动发"是最稳的姿势。

### 18.5 场景五：多 Agent 并行调研（子代理）

**目标**：同时调研两个方案再对比。

```text
1. 对 AI 说：「分别调研 A 方案和 B 方案的优缺点」
2. AI 派两个子代理，各自产出：结论、证据来源、风险、建议
3. 主 AI 复核两份结果，交叉验证冲突点
4. 汇总成一份对比文档，输出到工作区
```

**新手要点**：适合"独立、可并行"的任务；结果要复核，别全信。

### 18.6 场景六：每次执行前的安全自检清单

```text
□ 这个操作需要什么权限？有没有更低权限的替代？
□ 目标路径/服务器/账号是否正确？
□ 命令会修改什么？能不能恢复（备份）？
□ 涉及密钥/隐私吗？会不会被记录或外发？
□ 审批弹窗里的内容和我的预期一致吗？
```

**新手要点**：这 5 个问题养成习惯，比任何安全设置都管用。

---

## 19. 附录

### 19.1 工具速查表（想做什么，用哪个）

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

### 19.2 术语表（看不懂的词回来查）

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

### 19.3 许可证与贡献

- 项目采用双重许可：原创代码 **AGPLv3-or-later**；闭源分发/私有修改/商业例外需商业许可；
- 接受组织成员 PR；AI 辅助代码亦可提交，但提交者需完成测试与人工审查；
- **不要提交**签名密钥、keystore、API Key、`.env`、`local.properties` 等隐私文件。

### 19.4 免责声明

- 本手册基于 Lyra Code 3.6.0 官方 README 与内置 Agent 工具契约编写，**界面细节以实际版本为准**；
- 远程脚本、MCP 服务、Skills 仓库与 SSH 命令的可信性需自行判断；
- 使用过程中产生的数据安全责任由使用者承担。

### 19.5 读完以后：给你的学习路线

```text
第 1 章 ✅ 安装配置（必读）
第 2 章 ✅ 接上模型（必读）
第 3-4 章 ✅ 文件/命令/工具（核心）
第 5-7 章 🔜 按需：远程 / 服务器 / 记忆备份
第 8-9 章 🔜 按需：统计 / 安全排障
第 10 章 📌 本附录随时回来翻
```

> 恭喜你读完了！现在去对 AI 说一句「帮我创建一个 TODO」，体验一下 Agent 干活的感觉吧。

---

*文档完 · 建议结合官方 [README_zh-CN.md](https://github.com/lyracode-app/Lyra-Code/blob/main/README_zh-CN.md) 阅读*
