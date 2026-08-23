import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import DownloadSection from './components/DownloadSection.vue'
import './custom.css'
import ScrollProgress from './components/ScrollProgress.vue'
import RevealOnScroll from './components/RevealOnScroll.vue'
import PageTitle from './components/PageTitle.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import NumericLastUpdated from './components/NumericLastUpdated.vue'
import ReleaseNotes from './components/ReleaseNotes.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => [h(ScrollProgress), h(RevealOnScroll)],
      'nav-screen-content-after': () => h(LanguageSwitcher, { screen: true }),
      'doc-before': () => h(PageTitle),
      'doc-footer-before': () => h(NumericLastUpdated)
    })
  },
  enhanceApp({ app }) {
    app.component('DownloadSection', DownloadSection)
    app.component('ReleaseNotes', ReleaseNotes)
  }
}

export default theme
