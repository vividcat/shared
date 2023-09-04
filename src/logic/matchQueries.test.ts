import { describe, expect, it } from 'vitest'
import { matchQueries } from './matchQueries'

describe('matchQueries', () => {
  describe('width only', () => {
    it('returns correct selectorMap based on maxWidth', () => {
      const query = {
        a: { maxWidth: 400 },
        b: { maxWidth: 600 },
      }

      const result1 = matchQueries(query)({ width: 300, height: 0 })
      expect(result1).toEqual({ a: true, b: true })

      const result2 = matchQueries(query)({ width: 500, height: 0 })
      expect(result2).toEqual({ a: false, b: true })

      const result3 = matchQueries(query)({ width: 700, height: 0 })
      expect(result3).toEqual({ a: false, b: false })
    })

    it('returns correct selectorMap based on minWidth', () => {
      const query = {
        a: { minWidth: 400 },
        b: { minWidth: 600 },
      }

      const result1 = matchQueries(query)({ width: 300, height: 0 })
      expect(result1).toEqual({ a: false, b: false })

      const result2 = matchQueries(query)({ width: 500, height: 0 })
      expect(result2).toEqual({ a: true, b: false })

      const result3 = matchQueries(query)({ width: 700, height: 0 })
      expect(result3).toEqual({ a: true, b: true })
    })

    it('returns correct selectorMap based on minWidth and maxWidth combined', () => {
      const query = {
        a: { minWidth: 400, maxWidth: 599 },
        b: { minWidth: 600, maxWidth: 700 },
      }

      const result1 = matchQueries(query)({ width: 300, height: 0 })
      expect(result1).toEqual({ a: false, b: false })

      const result2 = matchQueries(query)({ width: 500, height: 0 })
      expect(result2).toEqual({ a: true, b: false })

      const result3 = matchQueries(query)({ width: 700, height: 0 })
      expect(result3).toEqual({ a: false, b: true })

      const result4 = matchQueries(query)({ width: 800, height: 0 })
      expect(result4).toEqual({ a: false, b: false })
    })
  })

  describe('height only', () => {
    it('returns correct selectorMap based on maxHeight', () => {
      const query = {
        a: { maxHeight: 400 },
        b: { maxHeight: 600 },
      }

      const result1 = matchQueries(query)({ width: 0, height: 300 })
      expect(result1).toEqual({ a: true, b: true })

      const result2 = matchQueries(query)({ width: 0, height: 500 })
      expect(result2).toEqual({ a: false, b: true })

      const result3 = matchQueries(query)({ width: 0, height: 700 })
      expect(result3).toEqual({ a: false, b: false })
    })

    it('returns correct selectorMap based on minHeight', () => {
      const query = {
        a: { minHeight: 400 },
        b: { minHeight: 600 },
      }

      const result1 = matchQueries(query)({ width: 0, height: 300 })
      expect(result1).toEqual({ a: false, b: false })

      const result2 = matchQueries(query)({ width: 0, height: 500 })
      expect(result2).toEqual({ a: true, b: false })

      const result3 = matchQueries(query)({ width: 0, height: 700 })
      expect(result3).toEqual({ a: true, b: true })
    })

    it('returns correct selectorMap based on minHeight and maxHeight combined', () => {
      const query = {
        a: { minHeight: 400, maxHeight: 599 },
        b: { minHeight: 600, maxHeight: 700 },
      }

      const result1 = matchQueries(query)({ width: 0, height: 300 })
      expect(result1).toEqual({ a: false, b: false })

      const result2 = matchQueries(query)({ width: 0, height: 500 })
      expect(result2).toEqual({ a: true, b: false })

      const result3 = matchQueries(query)({ width: 0, height: 700 })
      expect(result3).toEqual({ a: false, b: true })

      const result4 = matchQueries(query)({ width: 0, height: 800 })
      expect(result4).toEqual({ a: false, b: false })
    })
  })

  describe('width and height', () => {
    it('returns correct selectorMap', () => {
      const query = {
        a: { minWidth: 400, maxWidth: 500, minHeight: 400, maxHeight: 500 },
        b: { minWidth: 500, maxWidth: 600, minHeight: 400, maxHeight: 500 },
        c: { minWidth: 400, maxWidth: 500, minHeight: 500, maxHeight: 600 },
        d: { minWidth: 500, maxWidth: 600, minHeight: 500, maxHeight: 600 },
      }

      const result1 = matchQueries(query)({ width: 300, height: 300 })
      expect(result1).toEqual({ a: false, b: false, c: false, d: false })

      const result2 = matchQueries(query)({ width: 450, height: 450 })
      expect(result2).toEqual({ a: true, b: false, c: false, d: false })

      const result3 = matchQueries(query)({ width: 450, height: 550 })
      expect(result3).toEqual({ a: false, b: false, c: true, d: false })

      const result4 = matchQueries(query)({ width: 550, height: 450 })
      expect(result4).toEqual({ a: false, b: true, c: false, d: false })

      const result5 = matchQueries(query)({ width: 550, height: 550 })
      expect(result5).toEqual({ a: false, b: false, c: false, d: true })

      const result6 = matchQueries(query)({ width: 700, height: 700 })
      expect(result6).toEqual({ a: false, b: false, c: false, d: false })
    })
  })

  describe('no height info', () => {
    it('ignores rules of height', () => {
      const query = {
        a: { minWidth: 400, maxWidth: 500, minHeight: 400, maxHeight: 500 },
        b: { minWidth: 500, maxWidth: 600, minHeight: 400, maxHeight: 500 },
        c: { minWidth: 400, maxWidth: 500, minHeight: 500, maxHeight: 600 },
        d: { minWidth: 500, maxWidth: 600, minHeight: 500, maxHeight: 600 },
      }

      const result1 = matchQueries(query)({ width: 300 })
      expect(result1).toEqual({ a: false, b: false, c: false, d: false })

      const result2 = matchQueries(query)({ width: 450 })
      expect(result2).toEqual({ a: true, b: false, c: true, d: false })

      const result5 = matchQueries(query)({ width: 550 })
      expect(result5).toEqual({ a: false, b: true, c: false, d: true })

      const result6 = matchQueries(query)({ width: 700 })
      expect(result6).toEqual({ a: false, b: false, c: false, d: false })
    })
  })

  describe('no width info', () => {
    it('ignores rules of width', () => {
      const query = {
        a: { minWidth: 400, maxWidth: 500, minHeight: 400, maxHeight: 500 },
        b: { minWidth: 500, maxWidth: 600, minHeight: 400, maxHeight: 500 },
        c: { minWidth: 400, maxWidth: 500, minHeight: 500, maxHeight: 600 },
        d: { minWidth: 500, maxWidth: 600, minHeight: 500, maxHeight: 600 },
      }

      const result1 = matchQueries(query)({ height: 300 })
      expect(result1).toEqual({ a: false, b: false, c: false, d: false })

      const result2 = matchQueries(query)({ height: 450 })
      expect(result2).toEqual({ a: true, b: true, c: false, d: false })

      const result3 = matchQueries(query)({ height: 550 })
      expect(result3).toEqual({ a: false, b: false, c: true, d: true })

      const result6 = matchQueries(query)({ height: 700 })
      expect(result6).toEqual({ a: false, b: false, c: false, d: false })
    })
  })
})
