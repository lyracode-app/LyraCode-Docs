import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { checkHtmlPaths, normalizeBase } from './build-paths.mjs'

const files = new Set(['index.html', 'assets/style.hash.css', 'assets/app.hash.js', 'img/logo.png', 'en/index.html', 'manual/index.html', 'manual/files.html'])
const exists = file => files.has(file)

test('base normalization supports custom domains and project Pages sites', () => {
  for (const input of [undefined, '', '/']) assert.equal(normalizeBase(input), '/')
  for (const input of ['LyraCode-Docs', '/LyraCode-Docs', '/LyraCode-Docs/']) assert.equal(normalizeBase(input), '/LyraCode-Docs/')
})

test('root-domain build resolves styles, scripts, images and nested navigation', () => {
  const html = '<link rel="stylesheet" href="/assets/style.hash.css"><script src="/assets/app.hash.js"></script><img src="/img/logo.png"><a href="../manual/files.html#edit">Files</a><a href="/en/">English</a>'
  assert.deepEqual(checkHtmlPaths(html, 'manual/index.html', '/', exists).errors, [])
})

test('repository-prefixed assets on a custom domain reproduce the deployed failure', () => {
  const html = '<link rel="stylesheet" href="/LyraCode-Docs/assets/style.hash.css"><img src="/LyraCode-Docs/img/logo.png">'
  const result = checkHtmlPaths(html, 'index.html', '/', exists)
  assert.equal(result.errors.length, 2)
  assert.match(result.errors[0], /missing deployed target/)
})

test('project-path builds accept their prefix and reject root-path leaks', () => {
  const html = '<link rel="stylesheet" href="/LyraCode-Docs/assets/style.hash.css"><a href="/LyraCode-Docs/manual/">Manual</a>'
  assert.deepEqual(checkHtmlPaths(html, 'index.html', '/LyraCode-Docs/', exists).errors, [])
  const result = checkHtmlPaths('<img src="/img/logo.png">', 'index.html', '/LyraCode-Docs/', exists)
  assert.match(result.errors[0], /escapes deployment base/)
})

test('deploy workflow derives the build path from configure-pages metadata', () => {
  const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8')
  assert.match(workflow, /id: pages\s+uses: actions\/configure-pages@/)
  assert.match(workflow, /VITEPRESS_BASE: \$\{\{ steps\.pages\.outputs\.base_path \}\}\//)
  assert.doesNotMatch(workflow, /VITEPRESS_BASE: \/LyraCode-Docs\//)
})
