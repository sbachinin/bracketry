// https://stackoverflow.com/a/4770179
const preventDefault = (e) => {
    if (!e.target.closest('.matches-vertical-scroller')) {
        e.preventDefault()
    }
}

const preventDefaultForScrollKeys = (e) => {
    if (e.keyCode >= 32 && e.keyCode <= 40) { // space, arrows, home, end, pgup, pddown
        preventDefault(e)
        return false
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true } 
    }))
} catch(e) {}

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

export const disable_window_scroll = () => {
    window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

export const enable_window_scroll = () => {
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt) 
    window.removeEventListener('touchmove', preventDefault, wheelOpt)
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false)   
}

    
