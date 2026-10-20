/**
 * Find the headings visible in the reading viewport. A long section without a
 * visible heading keeps its preceding heading as a useful navigation fallback.
 * @param {{ top: number, bottom: number }[]} bounds
 * @param {number} viewportTop
 * @param {number} viewportBottom
 */
export function getOutlineRange(bounds, viewportTop, viewportBottom) {
  const visible = []
  const available = []
  let preceding = -1
  if (viewportBottom <= viewportTop) return []
  bounds.forEach((heading, index) => {
    if (heading.bottom <= heading.top) return
    available.push(index)
    if (heading.top <= viewportTop) preceding = index
    if (heading.bottom > viewportTop && heading.top < viewportBottom) visible.push(index)
  })
  if (visible.length) return visible
  const fallback = preceding >= 0 ? preceding : available[0]
  return fallback === undefined ? [] : [fallback]
}

/** @param {'up' | 'down'} previousDirection */
export function getScrollDirection(previousY, currentY, previousDirection) {
  if (currentY > previousY + 0.5) return 'down'
  if (currentY < previousY - 0.5) return 'up'
  return previousDirection
}
