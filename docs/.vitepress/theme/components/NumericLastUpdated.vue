<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, lang } = useData()

const label = computed(() => lang.value.toLowerCase().startsWith('zh') ? '最后更新时间' : 'Last updated')
const isoDate = computed(() => {
  const value = page.value.lastUpdated
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
})
const displayDate = computed(() => {
  const value = page.value.lastUpdated
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
})
</script>

<template>
  <p v-if="displayDate" class="numeric-last-updated">
    {{ label }}：<time :datetime="isoDate">{{ displayDate }}</time>
  </p>
</template>
