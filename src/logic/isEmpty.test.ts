import { expect, test } from 'vitest'
import { isEmpty } from './isEmpty'

test('logic/isEmpty', () => {
  const emptyObject = {}
  Object.defineProperty(emptyObject, '_ep', { value: 1, enumerable: false })

  const oneObject = {}
  Object.defineProperty(oneObject, '_ep', { value: 1, enumerable: true })

  expect(isEmpty(null)).toBeTruthy()
  expect(isEmpty(undefined)).toBeTruthy()
  expect(isEmpty('')).toBeTruthy()
  expect(isEmpty('   ')).toBeTruthy()
  expect(isEmpty(0)).toBeTruthy()
  expect(isEmpty(Number.NaN)).toBeTruthy()
  expect(isEmpty(false)).toBeTruthy()
  expect(isEmpty(0n)).toBeTruthy()
  expect(isEmpty(BigInt(0))).toBeTruthy()
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty(emptyObject)).toBeTruthy()
  expect(isEmpty(oneObject)).toBeFalsy()
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty(new Map())).toBeTruthy()
  expect(isEmpty(new Set())).toBeTruthy()
})
