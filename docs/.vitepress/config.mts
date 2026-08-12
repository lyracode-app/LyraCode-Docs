import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LyraCode Docs',
  description: 'Lyra Code 文档中心',
  lang: 'zh-CN',
  themeConfig: {
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