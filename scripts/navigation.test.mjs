import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildSidebar, expandedNavigationKeys, localizedPagePath, sectionItems } from '../docs/.vitepress/navigation.mjs'

const navigation = JSON.parse(readFileSync(new URL('../docs/.vitepress/navigation.json', import.meta.url), 'utf8'))

test('locale switching preserves every page, including grouped routes', () => {
  const routes = ['download', 'changelog', ...navigation.flatMap(section => sectionItems(section).map(([route]) => `${section.path}/${route}`))]
  for (const route of routes) {
    for (const clean of [false, true]) {
      const suffix = clean ? '' : '.html'
      assert.equal(localizedPagePath(navigation, `${route}.md`, '/en/', clean), `/en/${route}${suffix}`)
      assert.equal(localizedPagePath(navigation, `en/${route}.md`, '/', clean), `/${route}${suffix}`)
    }
  }
  assert.equal(localizedPagePath(navigation, 'index.md', '/en/'), '/en/')
  assert.equal(localizedPagePath(navigation, 'en/index.md', '/'), '/')
  assert.equal(localizedPagePath(navigation, 'unknown.md', '/en/'), '/en/')
})

test('every grouped route opens its section and group in both locales', () => {
  for (const section of navigation) {
    for (const group of section.groups ?? []) {
      for (const [route] of group.items) {
        for (const prefix of ['', 'en/']) {
          assert.deepEqual(expandedNavigationKeys(navigation, `${prefix}${section.path}/${route}.md`), [section.path, `${section.path}/${group.id}`])
        }
      }
    }
  }
  assert.deepEqual(expandedNavigationKeys(navigation, 'index.md'), [])
  assert.deepEqual(expandedNavigationKeys(navigation, 'manual/index.md'), ['manual'])
})

test('both sidebars share route order and locale labels', () => {
  const flatten = items => items.flatMap(item => item.link ? [item.link] : flatten(item.items))
  for (const english of [false, true]) {
    const sidebar = buildSidebar(navigation, english)
    navigation.forEach((section, i) => {
      const prefix = `${english ? '/en' : ''}/${section.path}/`
      assert.deepEqual(flatten(sidebar[i].items), sectionItems(section).map(([route]) => prefix + (route === 'index' ? '' : route)))
      assert.equal(sidebar[i].text, english ? section.en : section.zh)
    })
  }
})
