<script setup lang="ts">
import { ref, onMounted } from 'vue'

const GITHUB_API = 'https://api.github.com/repos/lyracode-app/Lyra-Code/releases/latest'
const GITEE_API = 'https://gitee.com/api/v5/repos/yukisoffd/lyra-code/releases/latest'

interface ReleaseAsset {
  name?: string
  size?: number
  browser_download_url?: string
}

interface ReleaseData {
  tag_name?: string
  assets?: ReleaseAsset[]
}

const loading = ref(true)
const version = ref('')
const githubUrl = ref('')
const giteeUrl = ref('')
const githubSize = ref('')
const giteeSize = ref('')
const fallback = ref(false)

function formatSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function findApk(assets?: ReleaseAsset[]): ReleaseAsset | null {
  if (!assets) return null
  return assets.find((a) => a.name && a.name.endsWith('.apk')) || null
}

async function fetchJson(url: string): Promise<ReleaseData | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

onMounted(async () => {
  const [gh, gitee] = await Promise.all([fetchJson(GITHUB_API), fetchJson(GITEE_API)])

  const ghApk = gh ? findApk(gh.assets) : null
  const giteeApk = gitee ? findApk(gitee.assets) : null

  version.value = (gh && gh.tag_name) || (gitee && gitee.tag_name) || ''
  githubUrl.value = ghApk?.browser_download_url || ''
  giteeUrl.value = giteeApk?.browser_download_url || ''
  githubSize.value = ghApk ? formatSize(ghApk.size) : ''
  giteeSize.value = giteeApk ? formatSize(giteeApk.size) : ''

  loading.value = false

  if (!githubUrl.value && !giteeUrl.value) {
    fallback.value = true
  }
})
</script>

<template>
  <div class="download-section">
    <div v-if="loading" class="download-loading">正在获取最新版本…</div>

    <div v-else class="download-buttons">
      <template v-if="!fallback">
        <a :href="githubUrl || 'https://github.com/lyracode-app/Lyra-Code/releases'" target="_blank" rel="noopener" class="dl-btn dl-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.679.919.679 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          GitHub 下载<template v-if="githubSize"> <span class="dl-size">{{ version }} · {{ githubSize }}</span></template>
        </a>
        <a :href="giteeUrl || 'https://gitee.com/yukisoffd/lyra-code/releases'" target="_blank" rel="noopener" class="dl-btn dl-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>
          Gitee 下载<template v-if="giteeSize"> <span class="dl-size">{{ version }} · {{ giteeSize }}</span></template>
        </a>
      </template>

      <template v-else>
        <a href="https://github.com/lyracode-app/Lyra-Code/releases" target="_blank" rel="noopener" class="dl-btn dl-primary">GitHub Releases</a>
        <a href="https://gitee.com/yukisoffd/lyra-code/releases" target="_blank" rel="noopener" class="dl-btn dl-secondary">Gitee Releases</a>
      </template>
    </div>

    <p v-if="!loading" class="download-note">
      <span v-if="version" class="download-version">最新版本：{{ version }}</span>
      <span>支持 Android 8.0（API 26）及以上版本</span>
    </p>
  </div>
</template>

<style scoped>
.download-section {
  margin: 1.5rem 0;
}

.download-loading {
  padding: 1rem 0;
  color: var(--vp-c-text-2);
}

.download-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.dl-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.dl-primary:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.dl-secondary {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
}

.dl-secondary:hover {
  border-color: var(--vp-c-text-3);
}

.dl-size {
  font-size: 12px;
  opacity: 0.75;
  font-weight: 400;
}

.download-note {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.download-version {
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .download-buttons {
    flex-direction: column;
    width: 100%;
  }

  .dl-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>