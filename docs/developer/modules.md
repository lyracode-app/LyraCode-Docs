# 模块职责与依赖

本页用于定位改动应落在哪一层。先区分 Gradle 模块、源码集与 Kotlin 包：目录名不一定对应独立模块或包声明。

## 工程结构

```text
settings.gradle.kts
├─ :app                         Android 应用与平台集成
│  ├─ src/main/java/...          UI、Agent、数据、服务与设备能力
│  ├─ src/main/assets/           网页访问、图表、桌宠运行时资源
│  ├─ src/debianRuntime/         PRoot 实现与运行时资源
│  └─ src/test/                  本地回归测试
└─ :jlatexmath                  third_party/jlatexmath 公式库
vite_docs/                      独立 VitePress 文档仓库
```

`debianRuntime` 是应用源码集，不应在其他层重复实现 Linux 管理器；`ai/agent` 中部分文件声明 `com.yukisoffd.lyracode.ai` 包，新增 import 前查看文件声明。

## 应用内部职责

下表路径相对于 `app/src/main/java/com/yukisoffd/lyracode/`。

| 层/目录 | 输入与输出 | 修改时的边界 |
| --- | --- | --- |
| `ui/app/`、`ui/chat/`、`ui/settings/` | 用户事件 → 控制器调用；状态 → Compose | 不直接绕过工具执行链写文件 |
| `ChatController.kt` | 会话动作 → Job、Store 与 Agent；更新 → UI 状态 | 管理当前会话、等待器与状态回流 |
| `ai/agent/` | 历史和配置 → 模型请求 → 工具结果 | 协议解析与平台操作分别维护 |
| `data/`、`data/settings/` | 结构化记录、设置、备份 | 事务、版本迁移与秘密导出策略 |
| `workspace/` | URI/相对路径 → 文件与索引 | 统一解析、授权、冲突与变更记录 |
| `mcp/` | HTTP/JSON-RPC ↔ 工具定义与执行 | 客户端连接和本机服务端分别管理 |
| `webaccess/` | 浏览器动作 ↔ 同一个控制器 | 会话版本校验与状态同步 |
| `termux/`、`ssh/`、`system/` | 命令 → 平台执行结果 | 各执行环境的权限、进程与路径 |
| `interaction/` | 设备会话、感知、操作与悬浮 UI | 作用域工具和真实能力检查 |

## Handler 的分工

| 类 | 职责 |
| --- | --- |
| `AgentFileToolHandler` | 文件操作、Diff、编辑器协作和活动反馈 |
| `AgentRemoteToolHandler` | 远程服务工具操作 |
| `AgentKnowledgeToolHandler` | 记忆与知识相关操作 |
| `AgentAutomationToolHandler` | 自动化与任务操作 |
| `AgentConfigToolHandler` | 应用配置操作及配置变化通知 |

`OpenAiAgent` 完成编排、可用性/作用域/审批检查与分派。新增复杂行为先扩展对应 Handler，避免将 IO、UI 与协议判断集中到同一个分支。

## 示例：增加一种文件操作

1. 在 schema 中定义模型契约，明确工作区相对路径。
2. 在分派处复用检查，交给文件 Handler。
3. Handler 使用文件管理器解析路径和读写，接入编辑器钩子与 Diff。
4. 控制器接收更新，UI 展示结果；无需让 UI 自己再执行同一写入。

详细示例见[工具接入](/developer/agent-tools)，编辑回调见[钩子接口](/developer/hooks)。

## 依赖与资源释放

对象由 Activity/应用入口组装，控制器连接 Agent 回调；本机 MCP 通过 `attachAgent` 绑定执行器。增加服务时明确创建者、持有者、停止入口和 `close`/取消路径，避免销毁 UI 后仍保留监听、Socket 或等待器。请求级与会话级清理见[生命周期](/developer/conversation-lifecycle)。
