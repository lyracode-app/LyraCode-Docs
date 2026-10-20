import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, extname, join, posix, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { sectionItems } from '../docs/.vitepress/navigation.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docs = join(root, 'docs')
const navigation = JSON.parse(readFileSync(join(docs, '.vitepress/navigation.json'), 'utf8'))
const errors = []
const renderer = new MarkdownIt()

function walk(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.')) return []
    const path = prefix + entry.name
    return entry.isDirectory() ? walk(join(directory, entry.name), `${path}/`) : [path]
  })
}

const pages = walk(docs).filter(path => path.endsWith('.md') && !path.startsWith('public/'))
const expected = new Set(['index.md', 'download.md', 'changelog.md'])
for (const section of navigation) {
  const groupIds = new Set()
  for (const group of section.groups ?? []) {
    if (!group.id || groupIds.has(group.id) || !group.zh || !group.en || !group.items.length) errors.push(`Invalid navigation group: ${section.path}/${group.id}`)
    groupIds.add(group.id)
  }
  for (const [path, zh, en] of sectionItems(section)) {
    if (!zh || !en) errors.push(`Missing navigation label: ${section.path}/${path}`)
    const page = `${section.path}/${path}.md`
    if (expected.has(page)) errors.push(`Duplicate navigation route: ${page}`)
    expected.add(page)
  }
}
for (const path of [...expected]) expected.add(`en/${path}`)
for (const path of expected) if (!pages.includes(path)) errors.push(`Missing page: ${path}`)
for (const path of pages) if (!expected.has(path)) errors.push(`Page is absent from navigation: ${path}`)

const legacy = JSON.parse(readFileSync(join(docs, '.vitepress/legacy-routes.json'), 'utf8'))
let redirectCount = 0
for (const [from, to] of Object.entries(legacy)) {
  for (const prefix of from.includes('/') ? ['', 'en/'] : ['']) {
    if (/^\/|(?:^|\/)\.\.(?:\/|$)/.test(from) || expected.has(`${prefix}${from}.md`)) errors.push(`Invalid legacy route: ${from}`)
    const destination = `${prefix}${to}${to.endsWith('/') ? 'index.md' : '.md'}`
    if (!expected.has(destination)) errors.push(`Missing legacy destination: ${destination}`)
    redirectCount++
  }
}

function checkLink(page, href) {
  if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return
  let path
  try { path = decodeURIComponent(href.split(/[?#]/)[0]) } catch { errors.push(`${page}: invalid URL ${href}`); return }
  const relative = path.startsWith('/') ? path.slice(1) : posix.join(posix.dirname(page), path)
  const targets = [relative]
  if (!extname(relative)) targets.push(`${relative.replace(/\/$/, '')}.md`, posix.join(relative, 'index.md'))
  if (relative.endsWith('.html')) targets.push(relative.replace(/\.html$/, '.md'))
  const target = targets.find(item => existsSync(join(docs, item)) && (item.endsWith('.md') || extname(item)))
  if (target) {
    if (page.startsWith('en/') && target.endsWith('.md') && !target.startsWith('en/')) errors.push(`${page}: article link leaves English locale: ${href}`)
    return
  }
  if (!existsSync(join(docs, 'public', relative))) errors.push(`${page}: broken link ${href}`)
}

function tokens(page, values) {
  for (const token of values) {
    if (token.type === 'link_open') checkLink(page, token.attrGet('href'))
    if (token.type === 'image') checkLink(page, token.attrGet('src'))
    if (token.type === 'fence' && token.info.trim() === 'json') {
      try { JSON.parse(token.content) } catch (error) { errors.push(`${page}: invalid JSON block: ${error.message}`) }
    }
    if (token.type === 'fence' && /^(?:js|javascript)$/.test(token.info.trim())) {
      const result = spawnSync(process.execPath, ['--input-type=module', '--check'], { input: token.content, encoding: 'utf8' })
      if (result.status !== 0) errors.push(`${page}: invalid JavaScript block: ${result.stderr || result.error}`)
    }
    if (token.children) tokens(page, token.children)
  }
}

for (const page of pages) {
  const source = readFileSync(join(docs, page), 'utf8')
  const home = /(?:^|\n)layout: home\s*(?:\n|$)/.test(source)
  if (!home && (source.match(/^# /gm) || []).length !== 1) errors.push(`${page}: expected exactly one H1`)
  if (/待补充|coming soon/i.test(source)) errors.push(`${page}: unfinished placeholder`)
  tokens(page, renderer.parse(source, {}))
  for (const [, href] of source.matchAll(/^\s+(?:link|src):\s*(\/\S+)/gm)) checkLink(page, href)
  for (const [, include] of source.matchAll(/^<<<\s+(\S+)/gm)) {
    if (!existsSync(resolve(docs, dirname(page), include))) errors.push(`${page}: missing include ${include}`)
  }
}

for (const path of walk(join(docs, 'public/examples'))) {
  const file = join(docs, 'public/examples', path)
  if (path.endsWith('.json')) {
    try { JSON.parse(readFileSync(file, 'utf8')) } catch (error) { errors.push(`${path}: ${error.message}`) }
  }
  if (path.endsWith('.js')) {
    const result = spawnSync(process.execPath, ['--input-type=module', '--check'], { input: readFileSync(file), encoding: 'utf8' })
    if (result.status !== 0) errors.push(`${path}: ${result.stderr || result.error}`)
  }
}

const pet = JSON.parse(readFileSync(join(docs, 'public/examples/status-orb/manifest.json'), 'utf8'))
if (pet.apiVersion !== 2 || !['id', 'name', 'version', 'author', 'entry'].every(key => typeof pet[key] === 'string' && pet[key])) errors.push('Invalid pet manifest')
for (const key of ['entry', 'config']) {
  if (pet[key] && !existsSync(join(docs, 'public/examples/status-orb', pet[key]))) errors.push(`Pet ${key} is missing`)
}

const packed = spawnSync(process.execPath, [join(root, 'scripts/pack-examples.mjs'), '--check'], { encoding: 'utf8' })
if (packed.status !== 0) errors.push(packed.stderr || packed.error?.message || 'Archive validation failed')

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else console.log(`Verified ${pages.length} pages, ${expected.size / 2} locale pairs, ${redirectCount} legacy redirects, navigation, links, includes and examples.`)
