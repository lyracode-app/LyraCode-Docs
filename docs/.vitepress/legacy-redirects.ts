import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { SiteConfig } from 'vitepress'
import routes from './legacy-routes.json'

/** Keep published URLs usable without retaining the old Markdown or search entries. */
export async function writeLegacyRedirects(site: SiteConfig) {
  for (const [from, to] of Object.entries(routes)) {
    const prefixes = from.includes('/') ? ['', 'en/'] : ['']
    for (const prefix of prefixes) {
      const target = `${site.site.base}${prefix}${to}${to.endsWith('/') ? '' : '.html'}`
      const file = join(site.outDir, `${prefix}${from}.html`)
      const text = prefix ? 'This page has moved. Continue to the new page.' : '此页面已迁移，前往新版文档。'
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, `<!doctype html><html lang="${prefix ? 'en' : 'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lyra Code</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${target}"></head><body><p><a href="${target}">${text}</a></p></body></html>\n`)
    }
  }
}
