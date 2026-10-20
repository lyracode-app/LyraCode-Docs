<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import navigation from '../../navigation.json'
import { localizedPagePath } from '../../navigation.mjs'

withDefaults(defineProps<{ screen?: boolean; compact?: boolean }>(), { screen: false, compact: false })

const { page, site, localeIndex } = useData()

const links = computed(() => {
  return Object.entries(site.value.locales)
    .filter(([key]) => key !== localeIndex.value)
    .map(([key, meta]) => {
      const root = meta.link || (key === 'root' ? '/' : `/${key}/`)
      const path = localizedPagePath(navigation, page.value.relativePath, root, site.value.cleanUrls)
      return { text: meta.label, link: withBase(path) }
    })
})

const label = computed(() => site.value.locales[localeIndex.value]?.label || '')

const isOpen = ref(false)
</script>

<template>
  <div v-if="links.length" class="LanguageSwitcher" :class="{ 'is-compact': compact }">
    <div v-if="!screen" class="desktop-wrapper">
      <a v-for="item in links" :key="item.text" :href="item.link" :lang="localeIndex === 'en' ? 'zh-CN' : 'en'">{{ item.text }}</a>
    </div>
    <div v-else class="screen-wrapper" :class="{ open: isOpen }">
      <button class="screen-title" type="button" :aria-expanded="isOpen" @click="isOpen = !isOpen">
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
.is-compact .desktop-wrapper {
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
}
.desktop-wrapper {
  display: flex;
  align-items: center;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 767px) {
  .desktop-wrapper { display: none; }
}

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
