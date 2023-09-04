export function isShadowRoot(node: Node): node is ShadowRoot {
  return node && !!(<ShadowRoot>node).host && !!(<ShadowRoot>node).mode
}
