// taked from https://github.com/d6u/container-query-toolkit
interface Rule {
  minWidth: number
  maxWidth: number
  minHeight: number
  maxHeight: number
}

export type Rules = Record<string, Partial<Rule>>

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

  return function ({ width, height }: { width?: number; height?: number }) {
    const classNameMap = {} as ReturnType

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
