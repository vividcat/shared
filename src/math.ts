export function add(n1: number, n2: number): number {
  const s1 = n1.toString()
  const s2 = n2.toString()
  const arr1 = s1.split('.')
  const arr2 = s2.split('.')
  const d1 = arr1.length === 2 ? arr1[1] : ''
  const d2 = arr2.length === 2 ? arr2[1] : ''
  const maxLen = Math.max(d1.length, d2.length)
  const m = 10 ** maxLen
  return Number(((Number(s1) * m + Number(s2) * m) / m).toFixed(maxLen))
}

export function sub(n1: number, n2: number): number {
  return add(n1, -n2)
}

export function mul(n1: number, n2: number): number {
  let m = 0
  const s1 = n1.toString()
  const s2 = n2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    /* nothing */
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    /* nothing */
  }
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', '')))
    / 10 ** m
  )
}

export function div(n1: number, n2: number): number {
  let t1 = 0
  let t2 = 0
  try {
    t1 = n1.toString().split('.')[1].length
  } catch (e) {
    /* nothing */
  }
  try {
    t2 = n2.toString().split('.')[1].length
  } catch (e) {
    /* nothing */
  }
  const r1 = Number(n1.toString().replace('.', ''))
  const r2 = Number(n2.toString().replace('.', ''))
  return t1 < t2
    ? (r1 / r2) * 10 ** (t2 - t1)
    : r1 / r2 / 10 ** (t1 - t2)
}
