import * as utils from '@riophae/vue-treeselect/utils'

describe('Utils', () => {
  describe('warning', () => {
    const { warning } = utils
    const WARNING_MSG = '$MESSAGE$'

    beforeEach(() => {
      spyOn(console, 'error')
    })

    it('when true', () => {
      warning(() => true, () => WARNING_MSG)
      expect(console.error).not.toHaveBeenCalled()
    })

    it('when false', () => {
      warning(() => false, () => WARNING_MSG)
      expect(console.error).toHaveBeenCalledWith('[Vue-Treeselect Warning]', WARNING_MSG)
    })
  })

  describe('onlyOnLeftClick', () => {
    const { onlyOnLeftClick } = utils
    let spy

    beforeEach(() => {
      spy = jasmine.createSpy('onmousedown')
    })

    it('should invoke the function when left button has been clicked', () => {
      const eventObj = {
        type: 'mousedown',
        button: 0,
      }
      onlyOnLeftClick(spy)(eventObj)
      expect(spy).toHaveBeenCalledWith(eventObj)
    })

    it('should not invoke the function if wrong event type', () => {
      const eventObj = {
        type: 'mouseup',
        button: 0,
      }
      onlyOnLeftClick(spy)(eventObj)
      expect(spy).not.toHaveBeenCalled()
    })

    it('should not invoke the function if clicked with buttons other than left button', () => {
      const eventObj = {
        type: 'mousedown',
        button: 1,
      }
      onlyOnLeftClick(spy)(eventObj)
      expect(spy).not.toHaveBeenCalled()
    })

    it('should pass extra args', () => {
      const eventObj = {
        type: 'mousedown',
        button: 0,
      }
      const extraArg = {}
      onlyOnLeftClick(spy)(eventObj, extraArg)
      expect(spy).toHaveBeenCalledWith(eventObj, extraArg)
    })
  })

  describe('isNaN', () => {
    const { isNaN } = utils

    it('check if value is NaN', () => {
      expect(isNaN(NaN)).toBe(true)
      expect(isNaN(0)).toBe(false)
      expect(isNaN(-1)).toBe(false)
      expect(isNaN(1)).toBe(false)
      expect(isNaN('NaN')).toBe(false)
    })
  })

  describe('isPromise', () => {
    const { isPromise } = utils

    it('check Promise instance', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
      expect(isPromise(Promise.reject())).toBe(true)
    })

    it('duck typing', () => {
      const p = { then() { /* empty */ } }
      expect(isPromise(p)).toBe(true)
    })
  })

  describe('once', () => {
    const { once } = utils

    it('wrapped function can be executed only once', () => {
      let n = 0
      const fn = once(() => ++n)

      for (let i = 0; i < 5; i++) {
        expect(fn()).toBe(1)
        expect(n).toBe(1)
      }
    })
  })

  describe('noop', () => {
    const { noop } = utils

    it('does nothing', () => {
      noop()
    })
  })

  describe('deepExtend', () => {
    const { deepExtend } = utils

    it('should deep extend the target object', () => {
      expect(deepExtend({ b: 2 }, { a: 1, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should work with undefined/null', () => {
      expect(deepExtend({}, undefined)).toEqual({})
      expect(deepExtend({}, null)).toEqual({})
    })
  })

  describe('getLast', () => {
    const { getLast } = utils

    it('returns undefined if array is empty', () => {
      expect(getLast([])).toBe(undefined)
    })

    it('returns last element of array', () => {
      expect(getLast([ 1 ])).toBe(1)
      expect(getLast([ 1, 2, 3 ])).toBe(3)
    })
  })

  describe('find', () => {
    const { find } = utils

    it('should return the element if matched', () => {
      expect(find([ 1, 2, 3 ], n => n % 2 === 0)).toBe(2)
    })

    it('should return undefined if not matched', () => {
      expect(find([ 1 ], n => n < 0)).toBe(undefined)
    })
  })

  it('removeFromArray', () => {
    const { removeFromArray } = utils
    const arr = [ 1, 2, 3 ]
    removeFromArray(arr, 2)
    expect(arr).toEqual([ 1, 3 ])
    removeFromArray(arr, 9)
    expect(arr).toEqual([ 1, 3 ])
  })

  it('quickDiff', () => {
    const { quickDiff } = utils
    const obj = {}
    expect(quickDiff([], [])).toBe(false)
    expect(quickDiff([ 1 ], [])).toBe(true)
    expect(quickDiff([ {} ], [ {} ])).toBe(true)
    expect(quickDiff([ obj ], [ obj ])).toBe(false)
  })
})
