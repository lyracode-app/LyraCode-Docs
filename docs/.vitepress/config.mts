import { defineConfig } from 'vitepress'
import navigation from './navigation.json'
import { buildSidebar } from './navigation.mjs'
import { transformPageData } from './last-updated'
import { writeLegacyRedirects } from './legacy-redirects'
import { articleActions } from './article-actions'

const base = `/${(process.env.VITEPRESS_BASE || '').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
const sidebar = (english = false) => buildSidebar(navigation, english)
const nav = (english = false) => [
  ...navigation.map(section => ({
    text: english ? section.en : section.zh,
    link: `${english ? '/en' : ''}/${section.path}/`,
    activeMatch: `^${english ? '/en' : ''}/${section.path}/`
  })),
  { text: english ? 'Download' : '下载', link: `${english ? '/en' : ''}/download` }
]

export default defineConfig({
  base,
  transformPageData,
  buildEnd: writeLegacyRedirects,
  title: 'Lyra Code',
  description: '在 Android 上使用 AI 开发项目：使用手册、开发指南与完整示例',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: false,
  srcExclude: ['public/**'],
  appearance: { initialValue: 'dark', storageKey: 'lyra-docs-appearance' },
  markdown: { config: articleActions },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}img/logo-256.png` }],
    ['meta', { name: 'theme-color', content: '#111111' }]
  ],
  locales: {
    root: {
      label: '简体中文', lang: 'zh-CN', link: '/',
      themeConfig: {
        nav: nav(), sidebar: sidebar(),
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        editLink: { pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path', text: '编辑此页' },
        footer: { message: 'Lyra Code 保留所有权利。', copyright: '由 <a href="https://vitepress.dev/" target="_blank" rel="noopener noreferrer">VitePress</a> 提供技术支持。' },
        darkModeSwitchLabel: '切换主题', sidebarMenuLabel: '目录', returnToTopLabel: '回到顶部'
      }
    },
    en: {
      label: 'English', lang: 'en', link: '/en/',
      description: 'Build projects on Android with AI: user manual, developer guide and working examples',
      themeConfig: {
        nav: nav(true), sidebar: sidebar(true),
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        editLink: { pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path', text: 'Edit this page' },
        footer: { message: 'Lyra Code. All rights reserved.', copyright: 'Powered by <a href="https://vitepress.dev/" target="_blank" rel="noopener noreferrer">VitePress</a>.' },
        darkModeSwitchLabel: 'Appearance', sidebarMenuLabel: 'Contents', returnToTopLabel: 'Back to top'
      }
    }
  },
  themeConfig: {
    logo: '/img/logo-256.png', siteTitle: 'Lyra Code',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          tokenize: (text: string) => [
            ...text.split(/[\s，。；：！？、,.!?;:()（）"'“”‘’\/\\\-_]+/u).filter(Boolean),
            ...[...text].filter(char => /[\u4e00-\u9fff]/.test(char))
          ]
        },
        locales: {
          root: { translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: { displayDetails: '显示详情', resetButtonTitle: '清除', backButtonTitle: '返回', noResultsText: '未找到相关结果', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
          } }
        }
      }
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lyracode-app/Lyra-Code' }]
  }
})
