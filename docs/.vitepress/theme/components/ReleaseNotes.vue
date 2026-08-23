<script setup lang="ts">
import { computed } from 'vue'
import { data } from '../../releases.data'

const props = withDefaults(defineProps<{ language?: 'zh' | 'en' }>(), {
  language: 'zh',
})

const text = computed(() => props.language === 'zh'
  ? {
      empty: '暂时无法获取发布记录。',
      official: '前往 GitHub 查看 Releases',
      prerelease: '预发布',
      fetched: '数据获取时间',
    }
  : {
      empty: 'Release notes are temporarily unavailable.',
      official: 'View Releases on GitHub',
      prerelease: 'Pre-release',
      fetched: 'Data fetched',
    })

function numericDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
</script>

<template>
  <div class="release-notes">
    <div v-if="data.releases.length === 0" class="release-notes-empty">
      <p>{{ text.empty }}</p>
      <a href="https://github.com/lyracode-app/Lyra-Code/releases" target="_blank" rel="noopener noreferrer">
        {{ text.official }}
      </a>
    </div>

    <article v-for="release in data.releases" :key="release.id" class="release-note">
      <h2>
        <a :href="release.url" target="_blank" rel="noopener noreferrer">{{ release.name }}</a>
        <code v-if="release.name !== release.tag" class="release-tag">{{ release.tag }}</code>
      </h2>
      <p class="release-meta">
        <time :datetime="release.publishedAt">{{ numericDate(release.publishedAt) }}</time>
        <span v-if="release.prerelease" class="release-prerelease">{{ text.prerelease }}</span>
      </p>
      <div v-if="release.bodyHtml" class="release-body" v-html="release.bodyHtml" />
    </article>

    <p v-if="data.releases.length" class="release-fetched">
      {{ text.fetched }}：{{ numericDate(data.fetchedAt) }}
    </p>
  </div>
</template>
