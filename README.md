# LyraCode Docs

Lyra Code 文档中心，基于 [VitePress](https://vitepress.dev/) 构建。

## 在线访问

[GitHub Pages 在线文档](https://lyracode-app.github.io/LyraCode-Docs/)

## 本地开发

```bash
npm install
npm run docs:dev
```

## 构建

```bash
npm run docs:build
```

## 预览

```bash
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
│  ├─ .vitepress/
│  │  └─ config.mts    # 站点配置
│  ├─ index.md          # 首页
│  └─ guide/
│     └─ getting-started.md
├─ .gitignore
├─ package.json
└─ README.md