# 维护文档站

目标：修改一个页面后，确保两种语言、导航、链接和示例仍然一致。以下命令在独立文档仓库执行，通常为应用下的 `vite_docs/`。

## 启动与构建

```sh
npm ci
npm run docs:dev
```

打开命令报告的地址；生产检查使用：

```sh
npm run docs:check
npm run docs:build
npm run docs:preview
```

`docs:build` 已包含结构检查。输出位于 `docs/.vitepress/dist/`。GitHub Pages 的子路径通过 `VITEPRESS_BASE` 注入；Windows 可这样构建：

```powershell
$env:VITEPRESS_BASE = '/LyraCode-Docs/'
npm run docs:build
Remove-Item Env:VITEPRESS_BASE
```

## 新增或修改页面

1. 在 `docs/manual`、`developer`、`examples` 或 `reference` 中选择合适分区。
2. 同步修改 `docs/en/` 下对应路径，不保留过期译文。
3. 新增页面时更新 `.vitepress/navigation.json`；侧边栏与语言切换共享这个清单。
4. 给出前置条件、操作步骤、可观察结果与排障方式。实现说明放在开发指南，参数放参考资料，避免重复维护。
5. 运行检查与构建，预览桌面和窄屏页面。

每页只使用一个一级标题。内部链接使用站点根路径，如 `/manual/models`，英文链接使用 `/en/manual/models`；图片和可下载示例放在 `docs/public/`，不把 `public` 写进 URL。VitePress 会在构建中处理部署 base。

主题默认使用深色阅读界面，导航、章节折叠、语言和主题切换由 `theme/components/DocsSidebar.vue` 管理，排版与配色在 `theme/custom.css` 中调整。正文首段后会自动加入 Markdown 复制、下载和源码入口，无需逐页插入组件；复制与下载内容会展开相对路径的 `<<<` 示例引用。

右侧页内目录由 `theme/components/PageOutline.vue` 自动读取正文标题，遵循 `outline` 的标题级别配置。屏幕内可见的标题会一起高亮，紫色引导线覆盖这些条目；向下滚动时星星移动到线底，向上时移动到线顶。子标题向右缩进，星星沿弯折路径移动。没有标题进入画面的长正文保留所在章节作为定位。点击文字或星星可跳到对应标题。

可见范围与方向判断位于 `theme/outline-state.mjs`，回归测试在 `scripts/outline.test.mjs`，随 `docs:check` 和生产构建执行。桌面三栏从 960px 页面宽度起显示，左栏宽 240px，右栏随宽度调整；更窄的屏幕使用顶部折叠目录。调整断点时同步检查左栏、正文和右栏，浏览器缩放后的页面宽度可能小于屏幕分辨率。

引导线以路径上的起点和长度实现移动、缩短与延长动画，与星星共享 `custom.css` 中的 `--outline-motion-duration` 和 `--outline-motion-easing`。默认过渡为 360ms；减少动态效果模式下，目录单独保留 180ms 的轻量过渡。调整时保持连线和星星的节奏一致，并检查连续滚动和换向。

## 示例维护

源文件位于 `docs/public/examples/`。页面通过 `<<<` 引用真实文件，避免复制出不一致的代码。修改源文件后运行 `npm run examples:pack` 重建 ZIP；示例地址与压缩包都要验证。

结构检查覆盖双语配对、导航覆盖、Markdown 站内链接、相对引用、JSON 与示例 JavaScript 语法。它不能证明 Android 权限、网络服务或桌宠 WebView 在真机正常；涉及运行行为时按相应步骤补充设备验证。

旧章节映射保存在 `.vitepress/legacy-routes.json`，生产构建结束时生成 66 个静态跳转页，不保留旧正文或加入搜索。改名时同步更新映射并检查部署子路径；旧地址跳转需要生产构建，开发模式仅提供新版路径。

## 发布

### 应用发布记录的自动同步

`changelog.md` 与英文页共用异步 `ReleaseNotes.vue`。组件挂载后通过 `release-source.mjs` 获取公开 GitHub Releases，每页十条，缓存五分钟；请求超时、接口限流或网络失败时保留已有缓存并提示，可重试或打开 GitHub。切换页面时取消未完成请求。发布说明保留原文，通过 `release-markdown.mjs` 转换，禁用原始 HTML 并约束链接；分页去重、缓存回退与渲染由 `scripts/releases.test.mjs` 覆盖。

此流程无需在构建期连接 GitHub，也无需为每次应用 Release 重新发布文档。文档正文仍随源码维护，不能将最新 Release 等同于所有文档内容的唯一基线。

### 部署文档站

`.github/workflows/deploy.yml` 在推送 main 或手动触发时使用 Node 20、`npm ci` 和生产构建部署到 GitHub Pages。仓库 Pages Source 应配置为 GitHub Actions。修改本地文件不等于已经发布；提交、推送和部署按仓库维护流程执行。

页面内容的事实来源与重建范围记录在文档仓库根目录的 `DOCUMENTATION_PLAN.md`。

## 分组导航的数据结构

`.vitepress/navigation.json` 是两种语言的共同清单。分区的 `items` 保存入口页；`groups` 按功能分组，组内 `items` 是 `[路由, 中文标题, 英文标题]`，例如：

```json
{
  "path": "manual",
  "zh": "使用手册",
  "en": "User manual",
  "items": [["index", "阅读路线", "Reading paths"]],
  "groups": [{
    "id": "services",
    "zh": "连接与服务",
    "en": "Connections and services",
    "items": [["mcp-server", "MCP 服务端", "MCP server"]]
  }]
}
```

`id` 在分区内唯一且保持稳定。分组只整理目录，不改变页面路由；拆分时保留原页面为聚焦入口，并将旧章节跳转映射到更具体的新页。

### 共享导航逻辑

`navigation.mjs` 的 `sectionItems` 为检查展开完整页面清单，`buildSidebar` 生成 VitePress 的分组侧栏，`expandedNavigationKeys` 确定当前页应展开的分区和组，`localizedPagePath` 为语言切换保留对应章节。自定义侧栏在打开深链接、搜索结果或切换语言后，自动展开当前组并标记当前页；用户还可独立折叠其他组。

### 维护与验证

在合适组新增双语路由；检查脚本验证组 ID、标题、完整页面覆盖和双语配对。`scripts/navigation.test.mjs` 检查所有组内深链接的自动展开以及两种语言的 VitePress 导航顺序。正文 JSON 和 JavaScript 代码块也做语法检查；教学 Kotlin 片段依赖宿主上下文，不在文档构建中编译。
