export function normalizeBase(value = '') {
  const path = value.replace(/^\/+|\/+$/g, '')
  return path ? `/${path}/` : '/'
}

// Check generated HTML against the deployment mount point, not just Markdown routes.
export function checkHtmlPaths(html, page, base, fileExists) {
  const errors = []
  const paths = new Set()
  for (const [, value] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) continue
    let url
    try { url = new URL(value, `https://build.invalid${base}${page}`) }
    catch { errors.push(`${page}: invalid URL ${value}`); continue }
    if (!url.pathname.startsWith(base)) {
      errors.push(`${page}: URL escapes deployment base ${base}: ${value}`)
      continue
    }
    let relative
    try { relative = decodeURIComponent(url.pathname.slice(base.length)) }
    catch { errors.push(`${page}: invalid encoded URL ${value}`); continue }
    const candidates = relative.endsWith('/') || !relative
      ? [`${relative}index.html`]
      : [relative, `${relative}.html`, `${relative}/index.html`]
    if (!candidates.some(fileExists)) errors.push(`${page}: missing deployed target ${value}`)
    paths.add(url.pathname)
  }
  return { errors, paths }
}
