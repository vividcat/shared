import { isBrowser } from './isBrowser'

function _touch() {
  return 'ontouchstart' in window
  || Number((window as Window).navigator.maxTouchPoints) > 0
  || Number(navigator.maxTouchPoints) > 0
}

export const touch = isBrowser && _touch()
export const pointerEvents = isBrowser && !!window.PointerEvent && _touch()
