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

export const get_fitting_string = (c, str, max_width) => {
    let width = c.measureText(str).width;
    const ellipsis = '…';
    const ellipsis_width = c.measureText(ellipsis).width;
    if (width <= max_width || width <= ellipsis_width) {
      return str;
    } else {
      let len = str.length;
      while (width >= max_width - ellipsis_width && len-- > 0) {
        str = str.substring(0, len);
        width = c.measureText(str).width;
      }
      return str + ellipsis;
    }
  }
