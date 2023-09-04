const color_core = idx => msg => `\u001B[${idx}m${msg}\u001B[39m`
export const black = color_core(30)
export const red = color_core(31)
export const green = color_core(32)
export const yellow = color_core(33)
export const blue = color_core(34)
export const magenta = color_core(35)
export const cyan = color_core(36)
export const white = color_core(37)
