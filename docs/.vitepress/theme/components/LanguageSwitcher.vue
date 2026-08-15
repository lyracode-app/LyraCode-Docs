<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

withDefaults(defineProps<{ screen?: boolean }>(), { screen: false })

const { page, site, localeIndex, hash } = useData()

// 中英文共用同一套文件名/路径（章节、参考、更新日志等）的页面白名单；
// 命中则按当前页对应跳转，未命中（如仅中文存在的页面）回退到语言首页
const sharedPages = [
  'guide/intro',
  'guide/interface-models',
  'guide/agent-tools',
  'guide/files-commands',
  'guide/remote',
  'guide/server-skills',
  'guide/memory-tasks-backup',
  'guide/stats-media',
  'guide/security-troubleshooting',
  'guide/workflows-appendix',
  'guide/getting-started',
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
    <!-- 移动端：抽屉菜单内 -->
    <div v-if="screen" class="screen-wrapper" :class="{ open: isOpen }">
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

    <!-- 桌面端：导航栏下拉 -->
    <div
      v-else
      class="flyout"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
    >
      <button
        class="flyout-button"
        type="button"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        :aria-label="label"
        @click="isOpen = !isOpen"
        @blur="isOpen = false"
      >
        <span class="vpi-languages option-icon" />
        <span class="flyout-text">{{ label }}</span>
        <span class="vpi-chevron-down text-icon" />
      </button>

      <div class="menu">
        <div class="menu-card">
          <p class="menu-title">{{ label }}</p>
          <a v-for="item in links" :key="item.text" class="menu-link" :href="item.link">
            {{ item.text }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 桌面端下拉（参照默认主题 VPFlyout / VPMenu） ===== */
.flyout {
  position: relative;
}

.flyout:hover {
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.flyout:hover .flyout-text {
  color: var(--vp-c-text-2);
}

.flyout-button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  transition: color 0.5s;
}

.flyout-text {
  display: flex;
  align-items: center;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.option-icon {
  font-size: 16px;
}

.text-icon {
  margin-left: 4px;
  font-size: 14px;
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}

.flyout:hover .menu,
.flyout-button[aria-expanded='true'] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu-card {
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
}

.menu-title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.menu-link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color 0.25s, color 0.25s;
}

.menu-link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

/* ===== 移动端抽屉（参照默认主题 VPNavScreenTranslations） ===== */
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
