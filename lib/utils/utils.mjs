import { MAIN_CANVAS_CLASS_NAME } from '../constants.mjs'

export const debounce = (fn, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
}

export const throttle = (fn, limit) => {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            setTimeout(
                () => {
                    waiting = false
                },
                limit
            );
        }
    }
}

export const throttle_with_trailing = (callback, delay) => {
    var ready = true,
        args = null;

    return function throttled() {
        var context = this;

        if (ready) {
            ready = false;

            setTimeout(function() {
                ready = true;

                if (args) {
                    throttled.apply(context);
                }
            }, delay);

            if (args) {
                callback.apply(this, args);
                args = null;
            } else {
                callback.apply(this, arguments);
            }
        } else {
            args = arguments;
        }
    };
}

export const create_unique_id = () => {
    return "id" + Math.random().toString(16).slice(2)
}

export const within_range = (number, min, max) => {
    return Math.max(Math.min(number, max), min)
}

export const is_object = variable => {
    return typeof variable === 'object'
        && !Array.isArray(variable)
        && variable !== null
}

export const get_main_canvas = () => document.querySelector(`.${MAIN_CANVAS_CLASS_NAME}`)

export const create_element_from_Html = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstElementChild;
}

export const insert_styles = (root_id, styles_id, styles) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${root_id}-${styles_id}'>${styles}</style>`
    )
}

export const update_styles = (root_id, styles_id, styles) => {
    const current_styles_node = document.head.querySelector(`#${root_id}-${styles_id}`)
    if (current_styles_node) document.head.removeChild(current_styles_node)
    insert_styles(root_id, styles_id, styles)
}

// underscore's "snapshot"
export const deep_clone_object = obj => {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    let temp = new obj.constructor()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deep_clone_object(obj[key])
        }
    }
    return temp
}

export const is_firefox = () => {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}

export const get_extension_from_filename = filename => {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
}