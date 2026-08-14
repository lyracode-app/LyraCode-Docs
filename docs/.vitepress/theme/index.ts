import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'
import ParticlesBg from './components/ParticlesBg.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import GlobalStars from './components/GlobalStars.vue'
import RevealOnScroll from './components/RevealOnScroll.vue'
import PageTitle from './components/PageTitle.vue'
import ReadMode from './components/ReadMode.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ParticlesBg),
      'layout-top': () => [h(ScrollProgress), h(GlobalStars), h(RevealOnScroll), h(ReadMode)],
      'doc-before': () => h(PageTitle)
    })
  }
}

export default theme