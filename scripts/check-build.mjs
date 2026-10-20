import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkHtmlPaths, normalizeBase } from './build-paths.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'docs/.vitepress/dist')
const base = normalizeBase(process.env.VITEPRESS_BASE)
if (!existsSync(join(dist, 'index.html'))) throw new Error('Build output is missing; run npm run docs:build first.')
const walk = (directory, prefix = '') => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const path = prefix + entry.name
  return entry.isDirectory() ? walk(join(directory, entry.name), `${path}/`) : [path]
})
const pages = walk(dist).filter(path => path.endsWith('.html'))
const errors = []
const paths = new Set()
const fileExists = path => existsSync(join(dist, path)) && statSync(join(dist, path)).isFile()
for (const page of pages) {
  const html = readFileSync(join(dist, page), 'utf8')
  if (existsSync(join(root, 'docs', page.replace(/\.html$/, '.md'))) && (html.match(/<h1\b/g) || []).length !== 1) {
    errors.push(`${page}: rendered Markdown page must have exactly one H1`)
  }
  const result = checkHtmlPaths(html, page, base, fileExists)
  errors.push(...result.errors)
  for (const path of result.paths) paths.add(path)
}
const home = readFileSync(join(dist, 'index.html'), 'utf8')
if (!/<link\b[^>]*rel="[^"]*stylesheet/.test(home)) errors.push('Homepage is missing a stylesheet link.')
if (errors.length) {
  console.error(errors.slice(0, 20).join('\n'))
  if (errors.length > 20) console.error(`... ${errors.length - 20} more deployment errors`)
  process.exitCode = 1
} else console.log(`Verified ${pages.length} built pages and ${paths.size} deployed paths under ${base}.`)
