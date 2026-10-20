# PRoot、Termux 与命令

目标：建立能运行开发工具的环境，并确认命令在哪里执行。应用内 PRoot 和外部 Termux 可以各自使用，也可以同时配置。

## 选择执行环境

| 环境 | Agent 工具 | 适合场景 |
| --- | --- | --- |
| 应用内 PRoot Linux | `proot_command`，必须指定 `linux_id` | 完整发行版用户空间、独立项目环境 |
| 外部 Termux | `run_command` | 复用 Termux 软件包、脚本与工作目录 |
| SSH 服务器 | `ssh_exec` | 在已配置的远程机器执行任务 |
| Shizuku / Root | `execute_shell_command` / `execute_root_command` | 需要对应系统能力的设备操作 |

普通项目开发优先使用 PRoot 或 Termux。PRoot 共享 Android 内核，进程使用 Lyra Code 的应用权限；它不提供虚拟机隔离或 Android Root 权限。

## 配置应用内 Linux

1. 打开“设置 > PRoot Linux”，下载内置入口提供的 Debian，或导入兼容的 rootfs。
2. 导入归档应为 tar、tar.gz 或 tgz，包含 `/bin/sh` 或 `/bin/bash`；ISO 不能直接导入，xz/zstd 需先解压为支持的格式。
3. rootfs 必须匹配实际运行时：当前源码包含 arm64-v8a 与 x86_64 引擎，不提供跨架构模拟。以界面和架构检查结果为准。
4. 启用环境，记下 Linux ID，在终端中选中它。每个环境有独立的持久终端会话。
5. 运行 `pwd` 和 `uname -m`，再检查项目目录。已选且可直接访问的工作区挂载到 `/workspace`；没有工作区时默认从 `/root` 开始。

在 PRoot 内部项目目录运行：

```sh
pwd
printf 'Linux shell is ready\n'
```

**成功标志：** 终端正常输出，Agent 调用同一个 Linux ID 也能看到预期项目文件。Debian 可用其包管理器安装开发依赖；导入其他发行版时使用对应包管理器。

授予“所有文件访问”后，共享存储可挂载到 `/storage`，主存储也可从 `/sdcard` 访问；已有终端需重连才能得到新的挂载。禁用/删除环境会停止该环境保留的进程；卸载或清除应用数据会删除 rootfs。

## 连接 Termux

先在 Termux 中运行一次：

```sh
mkdir -p ~/.termux
grep -qxF 'allow-external-apps=true' ~/.termux/termux.properties || printf '%s\n' 'allow-external-apps=true' >> ~/.termux/termux.properties
termux-reload-settings
```

随后在 Lyra Code 设置中授予 Termux `RUN_COMMAND` 权限。让 Agent 调用 `run_command` 执行 `pwd`，确认退出码为 0。此集成不要求 Termux:API；Termux 软件包和可见目录由其自身环境决定。

## 执行与后台服务

命令应明确工作目录、依赖和验收方式。交互式安装器、要求持续输入的命令不适合普通 Agent 调用。多行命令可使用 `command_lines`；前台超时默认 60 秒，上限 600 秒。

开发服务器或 watcher 使用 `background=true`，保存返回的输出文件与进程信息，再单独检查日志和端口。启动调用成功只说明已启动，服务健康仍需访问验证。Android 可能终止应用进程，后台服务不能保证永久运行。

完整调用示例见[工具参数](/reference/tools)，服务预览见[本地服务](/manual/local-services)。
