export const repository = 'https://github.com/lyracode-app/Lyra-Code'
const api = 'https://api.github.com/repos/lyracode-app/Lyra-Code/releases'
const cacheLifetime = 5 * 60 * 1000

function validRelease(release) {
  return release && Number.isFinite(release.id) && typeof release.tag_name === 'string' && release.tag_name.trim()
}

function validPayload(suffix, payload) {
  return suffix.startsWith('?') ? Array.isArray(payload) && payload.every(validRelease) : validRelease(payload)
}

export function createReleaseSource({ fetcher = globalThis.fetch, storage, now = Date.now, timeoutMs = 12000 } = {}) {
  const requests = new Map()
  const controllers = new Set()
  let disposed = false

  function readCache(key, suffix) {
    try {
      const cached = JSON.parse(storage?.getItem(key) ?? 'null')
      return Number.isFinite(cached?.savedAt) && validPayload(suffix, cached?.data?.payload) ? cached : null
    } catch { return null }
  }

  async function request(suffix, force) {
    if (disposed) throw new Error('Release source disposed')
    const key = `lyra-docs-releases:${suffix}`
    const cached = readCache(key, suffix)
    const age = cached ? now() - cached.savedAt : Infinity
    if (!force && age >= 0 && age < cacheLifetime) return { ...cached.data, stale: false }
    const controller = new AbortController()
    controllers.add(controller)
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const response = await fetcher(`${api}${suffix}`, {
        headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal
      })
      if (!response.ok) throw new Error(`GitHub release request failed: ${response.status}`)
      const payload = await response.json()
      if (!validPayload(suffix, payload)) throw new Error('Invalid GitHub release response')
      const data = { payload, hasNext: /rel="next"/.test(response.headers.get('Link') || ''), stale: false }
      try { storage?.setItem(key, JSON.stringify({ savedAt: now(), data })) } catch { /* Storage is optional. */ }
      return data
    } catch (error) {
      if (!disposed && cached) return { ...cached.data, stale: true }
      throw error
    } finally {
      clearTimeout(timeout)
      controllers.delete(controller)
    }
  }

  function get(suffix, { force = false } = {}) {
    if (!requests.has(suffix)) {
      const pending = request(suffix, force).finally(() => requests.delete(suffix))
      requests.set(suffix, pending)
    }
    return requests.get(suffix)
  }

  return {
    latest: options => get('/latest', options),
    page(number, options) {
      if (!Number.isInteger(number) || number < 1) throw new Error('Invalid release page')
      return get(`?per_page=10&page=${number}`, options)
    },
    dispose() {
      disposed = true
      for (const controller of controllers) controller.abort()
      requests.clear()
    }
  }
}

export function repositoryUrl(url, fallback = `${repository}/releases/latest`) {
  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'https:' && parsed.origin === 'https://github.com' &&
        parsed.pathname.startsWith('/lyracode-app/Lyra-Code/') && !parsed.username && !parsed.password) return parsed.href
  } catch { /* Use a repository-owned fallback. */ }
  return fallback
}

export function releaseUrl(release) {
  return repositoryUrl(release.html_url, `${repository}/releases/tag/${encodeURIComponent(release.tag_name)}`)
}

export function downloadUrl(release) {
  const apk = Array.isArray(release.assets) ? release.assets.find(asset =>
    typeof asset.name === 'string' && /\.apk$/i.test(asset.name) && repositoryUrl(asset.browser_download_url, '')
  ) : null
  return apk ? repositoryUrl(apk.browser_download_url) : releaseUrl(release)
}

export function mergeReleases(existing, incoming) {
  return [...new Map([...existing, ...incoming].filter(release => !release.draft).map(release => [release.id, release])).values()]
    .sort((left, right) => (Date.parse(right.published_at) || 0) - (Date.parse(left.published_at) || 0))
}
