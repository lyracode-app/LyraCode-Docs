// Shared by both sidebars and structural checks.
export function sectionItems(section) {
  return [...section.items, ...(section.groups ?? []).flatMap(group => group.items)]
}

export function localizedPagePath(navigation, relativePath, targetRoot, cleanUrls = false) {
  const page = relativePath.replace(/^en\//, '').replace(/\.md$/, '')
  const shared = ['download', 'changelog', ...navigation.flatMap(section => sectionItems(section).map(([route]) => `${section.path}/${route}`))]
  return shared.includes(page) ? `${targetRoot.replace(/\/$/, '')}/${page}${cleanUrls ? '' : '.html'}` : targetRoot
}

export function expandedNavigationKeys(navigation, relativePath) {
  const path = relativePath.replace(/^en\//, '').replace(/\.md$/, '')
  const section = navigation.find(section => path.startsWith(`${section.path}/`))
  if (!section) return []
  const group = section.groups?.find(group => group.items.some(([route]) => path === `${section.path}/${route}`))
  return [section.path, ...(group ? [`${section.path}/${group.id}`] : [])]
}

export function buildSidebar(navigation, english = false) {
  return navigation.map(section => {
    const prefix = `${english ? '/en' : ''}/${section.path}/`
    const links = items => items.map(([path, zh, en]) => ({ text: english ? en : zh, link: prefix + (path === 'index' ? '' : path) }))
    return {
      text: english ? section.en : section.zh,
      collapsed: true,
      items: [...links(section.items), ...(section.groups ?? []).map(group => ({ text: english ? group.en : group.zh, collapsed: true, items: links(group.items) }))]
    }
  })
}
