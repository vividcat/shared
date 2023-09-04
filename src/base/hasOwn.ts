const _hasOwn = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => _hasOwn.call(val, key)
