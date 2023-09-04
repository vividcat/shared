export interface StyleInjectOptions {
  id?: string
  insertAt?: 'top' | 'bottom'
}

export function styleInject(css: any, options: StyleInjectOptions = {}) {
  const { insertAt, id } = options

  if (!css || typeof document === 'undefined') return

  const domHead = document.head || document.getElementsByTagName('head')[0]
  const domStyle = document.createElement('style')
  domStyle.type = 'text/css'

  if (id) domStyle.id = id
  if (insertAt === 'top') {
    domHead.firstChild
      ? domHead.insertBefore(domStyle, domHead.firstChild)
      : domHead.appendChild(domStyle)
  } else {
    domHead.appendChild(domStyle)
  }

  if ((domStyle as any).styleSheet) {
    (domStyle as any).styleSheet.cssText = css
  } else {
    domStyle.appendChild(document.createTextNode(css))
  }
}
