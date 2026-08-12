# LyraCode Docs

Lyra Code 文档中心，基于 [VitePress](https://vitepress.dev/) 构建。

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