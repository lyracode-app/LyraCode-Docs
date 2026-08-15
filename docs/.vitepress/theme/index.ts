import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import DownloadSection from './components/DownloadSection.vue'
import './custom.css'
import ScrollProgress from './components/ScrollProgress.vue'
import RevealOnScroll from './components/RevealOnScroll.vue'
import PageTitle from './components/PageTitle.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => [h(ScrollProgress), h(RevealOnScroll)],
      'nav-bar-content-after': () => h(LanguageSwitcher),
      'nav-screen-content-after': () => h(LanguageSwitcher, { screen: true }),
      'doc-before': () => h(PageTitle)
    })
  },
  enhanceApp({ app }) {
    app.component('DownloadSection', DownloadSection)
  }
}

export default theme