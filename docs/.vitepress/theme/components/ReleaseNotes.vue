<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { createReleaseSource, downloadUrl, mergeReleases, releaseUrl, repository } from '../../release-source.mjs'
import { renderReleaseNotes } from '../../release-markdown.mjs'

interface Release {
  id: number
  tag_name: string
  name?: string
  body?: string
  html_url?: string
  published_at?: string
  prerelease?: boolean
  draft?: boolean
  assets?: { name: string; browser_download_url: string }[]
}

const { lang } = useData()
const english = computed(() => lang.value.startsWith('en'))
const text = computed(() => english.value ? {
  loading: 'Loading release history…', error: 'Release history is unavailable. Retry or view it on GitHub.',
  empty: 'There are no published releases yet.', stale: 'Showing cached releases. Retry to fetch the latest records.',
  retry: 'Retry', more: 'Load more releases', latest: 'Latest stable', prerelease: 'Pre-release',
  official: 'View releases on GitHub', download: 'Download APK', details: 'View release',
  noNotes: 'No release notes were provided.', dateUnknown: 'Release date unavailable', versions: 'Loaded versions'
} : {
  loading: '正在加载版本记录…', error: '暂时无法获取版本记录，请重试或在 GitHub 查看。',
  empty: '暂时没有已发布的版本。', stale: '当前显示缓存的版本记录，可重试获取最新内容。',
  retry: '重试', more: '加载更多版本', latest: '最新稳定版', prerelease: '预发布',
  official: '在 GitHub 查看发布记录', download: '下载 APK', details: '查看版本',
  noNotes: '此版本未提供发布说明。', dateUnknown: '发布日期待定', versions: '已加载版本'
})
const items = ref<Release[]>([])
const rendered = computed(() => items.value.map(release => ({ ...release, bodyHtml: renderReleaseNotes(release) })))
const loading = ref(false)
const status = ref<'loading' | 'error' | 'empty' | 'stale' | ''>('loading')
const statusText = computed(() => loading.value ? text.value.loading : status.value ? text.value[status.value] : '')
const latestTag = ref('')
const nextPage = ref(1)
const hasNext = ref(false)
let source: ReturnType<typeof createReleaseSource> | undefined
let disposed = false

function numericDate(value?: string) {
  const date = new Date(value || '')
  return Number.isNaN(date.getTime()) ? text.value.dateUnknown :
    new Intl.DateTimeFormat(english.value ? 'en' : 'zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

async function loadPage(force = false) {
  if (!source || loading.value) return
  const page = force && status.value === 'stale' ? 1 : nextPage.value
  loading.value = true
  try {
    const [result, latest] = await Promise.all([
      source.page(page, { force }), source.latest({ force }).catch(() => null)
    ])
    if (disposed) return
    items.value = mergeReleases(page === 1 ? [] : items.value, result.payload)
    latestTag.value = latest?.payload.tag_name || items.value.find(release => !release.prerelease)?.tag_name || ''
    nextPage.value = page + 1
    hasNext.value = result.hasNext
    status.value = result.stale || latest?.stale ? 'stale' : items.value.length ? '' : 'empty'
  } catch {
    if (!disposed) status.value = 'error'
  } finally {
    if (!disposed) loading.value = false
  }
}

onMounted(() => {
  let storage: Storage | undefined
  try { storage = window.localStorage } catch { /* Cache is optional. */ }
  source = createReleaseSource({ storage })
  void loadPage()
})
onBeforeUnmount(() => { disposed = true; source?.dispose() })
</script>

<template>
  <section class="release-feed" :aria-label="text.versions">
    <p class="release-source"><a :href="`${repository}/releases`" target="_blank" rel="noopener noreferrer">{{ text.official }} ↗</a></p>
    <p v-if="statusText" role="status" aria-live="polite">{{ statusText }}</p>
    <button v-if="['error', 'stale'].includes(status)" class="release-button" type="button" :disabled="loading" @click="loadPage(true)">{{ text.retry }}</button>
    <nav v-if="rendered.length" class="release-versions" :aria-label="text.versions">
      <a v-for="release in rendered" :key="release.id" :href="`#release-${release.id}`">{{ release.tag_name }}</a>
    </nav>
    <div :aria-busy="loading">
      <article v-for="release in rendered" :id="`release-${release.id}`" :key="release.id" class="release-note">
        <header>
          <div>
            <h3><a :href="releaseUrl(release)" target="_blank" rel="noopener noreferrer">{{ release.tag_name }}</a></h3>
            <p v-if="release.name && release.name !== release.tag_name" class="release-name">{{ release.name }}</p>
            <p class="release-meta">
              <time :datetime="release.published_at">{{ numericDate(release.published_at) }}</time>
              <span v-if="release.prerelease" class="release-badge">{{ text.prerelease }}</span>
              <span v-else-if="release.tag_name === latestTag" class="release-badge">{{ text.latest }}</span>
            </p>
          </div>
          <a class="release-download" :href="downloadUrl(release)" target="_blank" rel="noopener noreferrer">{{ downloadUrl(release) === releaseUrl(release) ? text.details : text.download }} ↗</a>
        </header>
        <div v-if="release.bodyHtml" class="release-body" v-html="release.bodyHtml" />
        <p v-else>{{ text.noNotes }}</p>
      </article>
    </div>
    <button v-if="hasNext" class="release-button" type="button" :disabled="loading" @click="loadPage()">{{ loading ? text.loading : text.more }}</button>
  </section>
</template>

<style scoped>
.release-source { font-size: 14px; }
.release-versions { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 20px 0; font-size: 13px; }
.release-note { scroll-margin-top: 90px; margin: 24px 0; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 10px; }
.release-note header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.release-note h3 { margin: 0; overflow-wrap: anywhere; }
.release-note .release-name { margin: 6px 0; color: var(--vp-c-text-2); }
.release-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; color: var(--vp-c-text-2); font-size: 13px; }
.release-badge { padding: 2px 8px; border-radius: 5px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.release-download { flex-shrink: 0; font-size: 13px; }
.release-body { overflow-wrap: anywhere; }
.release-body :deep(h4), .release-body :deep(h5), .release-body :deep(h6) { margin: 24px 0 12px; font-size: 17px; }
.release-body :deep(img) { max-width: 100%; }
.release-button { padding: 8px 14px; border: 1px solid var(--vp-c-divider); border-radius: 7px; color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); cursor: pointer; }
.release-button:disabled { cursor: wait; opacity: .65; }
@media (max-width: 600px) {
  .release-note { padding: 16px; }
  .release-note header { flex-direction: column; gap: 4px; }
}
</style>
