<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import DocIcon from './DocIcon.vue'

const { page, lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const status = ref<'idle' | 'copied' | 'error'>('idle')
const menu = ref<HTMLDetailsElement>()
let timer: ReturnType<typeof setTimeout> | undefined
const markdown = computed(() => decodeURIComponent(String(page.value.frontmatter.sourceMarkdownEncoded || '')))
const sourceUrl = computed(() => `https://github.com/lyracode-app/LyraCode-Docs/blob/main/docs/${page.value.relativePath.split('/').map(encodeURIComponent).join('/')}`)

async function copy() {
  try {
    if (!markdown.value.trim()) throw new Error('Markdown is unavailable')
    await navigator.clipboard.writeText(markdown.value)
    status.value = 'copied'
  } catch { status.value = 'error' }
  clearTimeout(timer)
  timer = setTimeout(() => { status.value = 'idle' }, 2200)
}
function download() {
  const url = URL.createObjectURL(new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = page.value.relativePath.replace(/\//g, '-') || 'document.md'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  if (menu.value) menu.value.open = false
}
watch(() => page.value.relativePath, () => {
  clearTimeout(timer)
  status.value = 'idle'
  if (menu.value) menu.value.open = false
})
function dismiss(event: PointerEvent) {
  if (menu.value && !menu.value.contains(event.target as Node)) menu.value.open = false
}
onMounted(() => document.addEventListener('pointerdown', dismiss))
onBeforeUnmount(() => {
  clearTimeout(timer)
  document.removeEventListener('pointerdown', dismiss)
})
</script>

<template>
  <div class="article-actions" :aria-label="english ? 'Page actions' : '页面操作'">
    <button type="button" class="article-action" @click="copy"><DocIcon :name="status === 'copied' ? 'check' : 'copy'" :size="16" /><span aria-live="polite">{{ status === 'copied' ? (english ? 'Copied' : '已复制') : status === 'error' ? (english ? 'Copy failed' : '复制失败') : (english ? 'Copy Markdown' : '复制 Markdown') }}</span></button>
    <details ref="menu" class="article-open" @keydown.esc="menu && (menu.open = false)">
      <summary class="article-action">{{ english ? 'Open' : '打开' }}<DocIcon name="chevron" :size="13" /></summary>
      <div class="article-open-menu">
        <a :href="sourceUrl" target="_blank" rel="noopener noreferrer"><DocIcon name="external" :size="15" />{{ english ? 'View on GitHub' : '在 GitHub 查看' }}</a>
        <button type="button" @click="download"><DocIcon name="download" :size="15" />{{ english ? 'Download Markdown' : '下载 Markdown' }}</button>
      </div>
    </details>
  </div>
</template>
