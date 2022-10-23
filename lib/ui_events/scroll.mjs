// https://stackoverflow.com/a/4770179

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
export const disable_scroll = (el) => {
    el.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    el.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    el.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    el.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
export const enable_scroll = (el) => {
    el.removeEventListener('DOMMouseScroll', preventDefault, false);
    el.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    el.removeEventListener('touchmove', preventDefault, wheelOpt);
    el.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}