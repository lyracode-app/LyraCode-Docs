import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

const zhSidebar = [
  {
    text: '使用指南',
    items: [
      { text: '简介与安装', link: '/guide/01-简介与安装' },
      { text: '界面与模型', link: '/guide/02-界面与模型' },
      { text: 'Agent 工具', link: '/guide/03-Agent工具' },
      { text: '文件操作与命令执行', link: '/guide/04-文件与命令' },
      { text: '远程集成', link: '/guide/05-远程集成' },
      { text: '微型服务器与 Skills', link: '/guide/06-服务器与Skills' },
      { text: '记忆、定时任务与备份', link: '/guide/07-记忆任务与备份' },
      { text: '统计、诊断与多模态', link: '/guide/08-统计与多模态' },
      { text: '安全与排障', link: '/guide/09-安全与排障' },
      { text: '高级工作流与附录', link: '/guide/10-高级工作流与附录' }
    ]
  },
  {
    text: '工具参考',
    items: [
      { text: '文件与目录', link: '/reference/files' },
      { text: '命令执行', link: '/reference/commands' },
      { text: '下载与联网', link: '/reference/network' },
      { text: '远程集成', link: '/reference/remote' },
      { text: '系统与运维', link: '/reference/system' }
    ]
  },
  {
    text: '其他',
    items: [{ text: '更新日志', link: '/changelog' }]
  }
]

const enSidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Introduction & Setup', link: '/en/guide/01-intro' },
      { text: 'Interface & Models', link: '/en/guide/02-interface-models' },
      { text: 'Agent Tools', link: '/en/guide/03-agent-tools' },
      { text: 'Files & Commands', link: '/en/guide/04-files-commands' },
      { text: 'Remote Integrations', link: '/en/guide/05-remote' },
      { text: 'Mini Server & Skills', link: '/en/guide/06-server-skills' },
      { text: 'Memory, Tasks & Backup', link: '/en/guide/07-memory-tasks-backup' },
      { text: 'Stats, Diagnostics & Media', link: '/en/guide/08-stats-media' },
      { text: 'Security & Troubleshooting', link: '/en/guide/09-security-troubleshooting' },
      { text: 'Workflows & Appendix', link: '/en/guide/10-workflows-appendix' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Files & Directories', link: '/en/reference/files' },
      { text: 'Commands', link: '/en/reference/commands' },
      { text: 'Download & Web', link: '/en/reference/network' },
      { text: 'Remote', link: '/en/reference/remote' },
      { text: 'System & Ops', link: '/en/reference/system' }
    ]
  },
  {
    text: 'Other',
    items: [{ text: 'Changelog', link: '/en/changelog' }]
  }
]

export default defineConfig({
  // 部署到 GitHub Pages 时使用子路径 /LyraCode-Docs/（CI 通过 VITEPRESS_BASE 注入）
  base,
  appearance: 'light',
  title: 'Lyra Code 使用文档',
  description: '面向 Android 的本地 AI Agent 应用 · 详细使用指南',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/img/logo-256.png' }],
    ['meta', { name: 'theme-color', content: '#5b7cfa' }]
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/01-简介与安装' },
          { text: '更新日志', link: '/changelog' },
          {
            text: '语言',
            items: [
              { text: '简体中文', link: '/' },
              { text: 'English', link: '/en/' }
            ]
          }
        ],
        sidebar: zhSidebar,
        outline: { level: [2, 3], label: '本页目录' },
        footer: { message: 'AGPLv3-or-later', copyright: 'Lyra Code 使用文档' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新时间', formatOptions: { dateStyle: 'medium', timeStyle: 'short' } },
        editLink: { pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path', text: '在 GitHub 上编辑此页' },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部'
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/01-intro' },
          { text: 'Changelog', link: '/en/changelog' },
          {
            text: 'Language',
            items: [
              { text: '简体中文', link: '/' },
              { text: 'English', link: '/en/' }
            ]
          }
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: 'On this page' },
        footer: { message: 'AGPLv3-or-later', copyright: 'Lyra Code Documentation' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium', timeStyle: 'short' } },
        editLink: { pattern: 'https://github.com/lyracode-app/LyraCode-Docs/edit/main/docs/:path', text: 'Edit this page on GitHub' },
        darkModeSwitchLabel: 'Appearance',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Back to top'
      }
    }
  },
  themeConfig: {
    logo: '/img/logo-256.png',
    siteTitle: 'Lyra Code 使用文档',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          tokenize: (text: string) => {
            const words = text.split(/[\s，。；：！？、,.!?;:()（）"'“”‘’\/\\\-_]+/u).filter(Boolean)
            const chars = [...text].filter((c) => /[\u4e00-\u9fff]/.test(c))
            return [...words, ...chars]
          }
        },
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除',
                backButtonTitle: '返回',
                noResultsText: '未找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          },
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                displayDetails: 'Display details',
                resetButtonTitle: 'Reset',
                backButtonTitle: 'Back',
                noResultsText: 'No results found',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lyracode-app/LyraCode-Docs' }
    ]
  }
})