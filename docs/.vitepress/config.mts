import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  // 部署到 GitHub Pages 时使用子路径 /LyraCode-Docs/
  // 可通过环境变量 VITEPRESS_BASE 覆盖
  base,
  title: 'LyraCode Docs',
  description: 'Lyra Code 文档中心',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    editLink: {
      pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lyracode-app/LyraCode-Docs' }
    ]
  }
})