import { rawUserAgent } from './userAgent'

export const isFirefox = rawUserAgent.includes('Firefox')
export const isWebKit = rawUserAgent.includes('AppleWebKit')
export const isChrome = rawUserAgent.includes('Chrome')
export const isSafari = rawUserAgent.includes('Safari') && !isChrome
/**
 * @since 0.1.2
 */
export const isWebKitWebView = isWebKit && !isChrome && !isSafari
/**
 * @since 0.1.2
 */
export const isElectron = rawUserAgent.includes('Electron/')
