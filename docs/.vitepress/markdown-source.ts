import { readFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'

export function sourceMarkdown(file: string) {
  return readFileSync(file, 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/^<<<\s+(\S+)\s*$/gm, (_, include: string) => {
      const path = resolve(dirname(file), include)
      const language = ({ '.md': 'markdown', '.kt': 'kotlin' } as Record<string, string>)[extname(path)] || extname(path).slice(1)
      return `\n\`\`\`\`${language}\n${readFileSync(path, 'utf8').trimEnd()}\n\`\`\`\`\n`
    }).trim() + '\n'
}
