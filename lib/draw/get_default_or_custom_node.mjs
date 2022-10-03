export const get_default_or_custom_node = (default_getter, user_getter, user_getter_args, user_getter_name) => {
    // try get HTML from custom user renderer, otherwise use bare_value
    if (typeof user_getter === 'function') {
        try {
            const val = user_getter(...user_getter_args)
            if (typeof val === 'string') {
                return val.trim()
            } else if (val instanceof Element) {
                return val
            } else {
                throw `options.${user_getter_name} must return an Element or a string, instead returned: ${val}`
            }
        } catch (e) {
            console.warn(`Failed to get an Element or a string from ${user_getter_name}.`, e)
        }
    }

    const default_val = default_getter()
    if (typeof default_val === 'string') {
        return default_val.trim()
    }
    if (default_val instanceof Element) {
        return default_val
    }

    return ''
}
