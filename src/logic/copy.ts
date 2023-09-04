import { hasOwn, isObject, toTypeString } from '../base'

const SUPPORTS = [
  'Number',
  'String',
  'Boolean',
  'Null',
  'Undefined',
  'Symbol',
  'BigInt',
  'Object',
  'Array',
]
/**
 * 复制一份数据，仅支持基础类型和[object Object]类型以及[object Array]类型，复杂的类型会给出警告
 *
 * @param source
 * @param [silence=false] 设置为 true 关闭警告
 *
 * @example
 * copy(1) => 1
 * copy('2') => '2'
 * copy(null) => null
 * copy(undefined) => undefined
 * copy([1, 3]) => [1, 3]
 * copy(Symbol(1)) => Symbol(1)
 * copy(() => {}, true) => 产生警告
 * copy(new Map(), true) => 产生警告
 * ... 不一一列举
 */
export function copy<T = unknown>(source: T, silence = false): T {
  let copyOne

  if (isObject(source)) {
    copyOne = {} as object
    for (const key in source) {
      if (hasOwn(source, key)) {
        copyOne[key] = copy(source[key], silence)
      }
    }
  } else if (Array.isArray(source)) {
    copyOne = [] as any[]
    for (const item of <any[]>source) {
      copyOne.push(copy(item, silence))
    }
  } else {
    const rawType = toTypeString(source).slice(8, -1)
    if (SUPPORTS.includes(rawType)) {
      copyOne = source
    } else {
      silence !== true && console.warn(
        'Target %o is \'%s\' type, cannot be copied.',
        source,
        rawType,
      )
    }
  }

  return copyOne as T
}
