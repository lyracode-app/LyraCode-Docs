# 参考资料

需要实际操作步骤时看[使用手册](/manual/)，需要修改实现时看[开发指南](/developer/)。本区用于定位工具、权限和错误。

| 需要查询 | 页面 |
| --- | --- |
| 文件编辑、命令调用参数与结果 | [工具与参数速查](/reference/tools) |
| 某项功能需要什么权限、能访问哪些数据 | [权限与数据范围](/reference/permissions) |
| 模型失败、文件不可见、服务连不上 | [按现象排查问题](/reference/troubleshooting) |
| 版本差异 | [发布记录与文档范围](/changelog) |

## 事实来源

工具的最终参数以当前源码 `AgentToolSchemaFactory.kt` 及 PRoot 的 `DebianCommandToolDefinition.kt` 为准。模型可见工具还受配置、环境、会话作用域与关闭列表影响，页面列出名称不表示当前会话一定可用。

系统版本与构建参数以 `app/build.gradle.kts` 为准；权限以 Android 实际授予和工具报告为准；第三方接口以其当前返回为准。旧截图、模型文字说明、TODO 状态都不能替代实际结果。

源码位置总览见[架构](/developer/architecture)，文档更新规则见[维护文档站](/developer/documentation)。
