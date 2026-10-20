import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import './custom.css'
import DocsLayout from './components/DocsLayout.vue'
import ArticleActions from './components/ArticleActions.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: DocsLayout,
  enhanceApp({ app }) {
    app.component('ArticleActions', ArticleActions)
    app.component('ReleaseNotes', defineAsyncComponent(() => import('./components/ReleaseNotes.vue')))
  }
}

export default theme
