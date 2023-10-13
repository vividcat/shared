import { userAgent } from './userAgent'

/**
 * platform
 */
export const isAndroid = userAgent.includes('android')
export const isOS = /(iphone|ipad|ipod|ios)/.test(userAgent)
export const isWindowsPhone = userAgent.includes('windows phone')
export const isSymbianos = userAgent.includes('symbianos')
export const isMobile = isAndroid || isOS || isWindowsPhone || isSymbianos
// export const isMac = /Mac/.test(navigator.platform)
export const isMac = /macintosh|mac os x/.test(userAgent)
export const isWindow32 = userAgent.indexOf('win32') || userAgent.indexOf('wow32')
export const isWindow64 = userAgent.indexOf('win64') || userAgent.indexOf('wow64')
/**
 * @deprecated use {@link isWindows} instead.
 * @since 0.1.2
 */
export const isWindow = isWindow64 || isWindow32
/**
 * platform
 * @since 0.1.2
 */
export const isMacintosh = userAgent.includes('macintosh')
/**
 * platform
 * @since 0.1.2
 */
export const isWindows = userAgent.includes('windows')
/**
 * platform
 * @since 0.1.2
 */
export const isLinux = userAgent.includes('linux')
