import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createReleaseSource, downloadUrl, mergeReleases, releaseUrl } from '../docs/.vitepress/release-source.mjs'
import { renderReleaseNotes } from '../docs/.vitepress/release-markdown.mjs'

const release = (id = 1, extra = {}) => ({ id, tag_name: `v${id}`, published_at: `2026-10-${String(id).padStart(2, '0')}T00:00:00Z`, ...extra })
const response = (payload, next = false) => ({ ok: true, json: async () => payload, headers: new Headers(next ? { Link: '<https://api.github.com/example?page=2>; rel="next"' } : {}) })
const memoryStorage = () => {
  const data = new Map()
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }
}

test('release requests coalesce, cache for five minutes and retain pagination', async () => {
  let calls = 0
  let time = 1000
  const source = createReleaseSource({ storage: memoryStorage(), now: () => time, fetcher: async url => {
    calls++
    assert.match(url, /per_page=10&page=1$/)
    return response([release()], true)
  } })
  const [first, second] = await Promise.all([source.page(1), source.page(1)])
  assert.equal(calls, 1)
  assert.equal(first, second)
  assert.equal(first.hasNext, true)
  time += 299999
  assert.equal((await source.page(1)).stale, false)
  assert.equal(calls, 1)
  time += 2
  await source.page(1)
  assert.equal(calls, 2)
})

test('forced refresh bypasses a fresh cache and failures return marked cached data', async () => {
  let fail = false
  let calls = 0
  const source = createReleaseSource({ storage: memoryStorage(), fetcher: async () => {
    calls++
    if (fail) throw new Error('offline')
    return response([release()])
  } })
  await source.page(1)
  fail = true
  assert.equal((await source.page(1, { force: true })).stale, true)
  fail = false
  assert.equal((await source.page(1, { force: true })).stale, false)
  assert.equal(calls, 3)
})

test('failed and malformed requests can retry without optional browser storage', async () => {
  let attempt = 0
  const source = createReleaseSource({ storage: { getItem() { throw Error('blocked') } }, fetcher: async () => {
    attempt++
    return attempt === 1 ? { ok: false, status: 429 } : attempt === 2 ? response({ unexpected: true }) : response([release()])
  } })
  await assert.rejects(source.page(1), /429/)
  await assert.rejects(source.page(1), /Invalid GitHub/)
  assert.equal((await source.page(1)).payload[0].id, 1)
  assert.throws(() => source.page(0), /Invalid release page/)
})

test('latest uses its own endpoint and validates its response', async () => {
  const source = createReleaseSource({ fetcher: async url => {
    assert.match(url, /\/releases\/latest$/)
    return response(release(2))
  } })
  assert.equal((await source.latest()).payload.tag_name, 'v2')
})

test('timeouts and disposal abort pending requests', async () => {
  const fetcher = (_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true }))
  const timed = createReleaseSource({ fetcher, timeoutMs: 5 })
  await assert.rejects(timed.page(1), /aborted/)
  const disposed = createReleaseSource({ fetcher })
  const request = disposed.page(1)
  disposed.dispose()
  await assert.rejects(request, /aborted/)
  await assert.rejects(disposed.page(2), /disposed/)
})

test('release merging filters drafts, deduplicates and orders published versions', () => {
  const merged = mergeReleases([release(1), release(2)], [release(2, { name: 'updated' }), release(3, { prerelease: true }), release(4, { draft: true })])
  assert.deepEqual(merged.map(value => value.id), [3, 2, 1])
  assert.equal(merged[1].name, 'updated')
})

test('release and APK links remain within the configured repository', () => {
  const item = release(1, { html_url: 'https://evil.example/release', assets: [
    { name: 'unsafe.apk', browser_download_url: 'https://evil.example/app.apk' },
    { name: 'app.apk', browser_download_url: 'https://github.com/lyracode-app/Lyra-Code/releases/download/v1/app.apk' }
  ] })
  assert.equal(releaseUrl(item), 'https://github.com/lyracode-app/Lyra-Code/releases/tag/v1')
  assert.match(downloadUrl(item), /^https:\/\/github.com\/lyracode-app\/Lyra-Code\/releases\/download\//)
  assert.equal(downloadUrl(release()), releaseUrl(release()))
})

test('Markdown escapes upstream HTML, restricts links and nests headings under releases', () => {
  const html = renderReleaseNotes(release(1, { body: '# v1\n\n## Fixed\n\n<script>alert(1)</script>\n\n[bad](https://evil.example) [issue](https://github.com/lyracode-app/Lyra-Code/issues/1)\n\n![alt](https://evil.example/x.png)' }))
  assert.doesNotMatch(html, /<script|<h[123][ >]|href="https:\/\/evil|src="https:\/\/evil/)
  assert.match(html, /<h5>Fixed<\/h5>/)
  assert.match(html, /<span>bad<\/span>/)
  assert.match(html, /rel="noopener noreferrer"/)
  assert.equal(renderReleaseNotes(release(1, { body: '' })), '')
})
