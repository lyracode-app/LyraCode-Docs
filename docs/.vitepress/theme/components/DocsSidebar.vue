<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import navigation from '../../navigation.json'
import { expandedNavigationKeys } from '../../navigation.mjs'
import DocIcon from './DocIcon.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const emit = defineEmits<{ collapse: [] }>()
const { page, lang, isDark } = useData()
const { close } = useSidebar()
const english = computed(() => lang.value.startsWith('en'))
const prefix = computed(() => english.value ? '/en' : '')
const opened = ref(new Set<string>())

watch(() => page.value.relativePath, path => {
  opened.value = new Set([...opened.value, ...expandedNavigationKeys(navigation, path)])
}, { immediate: true })

function href(section: string, path = 'index') {
  return withBase(`${prefix.value}/${section}/${path === 'index' ? '' : `${path}.html`}`)
}
function active(path: string) {
  return page.value.relativePath === `${english.value ? 'en/' : ''}${path}.md`
}
function toggle(section: string) {
  const next = new Set(opened.value)
  next.has(section) ? next.delete(section) : next.add(section)
  opened.value = next
}
function collapse() {
  if (window.matchMedia('(min-width: 960px)').matches) emit('collapse')
  else close()
}
function search() {
  // Reuse VitePress's single local-search instance and its keyboard handler.
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))
}
</script>

<template>
  <div class="docs-sidebar">
    <div class="docs-sidebar-header">
      <a class="docs-brand" :href="withBase(`${prefix}/`)">Lyra Code <span>{{ english ? 'Docs' : '文档' }}</span></a>
      <button class="docs-icon-button docs-collapse" type="button" :aria-label="english ? 'Collapse navigation' : '收起导航'" aria-controls="VPSidebarNav" aria-expanded="true" @click="collapse"><DocIcon name="panel" /></button>
    </div>
    <button class="docs-search" type="button" :aria-label="english ? 'Search documentation' : '搜索文档'" @click="search">
      <DocIcon name="search" :size="17" />
      <span>{{ english ? 'Search' : '搜索文档' }}</span>
      <span class="docs-search-keys" aria-hidden="true"><kbd>Ctrl</kbd><kbd>K</kbd></span>
    </button>

    <div class="docs-tree">
      <a class="docs-nav-link docs-overview" :href="withBase(`${prefix}/`)"><DocIcon name="book" /><span>{{ english ? 'Overview' : '文档首页' }}</span></a>
      <section v-for="section in navigation" :key="section.path" class="docs-nav-group">
        <div class="docs-group-row" :class="{ selected: active(`${section.path}/index`) }">
          <a class="docs-nav-link" :href="href(section.path)" :aria-current="active(`${section.path}/index`) ? 'page' : undefined"><DocIcon :name="section.path" /><span>{{ english ? section.en : section.zh }}</span></a>
          <button class="docs-icon-button docs-group-toggle" type="button" :aria-label="`${english ? 'Toggle' : '展开或收起'} ${english ? section.en : section.zh}`" :aria-expanded="opened.has(section.path)" :aria-controls="`docs-group-${section.path}`" @click="toggle(section.path)"><DocIcon name="chevron" :size="15" /></button>
        </div>
        <ul v-show="opened.has(section.path)" :id="`docs-group-${section.path}`" class="docs-children">
          <li v-for="[path, zh, en] in section.items.filter(item => item[0] !== 'index')" :key="path">
            <a :href="href(section.path, path)" :class="{ active: active(`${section.path}/${path}`) }" :aria-current="active(`${section.path}/${path}`) ? 'page' : undefined">{{ english ? en : zh }}</a>
          </li>
          <li v-for="group in section.groups ?? []" :key="group.id" class="docs-subgroup">
            <button class="docs-subgroup-toggle" type="button" :aria-expanded="opened.has(`${section.path}/${group.id}`)" :aria-controls="`docs-group-${section.path}-${group.id}`" @click="toggle(`${section.path}/${group.id}`)">
              <DocIcon name="chevron" :size="13" /><span>{{ english ? group.en : group.zh }}</span>
            </button>
            <ul v-show="opened.has(`${section.path}/${group.id}`)" :id="`docs-group-${section.path}-${group.id}`" class="docs-subgroup-items">
              <li v-for="[path, zh, en] in group.items" :key="path">
                <a :href="href(section.path, path)" :class="{ active: active(`${section.path}/${path}`) }" :aria-current="active(`${section.path}/${path}`) ? 'page' : undefined">{{ english ? en : zh }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <div class="docs-extra-links">
        <a class="docs-nav-link" :href="withBase(`${prefix}/download.html`)"><DocIcon name="download" /><span>{{ english ? 'Download' : '下载应用' }}</span></a>
        <a class="docs-nav-link" :href="withBase(`${prefix}/changelog.html`)"><DocIcon name="history" /><span>{{ english ? 'Release notes' : '发布记录' }}</span></a>
      </div>
    </div>

    <div class="docs-sidebar-footer">
      <div class="docs-language"><DocIcon name="globe" :size="16" /><LanguageSwitcher compact /></div>
      <div class="docs-theme-controls" role="group" :aria-label="english ? 'Appearance' : '外观'">
        <button class="docs-icon-button" :class="{ chosen: !isDark }" type="button" :aria-label="english ? 'Light theme' : '浅色主题'" :aria-pressed="!isDark" @click="isDark = false"><DocIcon name="sun" :size="16" /></button>
        <button class="docs-icon-button" :class="{ chosen: isDark }" type="button" :aria-label="english ? 'Dark theme' : '深色主题'" :aria-pressed="isDark" @click="isDark = true"><DocIcon name="moon" :size="16" /></button>
      </div>
    </div>
  </div>
</template>
