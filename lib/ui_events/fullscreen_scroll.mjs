// loosely based on https://stackoverflow.com/a/4770179
const preventDefault = (e) => {
    const scrollable_parent = e.target.closest('.matches-vertical-scroller')
    
    /* TODO research
        problems here:
        1) desktop & mobile: following operations must in theory trigger layout etc
            (though my performance measurements say it happens very fast)
        3) mobile: it's all quite terrible, touchmove event is not handled here and handling it will be a mess for sure
            + on mobile window scroll causes ugly changes to viewport height
    */
    if (!scrollable_parent) {
        e.preventDefault()
        return
    }

    const unable_to_scroll_up = e.deltaY < 0 && scrollable_parent.scrollTop <= 0
    const unable_to_scroll_down = (
        e.deltaY > 0
        && (scrollable_parent.scrollTop >= (scrollable_parent.scrollHeight - scrollable_parent.clientHeight))
    )
 
    if (
        unable_to_scroll_up
        || unable_to_scroll_down
        || (scrollable_parent.clientHeight >= scrollable_parent.scrollHeight) // not enough matches to be scrollable
    ) {
        e.preventDefault()
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true }
    }))
} catch (e) { }

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

export const disable_window_scroll = () => {
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
}

export const enable_window_scroll = () => {
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
}


