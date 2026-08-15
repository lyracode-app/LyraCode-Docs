<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

withDefaults(defineProps<{ screen?: boolean }>(), { screen: false })

const { page, site, localeIndex, hash } = useData()

// 中英文共用同一套文件名/路径（章节、参考、更新日志等）的页面白名单；
// 命中则按当前页对应跳转，未命中（如仅中文存在的页面）回退到语言首页
const sharedPages = [
  'guide/intro',
  'guide/install',
  'guide/quick-start',
  'guide/interface',
  'guide/chat',
  'guide/chat-management',
  'guide/media',
  'guide/personalization',
  'guide/models',
  'guide/model-config',
  'guide/sub-agents',
  'guide/agent-tools',
  'guide/files',
  'guide/commands',
  'guide/remote',
  'guide/mcp',
  'guide/mini-server',
  'guide/scheduled-tasks',
  'guide/skills',
  'guide/memory',
  'guide/backup',
  'guide/stats',
  'guide/security',
  'guide/troubleshooting',
  'guide/workflows',
  'guide/appendix',
  'reference/files',
  'reference/commands',
  'reference/network',
  'reference/remote',
  'reference/system',
  'changelog'
]

const links = computed(() => {
  const rel = page.value.relativePath.replace(/\.md$/, '')
  // 去掉当前语言前缀，得到中英文通用的相对路径
  const base = localeIndex.value === 'en' ? rel.slice(3) : rel
  const shared = sharedPages.includes(base)
  return Object.entries(site.value.locales)
    .filter(([key]) => key !== localeIndex.value)
    .map(([key, meta]) => {
      const root = meta.link || (key === 'root' ? '/' : `/${key}/`)
      const path = shared
        ? root.replace(/\/$/, '') + '/' + base + (site.value.cleanUrls ? '' : '.html')
        : root
      return { text: meta.label, link: withBase(path) + hash.value }
    })
})

const label = computed(() => site.value.locales[localeIndex.value]?.label || '')

const isOpen = ref(false)
</script>

<template>
  <div v-if="links.length" class="LanguageSwitcher">
    <div class="screen-wrapper" :class="{ open: isOpen }">
      <button class="screen-title" type="button" @click="isOpen = !isOpen">
        <span class="vpi-languages icon lang" />
        {{ label }}
        <span class="vpi-chevron-down icon chevron" />
      </button>
      <ul class="screen-list">
        <li v-for="item in links" :key="item.text" class="screen-item">
          <a class="screen-link" :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* ===== 抽屉菜单（三点菜单）内语言切换（参照默认主题 VPNavScreenTranslations） ===== */
.screen-wrapper {
  height: 24px;
  overflow: hidden;
}

.screen-wrapper.open {
  height: auto;
}

.screen-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.icon {
  font-size: 16px;
}

.icon.lang {
  margin-right: 8px;
}

.icon.chevron {
  margin-left: 4px;
}

.screen-list {
  padding: 4px 0 0 24px;
}

.screen-link {
  line-height: 32px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
</style>
