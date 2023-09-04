import { isBrowser } from './isBrowser'

/**
 * 原始值，需要最小化请使用 {@link userAgent}
 */
export const rawUserAgent = isBrowser ? window.navigator.userAgent : ''
/**
 * 字符串全部小写化，原始值请使用 {@link rawUserAgent}
 */
export const userAgent = rawUserAgent.toLowerCase()
