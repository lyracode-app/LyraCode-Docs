<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

// 阅读模式：文档页强制浅色（淡色阅读界面），隐藏主题切换按钮；离开页面恢复
const { page } = useData()

let prevDark = false

const isHome = (p?: string) => !p || p === 'index.md'

const apply = () => {
  const root = document.documentElement
  const home = isHome(page.value.relativePath)
  if (home) {
    root.classList.remove('read-mode')
    if (prevDark) root.classList.add('dark')
  } else {
    prevDark = root.classList.contains('dark')
    root.classList.remove('dark')
    root.classList.add('read-mode')
  }
}

onMounted(() => {
  apply()
  watch(() => page.value.relativePath, apply)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('read-mode')
})
</script>

<template>
  <div style="display: none" aria-hidden="true" />
</template>