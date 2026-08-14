import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PageData, TransformPageContext } from 'vitepress'

/**
 * 通过 git 记录获取每个页面的最后提交时间戳，
 * 确保"最后更新于"反映文档在 git 中的最后修改时间。
 * 当 git 无法提供时间（如新文件未提交/未跟踪）时，
 * 使用文件系统最后修改时间（mtime）作为兜底。
 */
export async function transformPageData(
  pageData: PageData,
  ctx: TransformPageContext
): Promise<Partial<PageData>> {
  if (!pageData.filePath) {
    return {}
  }

  const file = resolve(ctx.siteConfig.srcDir, pageData.filePath)
  const repoRoot = resolve(ctx.siteConfig.srcDir, '..')

  // 通过 git log 获取该文件的最后提交时间戳（秒，需转为毫秒）
  try {
    const result = execFileSync(
      'git',
      ['-C', repoRoot, 'log', '-1', '--format=%at', '--', file],
      { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
    )
    const timestamp = Number.parseInt(result.trim(), 10)
    if (Number.isFinite(timestamp) && timestamp > 0) {
      return { lastUpdated: timestamp * 1000 }
    }
  } catch {
    // git 获取失败（文件未提交等），继续使用兜底逻辑
  }

  // 使用文件系统最后修改时间（mtime）兜底
  try {
    const stat = statSync(file)
    return {
      lastUpdated: Math.round(stat.mtimeMs),
    }
  } catch {
    // 忽略读取失败，保持原始值
  }

  return {}
}
