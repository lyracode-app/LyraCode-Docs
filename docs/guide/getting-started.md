# 快速开始

欢迎使用 LyraCode Docs 文档中心！

## 本地开发

在项目根目录执行以下命令启动本地开发服务器：

```bash
npm run docs:dev
```

## 构建文档

执行以下命令生成静态文档：

```bash
npm run docs:build
```

## 预览构建结果

```bash
npm run docs:preview
```

## 添加文档

在 `docs` 目录下新建 Markdown 文件即可，例如：

```
docs/
├─ .vitepress/
│  └─ config.mts    # 站点配置
├─ index.md          # 首页
└─ guide/
   └─ getting-started.md  # 本页面
```

然后在 [`docs/.vitepress/config.mts`](/docs/.vitepress/config.mts) 中的 `sidebar` 配置里添加对应链接即可。