import { expect, test } from 'vitest'
import { rgba } from './color'

test('rgba', () => {
  expect(rgba('white')).toBe('rgb(255, 255, 255)')
  expect(rgba('white', 0.8)).toBe('rgba(255, 255, 255, 0.8)')
  expect(rgba('#000', 0.9)).toBe('rgba(0, 0, 0, 0.9)')
  expect(rgba('#000', 1.1)).toBe('rgb(0, 0, 0)')
})
