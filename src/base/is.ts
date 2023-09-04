import { toTypeString } from './toTypeString'
import { hasOwn } from './hasOwn'

export const isBoolean = (val: unknown): val is boolean => val === true || val === false
export const isDate = (val: unknown): val is Date => val instanceof Date
export const isFunction = <T extends (...args: any[]) => unknown>(val: unknown): val is T => typeof val === 'function'
/**
 * 判断数字类型直接使用 typeof 即可，当传入 NaN，依旧是 false
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number' && !Number.isNaN(val)
/**
 * @returns 判断是否为 `object` 类型，但**不是** `null`，`array`
 */
export const isObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]' && val !== null && !Array.isArray(val)

export function isEmptyObject(obj: unknown): obj is object {
  if (!isObject(obj)) return false

  for (const key in obj) {
    if (hasOwn(obj, key)) {
      return false
    }
  }

  return true
}

export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isUndefinedOrNull = (val: unknown): val is undefined | null => isUndefined(val) || val === null
export const isDefined = <T>(val: T | undefined | null): val is T => !isUndefinedOrNull(val)
