import { userAgent } from './userAgent'

export const isAndroid = userAgent.includes('android')
export const isOS = /(iphone|ipad|ipod|ios)/.test(userAgent)
export const isWindowsPhone = userAgent.includes('windows phone')
export const isSymbianos = userAgent.includes('symbianos')
export const isMobile = isAndroid || isOS || isWindowsPhone || isSymbianos
// export const isMac = /Mac/.test(navigator.platform)
export const isMac = /macintosh|mac os x/.test(userAgent)
export const isWindow32 = userAgent.indexOf('win32') || userAgent.indexOf('wow32')
export const isWindow64 = userAgent.indexOf('win64') || userAgent.indexOf('wow64')
export const isWindow = isWindow64 || isWindow32
