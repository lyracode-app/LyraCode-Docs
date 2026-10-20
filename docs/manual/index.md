# 使用手册

Lyra Code 是 Android 上的 AI 开发环境。模型接收任务并选择工具，应用执行文件、命令与服务操作，再把真实结果交回模型。完成后用文件、测试或页面核对结果。

## 第一次使用

[完成第一个任务](/manual/quick-start) → [配置模型](/manual/models) → [选择工作区](/manual/workspaces)。需要找界面按钮时看[界面与侧菜单栏](/manual/interface)。

### 基本概念

| 概念 | 含义 |
| --- | --- |
| 模型服务商 | 接收请求的接口、协议与凭据 |
| 对话 | 某个任务的消息、工具记录和上下文 |
| 工作区 | 文件工具操作的项目目录 |
| 执行环境 | PRoot Linux、Termux 或远程命令环境 |

能对话还不等于能调用工具：模型能力、工具开关、权限和运行环境要分别检查。

## 对话与任务

### 组织和阅读历史

[消息管理](/manual/conversations) · [对话分支](/manual/conversation-branches) · [跳转与快捷手势](/manual/conversation-navigation) · [归档与恢复](/manual/archive)。

### 上下文和执行

[附件与压缩](/manual/attachments) · [工具审批与变更审查](/manual/review) · [子代理协作](/manual/sub-agents)。

## 文件与运行环境

[工作区选择](/manual/workspaces) · [侧栏文件与双栏管理](/manual/files) · [代码编辑器](/manual/editor) · [PRoot、Termux 与命令](/manual/commands) · [项目预览与网页访问](/manual/local-services)。

## 连接与服务

### 模型账号

[第三方账号](/manual/accounts)说明登录、同步、余额与退出；手动添加服务商见[模型配置](/manual/models)。

### 工具与远程服务

[连接选择索引](/manual/integrations) · [MCP 客户端](/manual/mcp-client) · [MCP 服务端](/manual/mcp-server) · [SSH 与远程文件传输](/manual/remote-services) · [邮件与附件](/manual/email)。

## 自动化与个性化

[定时与后台任务](/manual/automation) · [Skills](/manual/skills) · [指令与记忆](/manual/memory) · [外观与显示](/manual/customization) · [设备交互与桌宠](/manual/device-interaction)。

## 日志、统计与数据

[日志与请求排查](/manual/logs) · [统计与 Token 用量](/manual/statistics) · [备份与迁移](/manual/data)。遇到具体故障按[排障](/reference/troubleshooting)检查；工具参数和系统授权见[工具参考](/reference/tools)与[权限范围](/reference/permissions)。
