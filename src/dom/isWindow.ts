import { toTypeString } from '../base/toTypeString'

export function isWindow(win: any): boolean {
  return (
    typeof window !== 'undefined' && toTypeString(win) === '[object Window]'
  )
}
