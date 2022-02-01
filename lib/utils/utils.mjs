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

export const get_fitting_string = (ctx, str, max_width) => {
    let width = ctx.measureText(str).width;
    const ellipsis = '…';
    const ellipsis_width = ctx.measureText(ellipsis).width;
    if (width <= max_width || width <= ellipsis_width) {
        return str;
    } else {
        let len = str.length;
        while (width >= max_width - ellipsis_width && len-- > 0) {
            str = str.substring(0, len);
            width = ctx.measureText(str).width;
        }
        return str + ellipsis;
    }
}