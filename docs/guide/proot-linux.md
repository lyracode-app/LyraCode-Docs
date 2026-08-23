---
title: PRoot Linux
---

# PRoot Linux——在手机里准备一个独立 Linux 环境

> 本章适合想在 Lyra Code 内直接使用 Debian、Ubuntu、Alpine 等命令行环境的用户。它不要求 Root，也不依赖 Termux。

## 先用一句话理解

PRoot Linux 会把一套 Linux 根文件系统保存在 Lyra Code 的应用私有目录中，并通过 PRoot 运行其中的命令。你可以把它理解成“装在 App 里面的 Linux 命令行工具箱”。

它不是虚拟机，也不会启动另一个 Linux 内核；程序仍然受到 Android 应用权限和 SELinux 的限制。PRoot 也不会让手机获得 Root 权限。

## 使用前检查

当前内置 PRoot 引擎只支持 **arm64-v8a（也叫 AArch64）** 设备。先打开 **设置 → 关于软件 → 手机信息**，查看 CPU 或 ABI：

- 看到 `arm64-v8a` 或 `aarch64`：可以继续；
- 只看到 `armeabi-v7a`、`x86` 或 `x86_64`：当前版本不能使用；
- 安装包很小是正常的：APK 只带 PRoot 引擎，不预装几百 MB 的 Linux 系统。

::: tip PRoot、Termux、Root 有什么区别？
- **PRoot Linux**：应用内独立 Linux 环境，适合安装 Linux 软件包、运行脚本；
- **Termux**：Android 上的独立终端 App，Lyra Code 的 `run_command` 通过它执行命令；
- **Root / Shizuku**：用于更高权限的 Android 系统操作，不是普通 Linux 软件环境。
:::

## 方法一：安装应用推荐的 Debian

这是新手最省心的方法。

1. 打开左上角菜单，进入 **设置**。
2. 在“模型与服务”分组找到 **PRoot Linux**。
3. 点击 **安装 Debian**。
4. 保持网络连接，等待下载、SHA-256 校验和解压全部完成。
5. 页面出现一个已启用的 Linux 环境后，记住它的“名称”和“Linux ID”。
6. 打开侧栏的 **终端**，选择这个 Linux 环境并连接。
7. 输入 `uname -m`，看到 `aarch64` 说明可以正常执行命令。

下载过程中不要强制结束 App。空间不足时，先到 **设置 → 缓存与存储** 查看占用，再清理不需要的数据。Linux 环境解压后通常会比下载包大很多，应预留至少数 GB 空间。

## 方法二：导入自己的 rootfs

rootfs 是 Linux 的“完整文件目录包”。Lyra Code 支持：

- arm64 / aarch64 架构；
- `.tar.gz`、`.tgz`；
- 未压缩的 `.tar`；
- 包内必须存在 `/bin/sh` 或 `/bin/bash`。

不支持 ISO 安装镜像，也不支持 amd64 / x86_64 包。当前不能直接导入 `.tar.xz` 或 `.tar.zst`，应先在其他设备解压成 `.tar`，或者寻找 gzip 版本。

### 去哪里找正确的包

- Alpine：下载页选择 **Mini root filesystem → aarch64 → tar.gz**；
- Ubuntu：选择名字类似 `ubuntu-base-版本-base-arm64.tar.gz` 的 Ubuntu Base；
- Arch Linux ARM：选择 ARMv8 / AArch64 通用 rootfs tar 包。

不要下载 Standard、Extended、Virtual 等 ISO，也不要把 Docker/OCI 镜像地址直接填进去。

### 导入步骤

1. 先把 rootfs 压缩包下载到手机。
2. 打开 **设置 → PRoot Linux**。
3. 点击 **导入 Linux**，在系统文件选择器中选中压缩包。
4. 输入一个容易辨认的显示名称，例如“Ubuntu 24.04”。
5. 点击导入并等待校验、解压完成。
6. 确认新环境已启用，再到 **终端** 页连接测试。

导入器会阻止压缩包越界写入，自动整理只有一层外包装目录的压缩包，并检查 ELF Shell 是否为 AArch64。若报“没有找到 shell”或“架构不兼容”，通常是压缩包类型选错。

## 在终端里使用

每个已启用环境都会成为“终端”页里的独立目标。连接后可以像普通 Linux 一样输入命令，例如：

```bash
pwd
cat /etc/os-release
apt update                 # Debian / Ubuntu
apk update                 # Alpine
```

终端会为每个 Linux ID 保留独立会话。禁用或删除某个环境时，对应终端连接会先关闭。

## 让 AI 执行 PRoot 命令

只要至少有一个环境处于启用状态，Agent 就会获得 `proot_command` 工具。你可以直接说：

> 在 Linux ID 为 debian 的环境里查看 Python 版本。如果没有 Python，只告诉我安装命令，先不要安装。

每次调用都会指定 Linux ID，多个环境不会混淆。命令默认在 `/root` 执行；选中了可直接访问的工作区时，工作区会挂载到 `/workspace`。

## Linux 里怎样访问手机文件

| Linux 路径 | 代表什么 | 使用条件 |
| --- | --- | --- |
| `/workspace` | 当前对话选择的工作区 | 工作区必须能被应用直接访问；仅文档提供器的 SAF 目录暂不能挂载 |
| `/storage` | Android 共享存储 | 需要“所有文件访问”权限 |
| `/sdcard` | 手机主存储的常用别名 | 需要“所有文件访问”权限 |
| `/root` | 当前 Linux 环境自己的用户目录 | 始终可用 |

授予或收回“所有文件访问”权限后，已经连接的终端不会自动重建挂载。请先断开，再重新连接。

::: warning 不等于拥有系统权限
即使能看到 `/storage`，PRoot 进程仍以 Lyra Code 的 Android UID 运行。它不能读取其他 App 的私有目录，也不能绕过 Android 权限和 SELinux。
:::

## 用文件管理器查看 Linux 文件

1. 打开侧栏 **文件**。
2. 点击右上角菜单。
3. 选择 **进入 PRoot Linux instances**。
4. 阅读风险提示，选择要查看的环境。

这里显示的是正在使用的真实 rootfs。直接改 `/etc`、`/bin`、`/usr` 等目录可能让环境无法启动。复制备份前应停止该环境的终端和命令；删除整个环境应回到 **设置 → PRoot Linux** 操作。

## 启用、禁用和删除

- **禁用**：不删除任何文件，只让环境暂时不出现在终端和 Agent 工具中；
- **重新启用**：原有软件、文件和配置仍在；
- **删除**：永久删除整个 rootfs、已安装软件和环境内文件，无法自动恢复。

应用升级不会覆盖 rootfs，但“清除应用数据”或卸载 App 会删除所有应用私有 Linux 环境。Android 云备份不会自动备份这些可能达到数 GB 的目录。

## 常见问题

### 提示设备不支持

确认手机 ABI 是 arm64-v8a。PRoot 不负责模拟其他 CPU，x86_64 和 32 位 ARM 都不能使用当前引擎。

### 导入 ISO 失败

ISO 是启动或安装光盘映像，不是 rootfs。改下 arm64 的 Mini root filesystem 或 Ubuntu Base tar.gz。

### `/workspace` 不存在

先在当前对话选择工作区。若工作区来自只提供文档接口的 SAF 目录，当前不能绑定挂载，可把项目复制到共享存储中的普通目录。

### `/storage` 看不到文件

到 **设置 → 应用权限** 授予共享存储访问权限，然后断开并重新连接终端。

### 软件安装后环境占用很大

这是正常现象。可以在 Linux 中清理包缓存，例如 Debian/Ubuntu 使用 `apt clean`。删除整个环境前先把 `/root` 或其他重要目录中的文件复制到共享存储。

### PRoot 适合部署长期服务吗

更适合开发、脚本和临时服务。Android 可能在后台回收进程，不能把它当成可靠的生产服务器。

---

*下一章建议阅读：[命令执行](/guide/commands)或[文件管理与代码编辑](/guide/files)*
