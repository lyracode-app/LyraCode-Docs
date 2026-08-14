import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import type { PageData, TransformPageContext } from 'vitepress'

/**
 * git 历史无法提供更新时间（新文件未跟踪/未提交）时，
 * 使用文件系统最后修改时间（mtime）作为兜底，
 * 确保所有页面的"最后更新于"都能正常显示。
 */
export async function transformPageData(
  pageData: PageData,
  ctx: TransformPageContext
): Promise<Partial<PageData>> {
  // lastUpdated 为 0 或 undefined 时（git 获取失败），尝试用 mtime 兜底
  if (!pageData.lastUpdated && pageData.filePath) {
    const file = resolve(ctx.siteConfig.srcDir, pageData.filePath)
    try {
      const stat = statSync(file)
      return {
        lastUpdated: Math.round(stat.mtimeMs),
      }
    } catch {
      // 忽略读取失败，保持原始值
    }
  }
  return {}
}