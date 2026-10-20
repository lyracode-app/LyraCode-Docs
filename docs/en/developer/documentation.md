# Maintain this documentation

Goal: keep languages, navigation, links and examples consistent after edits. Run commands in the independent documentation repository, often `vite_docs/` under the application checkout.

## Develop and build

```sh
npm ci
npm run docs:dev
```

Open the reported URL. Production verification:

```sh
npm run docs:check
npm run docs:build
npm run docs:preview
```

Build includes structural checks and outputs `docs/.vitepress/dist/`. GitHub Pages uses the `VITEPRESS_BASE` environment variable. On Windows:

```powershell
$env:VITEPRESS_BASE = '/LyraCode-Docs/'
npm run docs:build
Remove-Item Env:VITEPRESS_BASE
```

## Edit or add pages

1. Choose `manual`, `developer`, `examples` or `reference` based on the reader's purpose.
2. Update the matching path in `docs/en/` and Chinese source together.
3. Add new routes to `.vitepress/navigation.json`, shared by sidebars and language switching.
4. Include prerequisites, steps, observable results and failure handling. Keep implementation in the developer guide and parameters in reference.
5. Run checks/build, then preview desktop and narrow layouts.

Use one H1 per article. Internal links are site-root paths such as `/en/manual/models`. Images and downloads belong in `docs/public/`, without `public` in URLs. VitePress applies the deployment base during build.

The theme defaults to dark mode. `theme/components/DocsSidebar.vue` handles navigation, section folding, language and appearance; `theme/custom.css` defines layout and colors. Markdown copy, download and source actions are inserted after each article's lead automatically. Copy/download output expands relative `<<<` example includes into code blocks.

`theme/components/PageOutline.vue` reads article headings for the right outline and respects the configured `outline` levels. All headings visible in the viewport are highlighted, and the purple guide spans their outline entries. Scrolling down moves the star to the bottom of this guide; scrolling up moves it to the top. Nested headings are indented and the star follows the curved path. Long sections without a visible heading retain their current section as a navigation fallback. Links and the star jump to the corresponding headings.

`theme/outline-state.mjs` handles visible ranges and scroll direction. Regression tests in `scripts/outline.test.mjs` run with `docs:check` and production builds. The three-column layout starts at a 960px viewport, with a 240px left sidebar and a responsive right outline; narrower screens use the compact outline in the top navigation. Check all three columns when changing breakpoints: browser zoom can make the viewport narrower than the screen resolution.

The guide animates its start and length along the path to move, shrink and extend. It shares `--outline-motion-duration` and `--outline-motion-easing` in `custom.css` with the star. Transitions use 360ms by default; reduced-motion mode retains a shorter 180ms outline transition. Keep both timings aligned and check continuous scrolling and direction changes after edits.

## Examples

Source lives in `docs/public/examples/`. Pages include real files through `<<<` instead of maintaining duplicate code blocks. Run `npm run examples:pack` after changes to rebuild ZIPs, then verify both source links and archives.

Checks cover locale pairing, navigation, Markdown links, file includes, JSON and example JavaScript syntax. They do not establish Android permissions, remote-service availability or device WebView correctness; perform the relevant runtime checks separately.

`.vitepress/legacy-routes.json` maps old chapters to new destinations. Production builds generate 66 static redirects without retaining old text or search entries. Update mappings when renaming and verify the deployment base. Legacy redirects require a production build; development mode serves the new routes.

## Deployment

### Live application release history

Both changelog pages share the asynchronous `ReleaseNotes.vue`. After mounting, `release-source.mjs` fetches public GitHub Releases in pages of ten with a five-minute cache. Timeouts, rate limits and network failures can use marked cached data; users can retry or open GitHub. Pending requests are canceled when leaving the page. `release-markdown.mjs` renders original-language notes with raw HTML disabled and constrained links. `scripts/releases.test.mjs` covers caching, fallback, pagination and rendering.

Builds do not contact GitHub, and application releases need no documentation rebuild. Documentation still follows source development rather than one automatically selected release baseline.

### Deploy documentation

`.github/workflows/deploy.yml` uses Node 20, `npm ci` and production build for main pushes or manual dispatch. Configure the repository's Pages Source to GitHub Actions. Local edits do not publish the site; commit, push and deploy through the repository workflow.

The root `DOCUMENTATION_PLAN.md` records the rewrite structure, scope and evidence sources.

## Grouped navigation schema

`.vitepress/navigation.json` is shared across locales. Section `items` contain entry pages; `groups` organize features with `[route, Chinese title, English title]` entries:

```json
{
  "path": "manual",
  "zh": "使用手册",
  "en": "User manual",
  "items": [["index", "阅读路线", "Reading paths"]],
  "groups": [{
    "id": "services",
    "zh": "连接与服务",
    "en": "Connections and services",
    "items": [["mcp-server", "MCP 服务端", "MCP server"]]
  }]
}
```

Group IDs are stable and unique within a section. Grouping preserves page routes. When splitting content, retain the original page as a focused entry and point legacy routes to specific replacements.

### Shared helpers

`navigation.mjs` exposes `sectionItems` for coverage, `buildSidebar` for VitePress, `expandedNavigationKeys` for active groups and `localizedPagePath` for matching-page locale links. The custom sidebar opens the current section/group after deep links, search navigation and locale changes, while other groups remain independently collapsible.

### Maintenance and validation

Add bilingual routes to the appropriate group. Checks validate group IDs, labels, coverage and locale pairs. `scripts/navigation.test.mjs` covers expansion for all grouped deep links and locale-specific VitePress order. JSON and JavaScript fences are syntax-checked; teaching Kotlin fragments rely on host context and are not compiled by the docs build.
