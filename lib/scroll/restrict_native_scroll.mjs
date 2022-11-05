// https://stackoverflow.com/a/4770179

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const preventDefaultForScrollKeys = (e) => {
    if (e.keyCode >= 32 && e.keyCode <= 40) {
        preventDefault(e)
        return false
    }
}

const preventDefault = (e) => {
    e.preventDefault()
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get() { supportsPassive = true }
    }))
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

export const restrict_native_scroll = (el, make_scroll_jump) => {

    const deputise_for_wheel = (e) => {
        if (
            el.classList // window has no classList
            && el.classList.contains('matches-scroller')
            && !el.classList.contains('scroll-y-enabled')
        ) {
            return
        }
        e.preventDefault()
        make_scroll_jump(e.deltaY)
    }

    el.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    el.addEventListener(wheelEvent, deputise_for_wheel, wheelOpt) // modern desktop
    el.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    el.addEventListener('keydown', preventDefaultForScrollKeys, false)

    const release_native_scroll = () => {
        el.removeEventListener('DOMMouseScroll', preventDefault, false)
        el.removeEventListener(wheelEvent, deputise_for_wheel, wheelOpt)
        el.removeEventListener('touchmove', preventDefault, wheelOpt)
        el.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    }

    return release_native_scroll
}

