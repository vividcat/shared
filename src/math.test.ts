import { expect, test } from 'vitest'
import { add, div, mul, sub } from './math'

const n1 = 14
const n2 = 0.1
const n3 = 0.400001
const n4 = 0.02

test('util: add', () => {
  expect(add(n1, n2)).toBe(n1 + n2)
  expect(add(Number.NaN, Number.NaN)).toBe(Number.NaN * Number.NaN)
  expect(add(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY + Number.POSITIVE_INFINITY)
  expect(add(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY + Number.POSITIVE_INFINITY)
  expect(add(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY + Number.NEGATIVE_INFINITY)
})

test('util: sub', () => {
  expect(sub(n2, n1)).toBe(n2 - n1)
  expect(sub(Number.NaN, Number.NaN)).toBe(Number.NaN * Number.NaN)
  expect(sub(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY - Number.POSITIVE_INFINITY)
  expect(sub(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY - Number.POSITIVE_INFINITY)
  expect(sub(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY - Number.NEGATIVE_INFINITY)
})

test('util: mul', () => {
  expect(mul(n2, n1)).toBe(1.4)
  expect(mul(n2, n1)).not.toEqual(n2 * n1)
  expect(mul(Number.NaN, Number.NaN)).toBe(Number.NaN * Number.NaN)
  expect(mul(Number.NaN, Number.POSITIVE_INFINITY)).toBe(Number.NaN * Number.POSITIVE_INFINITY)
  expect(mul(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY * Number.POSITIVE_INFINITY)
  expect(mul(Number.POSITIVE_INFINITY, -2)).toBe(Number.POSITIVE_INFINITY * -2)
  expect(mul(Number.POSITIVE_INFINITY, 2)).toBe(Number.POSITIVE_INFINITY * 2)
  expect(mul(Number.POSITIVE_INFINITY, 0)).toBe(Number.POSITIVE_INFINITY * 0)
})

test('util: div', () => {
  expect(div(n3, n4)).toBe(20.00005)
  expect(div(n3, n4)).not.toEqual(n3 / n4)
  expect(div(n3, 0)).toBe(Number.POSITIVE_INFINITY)
  expect(div(0, 0)).toBe(Number.NaN)
  expect(div(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBeNaN
  expect(div(Number.NaN, Number.NaN)).toBeNaN
})
