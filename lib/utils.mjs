export const debounce = (fn, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
}

// unused
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
    let ready = true
    let args = null

    return function throttled() {
        var context = this

        if (ready) {
            ready = false

            setTimeout(function() {
                ready = true

                if (args) {
                    throttled.apply(context)
                }
            }, delay)

            if (args) {
                callback.apply(this, args)
                args = null
            } else {
                callback.apply(this, arguments)
            }
        } else {
            args = arguments
        }
    }
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

export const is_valid_number = (v) => typeof v === 'number' && !isNaN(v)

export const create_element_from_Html = htmlString => {
    if (typeof htmlString !== 'string') {
        console.warn('create_element_from_Html expects an html string, instead got: ', htmlString)
        return document.createElement('div')
    }

    const div = document.createElement('div')
    div.innerHTML = htmlString.trim()
    if (!div.firstElementChild) {
        console.warn(`create_element_from_Html: failed to create an element from string: "${htmlString}"`)
        return document.createElement('div')
    }
    return div.firstElementChild
}

export const remove_whitespace_from_html = string => string.replace(/>\s+</g,'><')

export const insert_styles = (root_id, styles_id, styles) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${root_id}-${styles_id}'>${styles}</style>`
    )
}

export const get_n_things = (n, cb) => {
    return Array.from(Array(n)).map((_, i) => cb(i))
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

// prevent initial resize call
export const observe_resize_later = (el, cb) => {
    let was_resized = false
    new ResizeObserver(debounce(
        () => {
            if (!was_resized) {
                was_resized = true
                return
            }
            cb()
        }
    )).observe(el)
}
