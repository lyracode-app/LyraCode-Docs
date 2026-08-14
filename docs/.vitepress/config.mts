import { defineConfig } from 'vitepress'
import { transformPageData } from './last-updated'

export default defineConfig({
  title: 'Lyra Code',
  transformPageData,
  // 使用文件系统最后修改时间兜底各页"最后更新于"
  description: '面向 Android 的本地 AI Agent 应用文档',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/img/logo-256.png' }],
    ['meta', { name: 'theme-color', content: '#5b7cfa' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '下载', link: '/download' },
      { text: '构建', link: '/build' },
      { text: '安全', link: '/security' },
      {
        text: '资源',
        items: [
          { text: 'GitHub', link: 'https://github.com/lyracode-app/Lyra-Code' },
          { text: 'Gitee', link: 'https://gitee.com/yukisoffd/lyra-code' }
        ]
      }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '快速上手', link: '/guide/quick-start' },
          { text: '模型配置', link: '/guide/model-config' },
          { text: '对话', link: '/guide/chat' },
          { text: '对话管理', link: '/guide/chat-management' },
          { text: '个性化', link: '/guide/personalization' },
          { text: '通用功能', link: '/guide/general' },
          { text: '高级功能', link: '/guide/advanced' }
        ]
      },
      {
        text: '项目',
        items: [
          { text: '下载', link: '/download' },
          { text: '构建', link: '/build' },
          { text: '安全说明', link: '/security' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lyracode-app/Lyra-Code' }
    ],
    footer: {
      copyright: 'Copyright © 2026 Lyra Code'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    search: {
      provider: 'local'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部'
  }
})