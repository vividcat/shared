/**
 * 使用浏览器自带功能 `URLSearchParams` 获取所有的查询条件
 *
 * @param search url-like 的字符串，默认是 location.href
 */
export function getUrlParams(search = location.href) {
  const index = search.indexOf('?')
  const raw = search.slice(index + 1)
  return ~index ? Object.fromEntries(new URLSearchParams(raw)) : {}
}

/**
 * [兼容版本] 通过正则获取属性值的，更加推荐使用 {@link getURLParams}，它使用浏览器原生功能 `URLSearchParams` 实现
 *
 * @param name 查询的关键属性
 * @param search url-like 的字符串，默认是 location.href
 * @returns 返回值已经被 `decodeURIComponent` 处理过
 */
export function getUrlParamByName(name: string, search = location.href) {
  const rx = new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`)
  const ar = rx.exec(search)
  return (ar && ar.length > 1)
    ? decodeURIComponent(ar[1].replace(/\+/g, '%20'))
    : null
}
