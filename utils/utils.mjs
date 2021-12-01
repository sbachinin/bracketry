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
