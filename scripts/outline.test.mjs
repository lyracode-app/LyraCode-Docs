import test from 'node:test'
import assert from 'node:assert/strict'
import { getOutlineRange, getScrollDirection } from '../docs/.vitepress/theme/outline-state.mjs'

test('every visible heading is highlighted, including partially visible headings', () => {
  const headings = [
    { top: -30, bottom: -6 },
    { top: -5, bottom: 19 },
    { top: 160, bottom: 188 },
    { top: 590, bottom: 618 },
    { top: 620, bottom: 644 }
  ]
  assert.deepEqual(getOutlineRange(headings, 0, 600), [1, 2, 3])
})

test('headings outside the reading viewport or hidden by layout are excluded', () => {
  assert.deepEqual(getOutlineRange([
    { top: 0, bottom: 0 },
    { top: 50, bottom: 78 },
    { top: 110, bottom: 138 },
    { top: 600, bottom: 628 }
  ], 100, 600), [2])
})

test('a long section keeps its preceding heading when no heading is visible', () => {
  assert.deepEqual(getOutlineRange([
    { top: -700, bottom: -676 },
    { top: -300, bottom: -276 },
    { top: 900, bottom: 924 }
  ], 0, 600), [1])
})

test('before the first heading and after the last heading retain a useful target', () => {
  assert.deepEqual(getOutlineRange([{ top: 900, bottom: 924 }], 0, 600), [0])
  assert.deepEqual(getOutlineRange([{ top: -200, bottom: -176 }], 0, 600), [0])
  assert.deepEqual(getOutlineRange([], 0, 600), [])
  assert.deepEqual(getOutlineRange([{ top: 0, bottom: 0 }], 0, 600), [])
})

test('scroll reversal moves the marker to the opposite edge even if visible headings stay the same', () => {
  const positions = [200, 400, 900]
  const rangeAt = y => getOutlineRange(positions.map(top => ({ top: top - y, bottom: top - y + 24 })), 0, 600)
  const down = getScrollDirection(0, 100, 'up')
  const up = getScrollDirection(100, 80, down)
  assert.deepEqual(rangeAt(100), [0, 1])
  assert.deepEqual(rangeAt(80), [0, 1])
  assert.equal(down, 'down')
  assert.equal(up, 'up')
  assert.equal(getScrollDirection(80, 80.1, up), 'up')
})
