---
layout: home
hero:
  name: Lyra Code
  text: 在 Android 上完成开发任务
  tagline: 从第一次对话，到工作区编辑、Linux 命令和应用扩展。
  image:
    src: /img/logo-256.png
    alt: Lyra Code
  actions:
    - theme: brand
      text: 开始使用
      link: /manual/quick-start
    - theme: alt
      text: 开发指南
      link: /developer/
    - theme: alt
      text: 运行一个示例
      link: /examples/
features:
  - title: 使用手册
    details: 配置模型、管理对话和文件、建立 Linux 环境、连接外部服务。
    link: /manual/
  - title: 开发指南
    details: 从源码构建，理解请求链路，新增工具、适配模型并验证改动。
    link: /developer/
  - title: 实战示例
    details: 静态网页、项目修复、Skill、MCP 和 API 2 桌宠，附完整示例文件。
    link: /examples/
  - title: 参考资料
    details: 按需查询工具参数、权限范围和故障处理步骤。
    link: /reference/
---

## 先完成一个小任务

1. [下载应用](/download)，添加一个可用的[模型服务商](/manual/models)。
2. 选择一个空目录作为[工作区](/manual/workspaces)。
3. 让 AI 新建并读回一个文件，再检查变更，完成[第一个任务](/manual/quick-start)。

需要运行构建或开发服务器时，再配置 [PRoot 或 Termux](/manual/commands)。仅对话、原生文件操作和静态预览无需安装 Termux。

## 找到你的入口

| 你想做什么 | 从这里开始 |
| --- | --- |
| 用手机修改项目并检查结果 | [工作区与文件编辑](/manual/workspaces) → [项目修复示例](/examples/project-repair) |
| 在手机上运行 Linux 工具链 | [PRoot、Termux 与命令](/manual/commands) |
| 在电脑浏览器中继续手机对话 | [预览项目与网页访问](/manual/local-services) |
| 编译或修改 Lyra Code 本身 | [源码构建](/developer/build) → [架构](/developer/architecture) |
| 开发技能、外部工具或桌宠 | [扩展机制](/developer/extensions) → [实战示例](/examples/) |

文档以当前源码的功能为依据。已安装版本的界面或工具不同，请结合[发布记录](/changelog)核对；排障从[问题索引](/reference/troubleshooting)开始。
