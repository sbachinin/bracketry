// https://stackoverflow.com/a/4770179

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

const preventDefault = (e) => {
    e.preventDefault()
}

const preventDefaultForScrollKeys = (e) => {
    if (keys[e.keyCode]) {
        preventDefault(e)
        return false
    }
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

export const restrict_native_scroll = (make_scroll_jump) => {

    const deputise_for_wheel = (e) => {
        e.preventDefault()
        make_scroll_jump(e.deltaY)
    }

    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, deputise_for_wheel, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)

    const release_native_scroll = () => {
        window.removeEventListener('DOMMouseScroll', preventDefault, false)
        window.removeEventListener(wheelEvent, deputise_for_wheel, wheelOpt)
        window.removeEventListener('touchmove', preventDefault, wheelOpt)
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
    }

    return release_native_scroll
}

