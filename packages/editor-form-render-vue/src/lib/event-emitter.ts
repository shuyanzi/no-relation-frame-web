/**
 * This event is for update modelValue
 */

class EventEmitter {
  private _events: any;
  constructor() {
    this._events = Object.create(null)
  }
  $on(label: string, fn: Function) {
    (this._events[label] || (this._events[label] = [])).push(fn)
  }
  $emit(label: string) {
    let cbs = this._events[label]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(this, args)
        } catch (e) {
          console.log(e, `event handler for "${label}"`)
        }
      }
    }
  }
  $off(label: string, fn: Function) {
    const cbs = this._events[label]
    if (!cbs) {
      return this
    }
    if (!fn) {
      this._events[label] = null
      return this
    }
    if (fn) {
      let cb
      let i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    }
  }

  eventNames() {
    return Object.keys(this._events);
  }
}

export function toArray (list: any, start?: number): Array<any> {
 start = start || 0
 let i = list.length - start
 const ret: Array<any> = new Array(i)
 while (i--) {
   ret[i] = list[i + start]
 }
 return ret
}

export { EventEmitter }
