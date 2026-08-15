import { defineConfig } from 'vitepress'
import { transformPageData } from './last-updated'

const base = process.env.VITEPRESS_BASE || '/'

// 侧边栏：顶层分组默认折叠；主题子分组也可单独折叠，当前页面所在分组会自动展开
const zhSidebar = [
  {
    text: '使用指南',
    collapsed: true,
    items: [
      {
        text: '入门',
        collapsed: true,
        items: [
          { text: '简介与概念', link: '/guide/intro' },
          { text: '安装与配置', link: '/guide/install' },
          { text: '快速上手', link: '/guide/quick-start' }
        ]
      },
      {
        text: '界面与对话',
        collapsed: true,
        items: [
          { text: '界面总览', link: '/guide/interface' },
          { text: '对话操作', link: '/guide/chat' },
          { text: '对话管理', link: '/guide/chat-management' },
          { text: '多模态与内容渲染', link: '/guide/media' },
          { text: '个性化与主题', link: '/guide/personalization' }
        ]
      },
      {
        text: '模型配置',
        collapsed: true,
        items: [
          { text: '模型与多服务商', link: '/guide/models' },
          { text: '模型高级配置', link: '/guide/model-config' },
          { text: '子代理编排', link: '/guide/sub-agents' }
        ]
      },
      {
        text: 'Agent 能力',
        collapsed: true,
        items: [
          { text: 'Agent 工具', link: '/guide/agent-tools' },
          { text: '文件与代码编辑', link: '/guide/files' },
          { text: '命令执行', link: '/guide/commands' }
        ]
      },
      {
        text: '远程与网络',
        collapsed: true,
        items: [
          { text: '远程服务', link: '/guide/remote' },
          { text: 'MCP 接入', link: '/guide/mcp' }
        ]
      },
      {
        text: '本地服务与自动化',
        collapsed: true,
        items: [
          { text: '微型服务器', link: '/guide/mini-server' },
          { text: '定时任务与后台任务', link: '/guide/scheduled-tasks' }
        ]
      },
      {
        text: 'AI 能力扩展',
        collapsed: true,
        items: [
          { text: 'Skills 技能包', link: '/guide/skills' },
          { text: '记忆与指令', link: '/guide/memory' }
        ]
      },
      {
        text: '数据与统计',
        collapsed: true,
        items: [
          { text: '备份与迁移', link: '/guide/backup' },
          { text: '用量统计与设备诊断', link: '/guide/stats' }
        ]
      },
      {
        text: '安全与排障',
        collapsed: true,
        items: [
          { text: '安全实践', link: '/guide/security' },
          { text: '常见问题排查', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: '实战与附录',
        collapsed: true,
        items: [
          { text: '实战工作流', link: '/guide/workflows' },
          { text: '附录', link: '/guide/appendix' }
        ]
      }
    ]
  },
  {
    text: '工具参考',
    collapsed: true,
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
    collapsed: true,
    items: [{ text: '更新日志', link: '/changelog' }]
  }
]

const enSidebar = [
  {
    text: 'Guide',
    collapsed: true,
    items: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          { text: 'Introduction & Concepts', link: '/en/guide/intro' },
          { text: 'Installation & Setup', link: '/en/guide/install' },
          { text: 'Quick Start', link: '/en/guide/quick-start' }
        ]
      },
      {
        text: 'Interface & Chat',
        collapsed: true,
        items: [
          { text: 'Interface Overview', link: '/en/guide/interface' },
          { text: 'Chat Basics', link: '/en/guide/chat' },
          { text: 'Managing Conversations', link: '/en/guide/chat-management' },
          { text: 'Multimodal & Rendering', link: '/en/guide/media' },
          { text: 'Personalization & Themes', link: '/en/guide/personalization' }
        ]
      },
      {
        text: 'Model Setup',
        collapsed: true,
        items: [
          { text: 'Models & Providers', link: '/en/guide/models' },
          { text: 'Advanced Model Settings', link: '/en/guide/model-config' },
          { text: 'Sub-Agent Orchestration', link: '/en/guide/sub-agents' }
        ]
      },
      {
        text: 'Agent Capabilities',
        collapsed: true,
        items: [
          { text: 'Agent Tools', link: '/en/guide/agent-tools' },
          { text: 'Files & Code Editing', link: '/en/guide/files' },
          { text: 'Running Commands', link: '/en/guide/commands' }
        ]
      },
      {
        text: 'Remote & Network',
        collapsed: true,
        items: [
          { text: 'Remote Services', link: '/en/guide/remote' },
          { text: 'MCP', link: '/en/guide/mcp' }
        ]
      },
      {
        text: 'Local Services & Automation',
        collapsed: true,
        items: [
          { text: 'Mini Server', link: '/en/guide/mini-server' },
          { text: 'Scheduled & Background Tasks', link: '/en/guide/scheduled-tasks' }
        ]
      },
      {
        text: 'AI Extensions',
        collapsed: true,
        items: [
          { text: 'Skills', link: '/en/guide/skills' },
          { text: 'Memory & Instructions', link: '/en/guide/memory' }
        ]
      },
      {
        text: 'Data & Statistics',
        collapsed: true,
        items: [
          { text: 'Backup & Migration', link: '/en/guide/backup' },
          { text: 'Usage Stats & Device Diagnostics', link: '/en/guide/stats' }
        ]
      },
      {
        text: 'Security & Troubleshooting',
        collapsed: true,
        items: [
          { text: 'Security Practices', link: '/en/guide/security' },
          { text: 'Troubleshooting', link: '/en/guide/troubleshooting' }
        ]
      },
      {
        text: 'Workflows & Appendix',
        collapsed: true,
        items: [
          { text: 'Workflow Examples', link: '/en/guide/workflows' },
          { text: 'Appendix', link: '/en/guide/appendix' }
        ]
      }
    ]
  },
  {
    text: 'Reference',
    collapsed: true,
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
    collapsed: true,
    items: [{ text: 'Changelog', link: '/en/changelog' }]
  }
]

export default defineConfig({
  // 部署到 GitHub Pages 时使用子路径 /LyraCode-Docs/（CI 通过 VITEPRESS_BASE 注入）
  base,
  transformPageData,
  // 使用文件系统最后修改时间兜底各页"最后更新于"
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
          { text: '指南', link: '/guide/intro' },
          { text: '更新日志', link: '/changelog' }
        ],
        sidebar: zhSidebar,
        outline: { level: [2, 3], label: '本页目录' },
        footer: { message: 'AGPLv3', copyright: 'Lyra Code 使用文档' },
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
          { text: 'Guide', link: '/en/guide/intro' },
          { text: 'Changelog', link: '/en/changelog' }
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: 'On this page' },
        footer: { message: 'AGPLv3', copyright: 'Lyra Code Documentation' },
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