import MarkdownIt from 'markdown-it'

export interface ReleaseNote {
  id: number
  tag: string
  name: string
  url: string
  publishedAt: string
  prerelease: boolean
  bodyHtml: string
}

export interface ReleaseNotesData {
  releases: ReleaseNote[]
  fetchedAt: string
  error: string
}

interface GitHubRelease {
  id: number
  tag_name: string
  name: string | null
  html_url: string
  published_at: string | null
  prerelease: boolean
  draft: boolean
  body: string | null
}

const releasesUrl = 'https://api.github.com/repos/lyracode-app/Lyra-Code/releases?per_page=100'

export default {
  async load(): Promise<ReleaseNotesData> {
    try {
      const response = await fetch(releasesUrl, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'LyraCode-Docs',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`)
      }

      const source = (await response.json()) as GitHubRelease[]
      const renderer = new MarkdownIt({ html: false, linkify: true, typographer: false })
      const releases = source
          .filter((release) => !release.draft && release.published_at)
          .map((release) => ({
            id: release.id,
            tag: release.tag_name,
            name: release.name?.trim() || release.tag_name,
            url: release.html_url,
            publishedAt: release.published_at!,
            prerelease: release.prerelease,
            bodyHtml: renderer.render(release.body?.trim() || ''),
          }))

      return {
        releases,
        fetchedAt: new Date().toISOString(),
        error: '',
      }
    } catch (error) {
      return {
        releases: [],
        fetchedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },
}
