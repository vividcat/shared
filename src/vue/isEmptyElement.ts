import type { VNode } from 'vue'
import { Comment, Fragment, Text } from 'vue'

export function isEmptyElement(vNode: VNode) {
  if (!vNode) return false

  if (vNode.type === Comment) return true
  if (vNode.type === Fragment && Array.isArray(vNode.children) && vNode.children.length === 0) return true
  if (vNode.type === Text && typeof vNode.children === 'string' && vNode.children.trim() === '') return true

  return false
}
