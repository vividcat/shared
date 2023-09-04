import { expect, test } from 'vitest'
import { getUrlParamByName } from './url'

test('url/getUrlParamByName', () => {
  const search = './?name=jack&age=12&isRead=false&'
  const search1 = './?name=j a c+k.&age=12&isRead=false&'
  expect(getUrlParamByName('name', search)).toEqual('jack')
  expect(getUrlParamByName('age', search)).toEqual('12')
  expect(getUrlParamByName('isRead', search)).toEqual('false')
  expect(getUrlParamByName('like', search)).toBeNull
  expect(getUrlParamByName('name', search1)).toEqual('j a c k.')
})
