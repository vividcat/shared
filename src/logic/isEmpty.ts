import { isUndefinedOrNull, toTypeString } from '../base'

/**
 * 支持类型 [
 *  'Number',
 *  'String',
 *  'Boolean',
 *  'Null',
 *  'Undefined',
 *  'BigInt',
 *  'Object',
 *  'Array',
 *  'Map',
 *  'Set',
 * ]
 *
 * @param val 需要检测的值
 * @param [silence=false] 设置为 true 关闭警告
 *
 * @example
 * // 以下都是 true
 * isEmpty(null) // null
 * isEmpty(undefined) // undefined
 * isEmpty('') // string
 * isEmpty('   ') // string
 * isEmpty(0) // number
 * isEmpty(NaN) // number
 * isEmpty(false) // boolean
 * isEmpty(0n) // bigint
 * isEmpty(BigInt(0)) // bigint
 * isEmpty({}) // object 内部无可枚举的属性 enumerable: true
 * isEmpty([]) // array
 * isEmpty(new Map()) // map
 * isEmpty(new Set()) // set
 */
export function isEmpty(val: unknown, silence = false) {
  if (isUndefinedOrNull(val)) return true
  if (Array.isArray(val)) return val.length === 0

  const warn = () => {
    silence !== true && console.warn(val, 'unable to confirm.')
    return false
  }

  switch (typeof val) {
    case 'string':
      return val.trim() === ''
    case 'number':
      return val === 0 || Number.isNaN(val)
    case 'boolean':
      return val === false
    case 'bigint':
      return val === BigInt(0)
    case 'object':
      return ((val instanceof Set) || (val instanceof Map))
        ? val.size === 0
        : toTypeString(val) === '[object Object]'
          ? Object.keys(val as object).length === 0
          : warn()
    default:
      return warn()
  }
}
