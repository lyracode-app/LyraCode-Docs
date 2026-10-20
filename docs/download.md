# 下载与安装

目标：安装 Lyra Code，并保留后续升级所需的数据。

## 获取安装包

从项目发布页选择适合设备的 APK，阅读该版本说明后下载。发布页未提供的构建或功能，不应以文档推断为已发布。

- [GitHub Releases](https://github.com/lyracode-app/Lyra-Code/releases)
- [Gitee Releases](https://gitee.com/yukisoffd/lyra-code/releases)

应用最低支持 Android 8.0（API 26）。模型接口通常需要网络、对应账号和可用额度；Linux rootfs 与项目依赖还需要额外存储空间。PRoot 支持情况取决于 APK 内运行时与设备架构的匹配。

## 安装和验证

1. 打开下载的 APK，按系统提示允许当前来源安装应用。
2. 启动应用，阅读首次使用说明。
3. 进入设置，添加模型配置并完成一次简短对话。
4. 按[快速上手](/manual/quick-start)验证工作区读写。

只授予当前功能需要的权限。普通聊天无需先开启无障碍、Shizuku 或 Root。相关对应关系见[权限表](/reference/permissions)。

## 更新与切换构建

同包名且签名兼容的更新通常可保留应用数据；安装失败时先检查包名、签名和系统版本。Debug 使用 `.debug` 包名后缀，Beta 使用 `.beta`，它们与正式版的数据目录独立。

升级或更换构建前先[导出备份](/manual/data)。卸载或清除应用数据会删除应用私有的聊天、配置和 Linux 环境。应用备份不包含完整 rootfs，也不替代项目文件备份。

如需自行构建，阅读[从源码构建](/developer/build)。应用原创代码依据 AGPLv3 开源；第三方组件遵循各自许可，详情见源码仓库的 [LICENSE](https://github.com/lyracode-app/Lyra-Code/blob/main/LICENSE) 与 [THIRD_PARTY_NOTICES.md](https://github.com/lyracode-app/Lyra-Code/blob/main/THIRD_PARTY_NOTICES.md)。
