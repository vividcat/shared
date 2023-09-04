import { expect, test } from 'vitest'
import { toDateString } from './toDateString'

test('normal', () => {
  expect(toDateString()).toEqual(
    expect.stringMatching(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/),
  )
})

test('correct formats', () => {
  const date = new Date(2020, 1, 2, 3, 4, 5, 6)
  expect(toDateString(date)).toBe('2020-02-02 03:04:05')
  expect(toDateString(date, 'yyyy/MM')).toBe('2020/02')
})

test('invalid formats', () => {
  const date = new Date(2020, 1, 2, 3, 4, 5, 6)
  const r = toDateString(date, 'YYYY/MM')
  const errMsg = `value is not '2020/02'，is ${r}`

  function WrapperDo() {
    if (r !== '2020/02') throw new Error(errMsg)
  }
  expect(WrapperDo).toThrow(errMsg)
})
