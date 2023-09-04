import { expect, test } from 'vitest'
import { copy } from './copy'

const CANNOT_COPY = 'cannot_copy'
const ARRAY = [1, 3]
const SYMBOL_ONE = Symbol(1)
const BIGINT_ZERO = BigInt(0)
const FN = function () {}
const MAP = new Map([['name', 'jack'], ['name', 'rose']])
const SET = new Set(['red', 'blue', 'green'])
const obj = {
  num: 1,
  str: '2',
  bool: false,
  _null: null,
  _undefined: undefined,
  array: ARRAY,
  _symbol: SYMBOL_ONE,
  _bigint: BIGINT_ZERO,
  fn: FN,
  map: MAP,
  set: SET,
  _math: Math,
}

Object.defineProperty(obj, CANNOT_COPY, { value: CANNOT_COPY })

test('logic/copy', () => {
  expect(copy(0)).toStrictEqual(0)
  expect(copy(!0)).toBeTruthy()
  expect(copy(Number.NaN)).toBeNaN()
  expect(copy(Number.POSITIVE_INFINITY)).toStrictEqual(Number.POSITIVE_INFINITY)
  expect(copy('copy data')).toStrictEqual('copy data')
  expect(copy('  ')).toStrictEqual('  ')
  expect(copy('')).toStrictEqual('')
  expect(copy(true)).toBeTruthy()
  expect(copy(!true)).toStrictEqual(false)
  expect(copy(+true)).toStrictEqual(1)
  expect(copy(null)).toBeNull()
  expect(copy(undefined)).toBeUndefined()
  const copySymbol = copy(SYMBOL_ONE)
  expect(typeof copySymbol).toEqual('symbol')
  expect(copySymbol.description).toStrictEqual(SYMBOL_ONE.description)
  const copyBigInt = copy(BIGINT_ZERO)
  expect(typeof copyBigInt).toEqual('bigint')
  expect(copyBigInt).toStrictEqual(BIGINT_ZERO)
  expect(`${copyBigInt}`).toBe('0')

  const testArray = (array: number[]) => {
    const copyArray = copy(array)
    expect(Array.isArray(copyArray)).toBeTruthy()
    expect(copyArray.every((n, i) => array[i] === n)).toBeTruthy()
    expect(copyArray.length === array.length).toBeTruthy()
    expect(copyArray).toStrictEqual(array)
  }
  testArray(ARRAY)

  expect(copy(FN, true)).toBeUndefined()
  expect(copy(MAP, true)).toBeUndefined()
  expect(copy(SET, true)).toBeUndefined()
  expect(copy(Math, true)).toBeUndefined()

  const copyObject = copy(obj)
  const canCopyKeys = ['num', 'str', 'bool', '_null', '_undefined', '_bigint'] as const
  const cannotCopyKey = ['fn', 'map', 'set', '_math', CANNOT_COPY] as const
  canCopyKeys.forEach((key) => {
    expect(copyObject[key]).toStrictEqual(obj[key])
  })
  expect(copyObject._symbol.description).toEqual(obj._symbol.description)
  expect(typeof copyObject._symbol).toEqual('symbol')
  cannotCopyKey.forEach((key) => {
    expect((copyObject as any)[key]).toBeUndefined()
  })
  testArray(obj.array)
})
