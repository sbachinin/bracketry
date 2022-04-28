import { debounce } from './utils/utils.mjs'

export const set_resizer = (target, cb) => {
    let resizer_is_pristine = true // prevent initial call because it causes unnecessary and unsafe full redraw
    new ResizeObserver(
        debounce(() => {
            if (resizer_is_pristine) {
                resizer_is_pristine = false
                return
            }
            console.log('redraw on resize')
            cb()
        })
    ).observe(target)
}