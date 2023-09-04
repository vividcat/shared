export function isHTMLElement(o: any): o is HTMLElement {
  if (typeof HTMLElement === 'object') {
    return o instanceof HTMLElement
  }
  return (
    o
    && typeof o === 'object'
    && o.nodeType === 1
    && typeof o.nodeName === 'string'
  )
}
