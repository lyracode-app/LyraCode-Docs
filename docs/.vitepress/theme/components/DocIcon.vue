<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 18 })
const paths: Record<string, string[]> = {
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 3H20v19H6.5A2.5 2.5 0 0 1 4 19.5v-14A2.5 2.5 0 0 1 6.5 3Z', 'M8 7h8', 'M8 11h6'],
  manual: ['M12 7v14', 'M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v17h-5a4 4 0 0 0-4 1 4 4 0 0 0-4-1H3Z'],
  developer: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm14 4-4 16'],
  examples: ['m12 3 9 5-9 5-9-5 9-5Z', 'm3 12 9 5 9-5', 'm3 16 9 5 9-5'],
  reference: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  search: ['M21 21l-5-5', 'M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z'],
  chevron: ['m9 5 7 7-7 7'],
  panel: ['M3 4h18v16H3z', 'M9 4v16'],
  sun: ['M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'm4.9 4.9 1.4 1.4', 'm17.7 17.7 1.4 1.4', 'm4.9 19.1 1.4-1.4', 'm17.7 6.3 1.4-1.4', 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'],
  moon: ['M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z'],
  globe: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', 'M3 12h18', 'M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 16v5h14v-5'],
  history: ['M3 11a9 9 0 1 1 2.7 7', 'M3 4v7h7', 'M12 7v5l3 2'],
  copy: ['M9 9h12v12H9z', 'M15 5V3H3v12h2'],
  check: ['m5 12 4 4L19 6'],
  external: ['M15 3h6v6', 'm10 14 11-11', 'M21 14v7H3V3h7']
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="doc-icon">
    <path v-for="(path, index) in paths[name] || paths.book" :key="index" :d="path" />
  </svg>
</template>
