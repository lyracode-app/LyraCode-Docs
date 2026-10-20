# 开发者入口与源码索引

本指南面向修改应用、开发扩展或维护文档的开发者。使用应用完成自己的项目，请从[使用手册](/manual/)开始。

## 工程与架构

### 理解结构

先[构建应用](/developer/build)，再阅读[架构与请求链路](/developer/architecture)和[模块职责与依赖](/developer/modules)。后者区分 Gradle 模块、源码集、UI、编排、Handler、数据和平台能力。

### 跟踪状态

[会话与请求生命周期](/developer/conversation-lifecycle)说明发送、工具循环、取消、继续与资源释放；[回调与作用域接口](/developer/hooks)列出签名、调用时机和编辑器接管示例；[数据模型与持久化](/developer/persistence)说明分支事务、归档、迁移和备份边界。

## 按功能选择实现文档

| 修改目标 | 对应文档 |
| --- | --- |
| 新增工具、参数、执行结果或审批 | [工具契约与接入](/developer/agent-tools) |
| 服务商、历史转换或流解析 | [协议与流式适配](/developer/providers) |
| URI、文件编辑、Linux 进程 | [工作区与运行时接口](/developer/workspaces) |
| 外部 MCP 或手机 MCP 服务 | [MCP 协议与接口](/developer/mcp) |
| 浏览器动作、快照或上传 | [网页桥接与状态同步](/developer/web-access) |
| Skill 发现与包加载 | [扩展机制](/developer/extensions) |
| 桌宠 JS、事件或卸载清理 | [桌宠生命周期钩子](/developer/pet-runtime) |
| 验证改动 | [测试与调试](/developer/testing) |
| 页面、导航、翻译与部署 | [文档站维护](/developer/documentation) |

## 两个仓库与命令位置

[应用源码](https://github.com/lyracode-app/Lyra-Code)包含 Android、运行时与测试；[文档源码](https://github.com/lyracode-app/LyraCode-Docs)包含 VitePress、共享导航与示例。文档通常位于应用目录下 `vite_docs/`，仍有独立 Git 历史。Gradle 在应用根目录执行，npm 在文档仓库执行。

本指南简写的 Kotlin 路径通常相对于 `app/src/main/java/com/yukisoffd/lyracode/`；PRoot 位于 `app/src/debianRuntime/`。包声明不总与物理目录一致。

## 示例与交付

各接口页会标明教学片段、宿主变量和可运行示例的区别。完整文件与下载包见[实战示例](/examples/)。提交时说明触发条件、行为、实际验证与未验证范围；UI、权限和运行环境需相应设备验证。

应用 README 的贡献规则接受组织成员 PR，加入请联系管理员。原创代码依据 AGPLv3，第三方组件保留各自许可，分发前查看 `LICENSE` 与 `THIRD_PARTY_NOTICES.md`。
