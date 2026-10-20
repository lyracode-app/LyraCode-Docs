import MarkdownIt from 'markdown-it'
import { releaseUrl } from './release-source.mjs'

const renderer = new MarkdownIt({ html: false, linkify: true })

function githubUrl(value, base, image = false) {
  try {
    const url = new URL(value, base)
    const allowed = url.hostname === 'github.com' || (image && url.hostname.endsWith('.githubusercontent.com'))
    return url.protocol === 'https:' && allowed && !url.username && !url.password ? url.href : null
  } catch { return null }
}

function prepare(tokens, base) {
  const links = []
  for (const token of tokens) {
    if (token.type === 'link_open') {
      const href = githubUrl(token.attrGet('href'), base)
      links.push(Boolean(href))
      if (href) {
        token.attrSet('href', href)
        token.attrSet('target', '_blank')
        token.attrSet('rel', 'noopener noreferrer')
      } else {
        token.tag = 'span'
        token.attrs = []
      }
    } else if (token.type === 'link_close' && !links.pop()) token.tag = 'span'
    else if (token.type === 'image') {
      const src = githubUrl(token.attrGet('src'), base, true)
      if (src) {
        token.attrSet('src', src)
        token.attrSet('loading', 'lazy')
      } else token.type = 'text'
    } else if (token.type === 'heading_open' || token.type === 'heading_close') {
      token.tag = `h${Math.min(Number(token.tag.slice(1)) + 3, 6)}`
    }
    if (token.children) prepare(token.children, base)
  }
}

export function renderReleaseNotes(release) {
  const source = typeof release.body === 'string' ? release.body.replace(/^[\u200B-\u200F\uFEFF]+/, '').trim() : ''
  if (!source) return ''
  const lines = source.split(/\r?\n/)
  if (/^#{1,6}\s/.test(lines[0]) && [release.tag_name, release.name].includes(lines[0].replace(/^#{1,6}\s+/, '').trim())) lines.shift()
  const tokens = renderer.parse(lines.join('\n'), {})
  prepare(tokens, releaseUrl(release))
  return renderer.renderer.render(tokens, renderer.options, {})
}
