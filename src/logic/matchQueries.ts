// taked from https://github.com/d6u/container-query-toolkit
import { type Writable } from '../types'

interface Rule {
  readonly minWidth: number
  readonly maxWidth: number
  readonly minHeight: number
  readonly maxHeight: number
}

export type Rules = Record<string, Partial<Writable<Rule>>>

/**
 * If missing height or width, {min|max}Height or {min|max}Width rules will be ignored respectively.
 */
export interface ContentSize {
  width?: number
  height?: number
}

export function matchQueries<R extends Rules>(rules: R) {
  type Entry = Rule & { className: keyof R }
  type ReturnType = Record<keyof R, boolean>

  const entries: Entry[] = []

  for (const className of Object.keys(rules)) {
    const rule = rules[className]
    entries.push({
      minWidth: rule.minWidth != null ? rule.minWidth : 0,
      maxWidth: rule.maxWidth != null ? rule.maxWidth : Number.POSITIVE_INFINITY,
      minHeight: rule.minHeight != null ? rule.minHeight : 0,
      maxHeight: rule.maxHeight != null ? rule.maxHeight : Number.POSITIVE_INFINITY,
      className,
    })
  }

  return function ({ width, height }: ContentSize) {
    const classNameMap: ReturnType = <ReturnType>{}

    for (const { className, minWidth, maxWidth, minHeight, maxHeight } of entries) {
      if (height != null && width != null) {
        classNameMap[className] = (
          minWidth <= width && width <= maxWidth
          && minHeight <= height && height <= maxHeight
        )
      } else if (height == null && width != null) {
        classNameMap[className] = minWidth <= width && width <= maxWidth
      } else if (height != null && width == null) {
        classNameMap[className] = minHeight <= height && height <= maxHeight
      } else {
        classNameMap[className] = true
      }
    }

    return classNameMap
  }
}
