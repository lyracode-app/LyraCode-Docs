<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import { getOutlineRange, getScrollDirection } from '../outline-state.mjs'

type Heading = { id: string; title: string; depth: number; element: HTMLElement }
type Point = { x: number; top: number; bottom: number }
type Distance = { start: number; end: number }

const { frontmatter, theme, lang } = useData()
const headings = shallowRef<Heading[]>([])
const list = ref<HTMLOListElement>()
const track = ref<SVGPathElement>()
const visibleIndices = shallowRef<number[]>([])
const direction = ref<'up' | 'down'>('down')
const points = ref<Point[]>([])
const distances = shallowRef<Distance[]>([])
const trackLength = ref(0)
const height = ref(0)
const outline = computed(() => frontmatter.value.outline ?? theme.value.outline)
const label = computed(() => outline.value?.label || (lang.value.startsWith('en') ? 'On this page' : '本页目录'))
const first = computed(() => visibleIndices.value[0] ?? -1)
const last = computed(() => visibleIndices.value.at(-1) ?? -1)
const markerIndex = computed(() => direction.value === 'up' ? first.value : last.value)
const markerHeading = computed(() => headings.value[markerIndex.value])
const railWidth = computed(() => Math.max(20, ...points.value.map(point => point.x + 8)))
const rail = computed(() => {
  if (!points.value.length) return ''
  let path = `M ${points.value[0].x} ${points.value[0].top}`
  points.value.forEach((point, index) => {
    const previous = points.value[index - 1]
    if (previous) {
      const middle = (previous.bottom + point.top) / 2
      path += previous.x === point.x
        ? ` L ${point.x} ${point.top}`
        : ` C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.top}`
    }
    path += ` L ${point.x} ${point.bottom}`
  })
  return path
})
const highlight = computed(() => {
  const start = distances.value[first.value]?.start
  const end = distances.value[last.value]?.end
  const visible = start !== undefined && end !== undefined
  // Animate the start and length along the same curve used by the star. With
  // matching timing, extending or shortening the guide keeps its ends aligned.
  return {
    strokeDasharray: `${visible ? Math.max(0, end - start) : 0}px ${trackLength.value + 1}px`,
    strokeDashoffset: `${visible ? -start : 0}px`,
    opacity: visible ? 1 : 0
  }
})
const markerStyle = computed(() => {
  const segment = distances.value[markerIndex.value]
  return {
    offsetPath: `path("${rail.value}")`,
    offsetDistance: `${segment ? direction.value === 'up' ? segment.start : segment.end : 0}px`
  }
})
const markerLabel = computed(() => {
  const edge = direction.value === 'up' ? 'start' : 'end'
  return lang.value.startsWith('en')
    ? `Jump to ${edge} of visible headings: ${markerHeading.value?.title}`
    : `跳到可见标题${edge === 'start' ? '起点' : '终点'}：${markerHeading.value?.title}`
})

let frame = 0
let observer: ResizeObserver | undefined
let article: HTMLElement | null = null
let previousY = 0
let measurement = 0

async function measure() {
  if (!list.value) return
  const revision = ++measurement
  const bounds = list.value.getBoundingClientRect()
  height.value = bounds.height
  points.value = Array.from(list.value.querySelectorAll<HTMLAnchorElement>('.page-outline-link')).map((link, index) => {
    const row = link.getBoundingClientRect()
    const style = getComputedStyle(link)
    return {
      x: 10 + headings.value[index].depth * 12,
      top: row.top - bounds.top + parseFloat(style.paddingTop),
      bottom: row.bottom - bounds.top - parseFloat(style.paddingBottom)
    }
  })
  await nextTick()
  if (revision !== measurement || !track.value || !points.value.length) return
  const path = track.value
  const length = path.getTotalLength()
  trackLength.value = length
  // The path always progresses downwards, so binary search maps row bounds to
  // arc lengths. CSS motion-path then carries the star around every curve.
  const distanceAt = (y: number) => {
    let low = 0
    let high = length
    for (let step = 0; step < 20; step++) {
      const middle = (low + high) / 2
      if (path.getPointAtLength(middle).y < y) low = middle
      else high = middle
    }
    return (low + high) / 2
  }
  distances.value = points.value.map(point => ({ start: distanceAt(point.top), end: distanceAt(point.bottom) }))
}

function updateActive() {
  frame = 0
  direction.value = getScrollDirection(previousY, window.scrollY, direction.value)
  previousY = window.scrollY
  visibleIndices.value = getOutlineRange(
    headings.value.map(heading => heading.element.getBoundingClientRect()), 0, window.innerHeight
  )
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateActive)
}

async function collectHeadings() {
  await nextTick()
  const setting = outline.value
  const range = (typeof setting === 'object' && !Array.isArray(setting) ? setting.level : setting) || 2
  const [min, max] = typeof range === 'number' ? [range, range] : range === 'deep' ? [2, 6] : range
  const collected: Heading[] = []
  const parents: number[] = []
  let ignoredLevel = 7
  if (setting !== false) {
    document.querySelectorAll<HTMLElement>('.VPDoc .vp-doc :is(h1,h2,h3,h4,h5,h6)[id]').forEach(element => {
      const level = Number(element.tagName[1])
      if (level <= ignoredLevel) ignoredLevel = 7
      if (element.classList.contains('ignore-header')) ignoredLevel = level
      if (level >= ignoredLevel || level < min || level > max) return
      while (parents.length && parents[parents.length - 1] >= level) parents.pop()
      const copy = element.cloneNode(true) as HTMLElement
      copy.querySelectorAll('.header-anchor, .VPBadge, .footnote-ref, .ignore-header').forEach(node => node.remove())
      collected.push({ id: element.id, title: copy.textContent?.trim() || '', depth: parents.length, element })
      parents.push(level)
    })
  }
  headings.value = collected
  distances.value = []
  direction.value = 'down'
  previousY = window.scrollY
  if (article) observer?.unobserve(article)
  article = document.querySelector('.VPDoc .vp-doc')
  if (article) observer?.observe(article)
  await nextTick()
  await measure()
  updateActive()
}

function focusHeading(heading: Heading) {
  // VitePress handles the hash and scrolling; keep keyboard focus at the destination.
  heading.element.focus({ preventScroll: true })
}

onContentUpdated(collectHeadings)
onMounted(() => {
  collectHeadings()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
  observer = new ResizeObserver(entries => {
    if (entries.some(entry => entry.target === list.value)) measure()
    scheduleUpdate()
  })
  if (list.value) observer.observe(list.value)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  measurement++
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <nav v-show="headings.length" class="page-outline" :aria-label="label">
    <div class="page-outline-title" role="heading" aria-level="2">
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 5h14M3 10h10M3 15h7" /></svg>
      {{ label }}
    </div>
    <div class="page-outline-body">
      <svg class="page-outline-rail" :width="railWidth" :height="height" aria-hidden="true">
        <path ref="track" :d="rail" class="page-outline-track" />
      </svg>
      <svg class="page-outline-rail page-outline-highlight-layer" :width="railWidth" :height="height" aria-hidden="true">
        <path :d="rail" class="page-outline-highlight" :style="highlight" />
      </svg>
      <ol ref="list" class="page-outline-list">
        <li v-for="(heading, index) in headings" :key="heading.id">
          <a class="page-outline-link" :class="{ active: visibleIndices.includes(index) }" :style="{ paddingLeft: `${30 + heading.depth * 12}px` }" :href="`#${heading.id}`" :aria-current="index === first ? 'location' : undefined" @click="focusHeading(heading)">{{ heading.title }}</a>
        </li>
      </ol>
      <a v-if="markerHeading && distances.length" class="page-outline-star" :href="`#${markerHeading.id}`" :style="markerStyle" :data-direction="direction" :aria-label="markerLabel" :title="markerHeading.title" @click="focusHeading(markerHeading)">
        <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true"><path d="m10 2 2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 14l-4.7 2.46.9-5.24-3.8-3.7 5.25-.76Z" /></svg>
      </a>
    </div>
  </nav>
</template>
