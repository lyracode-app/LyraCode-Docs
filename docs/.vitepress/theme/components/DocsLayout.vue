<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocsSidebar from './DocsSidebar.vue'
import DocIcon from './DocIcon.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import NumericLastUpdated from './NumericLastUpdated.vue'
import PageOutline from './PageOutline.vue'

const { frontmatter, lang } = useData()
const home = computed(() => frontmatter.value.layout === 'home')
const collapsed = ref(false)
</script>

<template>
  <DefaultTheme.Layout class="docs-shell" :class="{ 'is-home': home, 'sidebar-collapsed': collapsed }">
    <template #layout-top>
      <button v-if="collapsed && !home" class="docs-sidebar-reopen docs-icon-button" type="button" :aria-label="lang.startsWith('en') ? 'Expand navigation' : '展开导航'" aria-controls="VPSidebarNav" aria-expanded="false" @click="collapsed = false"><DocIcon name="panel" /></button>
    </template>
    <template #sidebar-nav-before><DocsSidebar @collapse="collapsed = true" /></template>
    <template #nav-bar-content-after><LanguageSwitcher /></template>
    <template #nav-screen-content-after><LanguageSwitcher screen /></template>
    <template #aside-outline-before><PageOutline /></template>
    <template #doc-footer-before><NumericLastUpdated /></template>
  </DefaultTheme.Layout>
</template>
