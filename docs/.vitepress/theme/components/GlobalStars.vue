<template>
  <canvas v-if="isHome" ref="canvas" class="global-stars" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

// 动态星空只出现在首页；阅读页保持安静
const { page } = useData()
const isHome = computed(() => {
  const p = page.value.relativePath
  return !p || p === 'index.md'
})

const canvas = ref<HTMLCanvasElement | null>()
let raf = 0
let running = false

const start = async () => {
  await nextTick()
  const c = canvas.value
  if (!c || running) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  running = true
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  let w = window.innerWidth
  let h = window.innerHeight
  let stars: { x: number; y: number; r: number; a: number; s: number }[] = []

  const resize = () => {
    w = window.innerWidth
    h = window.innerHeight
    c.width = w * dpr
    c.height = h * dpr
    c.style.width = w + 'px'
    c.style.height = h + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const count = Math.min(90, Math.max(40, Math.floor((w * h) / 15000)))
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 1.0,
      a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.22 + 0.08
    }))
  }

  const tick = () => {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x
        const dy = stars[i].y - stars[j].y
        const d2 = dx * dx + dy * dy
        if (d2 < 8100) {
          const t = 1 - d2 / 8100
          ctx.beginPath()
          ctx.moveTo(stars[i].x, stars[i].y)
          ctx.lineTo(stars[j].x, stars[j].y)
          ctx.strokeStyle = `rgba(150, 170, 255, ${(0.16 * t).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }
    for (const st of stars) {
      st.y -= st.s
      if (st.y < -6) {
        st.y = h + 6
        st.x = Math.random() * w
      }
      st.a += 0.02
      const alpha = 0.5 + Math.sin(st.a) * 0.3
      ctx.beginPath()
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(170, 190, 255, ${alpha.toFixed(3)})`
      ctx.fill()
    }
    raf = requestAnimationFrame(tick)
  }

  resize()
  tick()
  window.addEventListener('resize', resize)
  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    running = false
  })
}

const stop = () => {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
  running = false
}

onMounted(() => {
  watch(isHome, (v) => {
    if (v) start()
    else stop()
  }, { immediate: true })
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.global-stars {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 1;
}

@media (prefers-color-scheme: light) {
  .global-stars {
    opacity: 0.65;
  }
}
</style>