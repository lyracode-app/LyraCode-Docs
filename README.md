# Lyra Code 文档

面向用户的使用手册、面向应用贡献者的开发指南，以及附完整文件的实战示例。基于 VitePress，中文与英文使用相同路由结构。

## 本地运行

使用 Node.js 20 或满足当前依赖要求的版本，在此仓库根目录运行：

```sh
npm ci
npm run docs:dev
```

## 检查、构建与预览

```sh
npm run docs:check
npm run docs:build
npm run docs:preview
```

构建前自动检查导航覆盖、双语配对、站内链接、代码引用、示例 JSON/JavaScript 与 ZIP 同步情况。生产文件输出到 `docs/.vitepress/dist/`。这些静态检查不能替代 Android 设备操作与真实服务连接测试。

修改 `docs/public/examples/` 中的示例后运行 `npm run examples:pack` 重建下载包，随后再次检查与构建。

## 内容结构

```text
DOCUMENTATION_PLAN.md        重建方案、写作标准与事实来源
docs/
  index.md                  首页与读者入口
  download.md               安装、升级与发布渠道
  changelog.md              自动同步的 Release 列表、版本核对与文档范围
  manual/                   使用手册
  developer/                开发指南
  examples/                 操作流程与扩展示例
  reference/                工具、权限与排障
  en/                       对应英文页面
  public/examples/          完整示例源文件与 ZIP
  .vitepress/
    release-source.mjs      GitHub Release 请求、缓存、分页与安全链接
    release-markdown.mjs    发布说明 Markdown 渲染
    navigation.json         双语主题分组与页面清单
    navigation.mjs          页面展开、默认侧栏与当前组定位
    legacy-routes.json      旧章节到新章节的跳转映射
    config.mts              VitePress 配置
    theme/                  主题与组件
scripts/
  check-docs.mjs             内容和示例检查
  check-build.mjs            构建后检查资源和页面部署路径
  deployment.test.mjs        根域名与项目子路径回归
  navigation.test.mjs        分组深链接与语言导航回归
  releases.test.mjs          Release 缓存、回退、分页与 Markdown 回归
  pack-examples.mjs          无额外依赖的可重复 ZIP 打包
```

现有 59 组中英文页面，共 118 页。手册按六类功能分组，开发指南按工程架构、核心能力、扩展验证分组。文件、日志、统计、归档、对话分支、快捷手势、MCP 服务端和第三方账号均有独立入口。

新增页面时同时更新中文、英文和 `navigation.json`，放入合适的 `groups[].items`，保持组 ID 稳定。每个任务页说明前置条件、步骤、可观察结果和故障处理；开发页说明模块、接口、生命周期、钩子、失败处理与示例。正文 JSON/JavaScript 代码块参与语法检查；Kotlin 教学片段需在宿主上下文中编译。示例页面直接引用源文件，避免双份代码。

主题默认深色，使用固定左栏导航、淡紫色选中态和右侧目录。左栏支持章节折叠、搜索、双语与明暗切换；正文自动提供 Markdown 复制/下载与源码入口。主题组件位于 `docs/.vitepress/theme/components/`，排版与配色在 `custom.css` 中维护。

生产构建会为 66 个旧章节地址生成静态跳转页。旧正文已移除，旧链接仍可到达对应新章节；重命名时维护 `legacy-routes.json`。跳转仅在生产构建与预览中提供。

## 部署

发布记录页在浏览器访问时通过 GitHub Releases API 获取应用版本，每页十条，五分钟缓存，支持失败回退、重试与加载更多。新 Release 无需重新构建文档；发布说明保留仓库原文。实现参考应用仓库 `web/releases.js` 与 `web/changelog.js`，运行时模块与构建流程独立，构建不会请求 GitHub。

GitHub Actions 的 `.github/workflows/deploy.yml` 在推送 main 或手动运行时构建并部署。Pages Source 选择 GitHub Actions。工作流使用 `actions/configure-pages` 返回的 `base_path` 设置 `VITEPRESS_BASE`：自定义域名 `https://docs.lyracode.app/` 使用 `/`，默认项目站点才使用 `/LyraCode-Docs/`，不再写死仓库前缀。

Windows 本地模拟自定义域名的根路径：

```powershell
$env:VITEPRESS_BASE = '/'
npm run docs:build
npm run docs:preview
```

关闭预览后可用 `Remove-Item Env:VITEPRESS_BASE` 清除当前会话变量。只有模拟默认项目地址时才将该值改为 `/LyraCode-Docs/`。构建结束会自动运行 `docs:check-build`，检查生成 HTML 中的 CSS、JS、图片、页面与旧路由目标是否在对应部署路径下存在。

若线上只有文字且资源 404，先比较 HTML 中的资源前缀与实际站点路径。将修复提交推送到 main 触发新部署，不能只重新运行仍写死旧路径的历史提交。

## 仓库与许可

[文档网站](https://docs.lyracode.app/) · [应用源码](https://github.com/lyracode-app/Lyra-Code) · [文档源码](https://github.com/lyracode-app/LyraCode-Docs)

`vite_docs/` 是独立 Git 仓库。应用构建和文档构建在各自仓库根目录执行；文档修改不会自动提交或发布。

AGPLv3。第三方资源保留其各自许可证，分发应用时参见应用仓库的 `LICENSE` 与 `THIRD_PARTY_NOTICES.md`。
