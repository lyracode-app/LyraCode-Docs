# LyraCode Docs

Lyra Code 文档中心，基于 [VitePress](https://vitepress.dev/) 构建。面向 Android 的本地 AI Agent 应用使用文档。

## 在线访问

[GitHub Pages 在线文档](https://lyracode-app.github.io/LyraCode-Docs/)

## 本地开发

```bash
npm install
npm run docs:dev
```

## 构建与预览

```bash
# 构建生产版本（输出到 docs/.vitepress/dist）
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

## 自动部署

项目已配置 [GitHub Actions](.github/workflows/deploy.yml) 自动构建并部署到 GitHub Pages：

- 每次推送 `main` 分支时自动触发构建与部署
- 也可在仓库 **Actions** 选项卡手动运行 `Deploy VitePress site to Pages` 工作流
- 部署完成后访问 `https://lyracode-app.github.io/LyraCode-Docs/`

> 首次部署前，需要在仓库 **Settings → Pages → Build and deployment** 中选择 **Source: GitHub Actions**。

## 项目结构

```
├─ docs/
│  ├─ .vitepress/              # VitePress 配置与主题
│  │  ├─ config.mts            # 站点配置（导航 / 侧边栏 / 搜索 / 多语言）
│  │  └─ theme/
│  │     ├─ index.ts           # 主题入口（全局组件注册）
│  │     ├─ custom.css         # 自定义主题样式与特效
│  │     └─ components/        # 自定义 Vue 组件
│  │        ├─ DownloadSection.vue   # 下载渠道卡片
│  │        ├─ GlobalStars.vue       # 全局星空背景
│  │        ├─ PageTitle.vue         # 页面渐变标题
│  │        ├─ ParticlesBg.vue       # hero 粒子背景
│  │        ├─ RevealOnScroll.vue    # 滚动淡入
│  │        └─ ScrollProgress.vue    # 顶部滚动进度条
│  ├─ public/                  # 静态资源（logo 与截图）
│  │  ├─ logo.png
│  │  ├─ img/
│  │  └─ …
│  ├─ index.md                 # 首页
│  ├─ download.md              # 下载页
│  ├─ build.md                 # 构建说明
│  ├─ security.md              # 安全说明
│  ├─ changelog.md             # 更新日志
│  ├─ faq.md                   # 常见问题
│  ├─ guide/                   # 使用指南
│  │  ├─ index.md
│  │  ├─ getting-started.md
│  │  ├─ quick-start.md
│  │  ├─ chat.md
│  │  ├─ chat-management.md
│  │  ├─ model-config.md
│  │  ├─ personalization.md
│  │  ├─ general.md
│  │  └─ advanced.md
│  └─ reference/               # 工具参考
│     ├─ files.md              # 文件与目录
│     ├─ commands.md           # 命令执行
│     ├─ network.md            # 下载与联网
│     ├─ remote.md             # 远程集成
│     └─ system.md             # 系统与运维
├─ .github/
│  └─ workflows/
│     └─ deploy.yml            # GitHub Pages 自动部署
├─ .gitignore
├─ package.json
└─ README.md
```

## 文档编辑

- 所有页面使用 Markdown 编写，支持 VitePress 扩展语法（容器、代码组等）；
- 侧边栏与导航在 `docs/.vitepress/config.mts` 中维护；
- 提交 PR 后 CI 会自动构建验证，成功后才允许合并。

## 许可证

[AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)
