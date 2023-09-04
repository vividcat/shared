const digit = (number: number, length = 2) => `${number}`.padStart(length, '0')

/**
 * @description 简易版格式化时间：
 *  yyyy 年
 *  MM 月
 *  dd 日
 *  HH 时
 *  mm 分
 *  ss 秒
 *
 * @param { string | number | Date } time 时间，缺省则为当前时间
 * @param { string } format 格式，缺省则为 yyyy-MM-dd HH:mm:ss
 *
 * @example
 * toDateString() => 2020-03-05 11:46:22
 * toDateString('2020-03-05 11:46:22', 'yyyy-MM-dd') => 2020-03-05
 */
export function toDateString(): string
export function toDateString(time?: string | number | Date): string
export function toDateString(time?: string | number | Date, format?: string): string
export function toDateString(time: any = new Date(), format = 'yyyy-MM-dd HH:mm:ss'): string {
  time = typeof time === 'string' ? time.replace(/-/g, '/') : time

  const date = new Date(time)
  const ymd = [
    digit(date.getFullYear(), 4),
    digit(date.getMonth() + 1),
    digit(date.getDate()),
  ]
  const hms = [
    digit(date.getHours()),
    digit(date.getMinutes()),
    digit(date.getSeconds()),
  ]

  return format
    .replace(/yyyy/g, ymd[0])
    .replace(/MM/g, ymd[1])
    .replace(/dd/g, ymd[2])
    .replace(/HH/g, hms[0])
    .replace(/mm/g, hms[1])
    .replace(/ss/g, hms[2])
}
