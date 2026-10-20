# 工作区与运行时实现

目标：修改路径解析、文件编辑或 PRoot 行为时，保留各存储提供器的语义和安全边界。

## 工作区抽象

`workspace/WorkspaceManager.kt` 根据 URI 类型区分工作区：`content` 使用持久目录授权，`file` 使用共享存储包装，PRoot 使用专用 scheme 与 Linux ID。目录选择、显示名称和实际路径不能互相替代。

| 职责 | 主要文件（相对 Kotlin 包目录） |
| --- | --- |
| URI、目录授权与根节点 | `workspace/WorkspaceManager.kt`、`GrantedWorkspaceDirectory.kt` |
| 共享存储包装 | `workspace/SharedStorageWorkspace.kt` |
| PRoot 工作区和 guest/host 路径 | `workspace/ProotWorkspace.kt`、`ProotPathResolver.kt` |
| 文件操作与索引 | `workspace/NativeFileManager.kt`、`GlobalFileManager.kt`、`WorkspaceFileIndexer.kt` |
| Agent 修改与 Diff | `ai/agent/AgentFileToolHandler.kt`、`ai/AgentFileMutation.kt`、`ai/AgentTextEdits.kt` |

自定义 `DocumentFile` 实现在 `app/src/main/java/androidx/documentfile/provider/`。不能假定每个 `DocumentFile` 都有可绑定的真实路径。

## 路径与修改约束

工作区工具应接受相对路径并校验目标仍在根目录内。全局共享存储工具有单独的范围与受限目录；不要为了兼容路径而让普通工具直接接受任意绝对路径。

精确编辑应验证匹配次数，行范围使用 1 起始的闭区间。使用现有修改链路记录 before/after/Diff；写前读取的内容可能已被手动或其他任务改变，必须保留冲突检测和子代理写入协调。

## PRoot 生命周期

实现位于 `app/src/debianRuntime/java/.../debian/`：`ProotLinuxManager.kt` 管理实例与进程，`ProotArchitecture.kt` 识别运行时 ELF，`ProotCommandExecutor.kt` 和 `DebianCommandExecutor.kt` 处理调用。

实例 ID、rootfs 与启用状态分别维护。导入应在 staging 中完成归档路径和 shell/架构检查，再启用环境。rootfs 是用户数据，更新应用不能按种子版本覆盖。禁用或删除先关闭相应终端与保留进程。

前台超时只终止当前调用；背景服务需要保留对应 PRoot supervisor。后续命令不能顺手清理先前的服务。挂载取决于进程启动时权限，权限改变后需要重连。

## 验证范围

检查 SAF、共享路径、PRoot 内部目录三类工作区，以及 `..`、符号链接、缺失文件、权限撤回、文件被并发修改的失败行为。运行 `GrantedWorkspacePathTest`、`ProotPathResolverTest`、`ProotCommandPreparationTest`、`ProotArchitectureTest`，再用设备测试验证真实挂载和进程生命周期。

用户可观察的路径规则见[工作区手册](/manual/workspaces)。

## WorkspaceManager 接口

### 选择与解析

| 方法 | 契约 |
| --- | --- |
| `persistWorkspace(uri)` | 保存所选工作区与必要授权，返回保存的 URI 字符串 |
| `setActiveWorkspaceUri(uri)` | 切换当前活动引用；不替代新目录授权 |
| `activeWorkspaceUri()` / `rootUri()` | 返回引用或解析后的 URI |
| `root()` | 提供 DocumentFile 根节点，可能为空 |
| `prootLinuxId()` / `prootGuestPath()` | 读取 PRoot URI 的实例与内部路径 |
| `displayName()` / `displayPath()` | UI 展示，不可直接当执行路径 |
| `termuxRootPath()` / `termuxPath(relativePath)` | 尝试映射命令可见路径，不能保证总可用 |
| `searchFiles(query, limit)` / `invalidateFileIndex()` | 文件引用搜索与索引失效 |

### 只读示例

```kotlin
// 已有宿主对象中，在 IO 上读取，Result 失败保持为异常。
val content = withContext(Dispatchers.IO) {
    check(workspaceManager.root() != null) { "Select a workspace first" }
    nativeFileManager.readFile("README.md").getOrThrow()
}
```

路径工具应复用管理器，不根据展示路径手动拼接 Android 私有路径。修改后让文件索引失效，避免搜索仍返回旧条目。

## 文件修改与编辑器协作

读旧内容后计算精确修改，再进入 `AgentFileToolHandler` 的编辑器接管链。`NotHandled`、`Applied` 与失败返回分别控制回退、跳过重复写入或中止操作，见[钩子契约](/developer/hooks)。文件系统写入成功后生成 `FileDiff` 并发出修改通知，错误不能伪装成空 Diff 成功。

## 运行环境分层示例

共享目录只有 SAF URI 时，文件工具可以通过 DocumentFile 读写，但命令未必有真实路径可挂载。PRoot 内部项目则使用 Linux ID 与 guest path，不能把 host 私有根目录原样传给 Termux。

排查“编辑成功但构建读不到文件”时，同时记录工作区 URI、Linux ID、命令 `pwd` 和实际目标；先确认读的是同一份文件，再改变挂载或权限。
