import DefaultTheme from 'vitepress/theme'
import DownloadSection from './components/DownloadSection.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DownloadSection', DownloadSection)
  },
} satisfies Theme