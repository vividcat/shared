import { rawUserAgent } from './userAgent'

export const isFirefox = rawUserAgent.includes('Firefox')
export const isWebKit = rawUserAgent.includes('AppleWebKit')
export const isChrome = rawUserAgent.includes('Chrome')
export const isSafari = rawUserAgent.includes('Safari') && !isChrome
