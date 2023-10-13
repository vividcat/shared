export const passive = /* @__PURE__ */(() => {
  let passive = false
  try {
    const get = function () {
      passive = true
    }
    const opts = Object.defineProperty({}, 'passive', { get })
    window.addEventListener('test', () => { /* noop */ }, opts)
  } catch (e) {
    /* nothing */
  }
  return passive
})()
