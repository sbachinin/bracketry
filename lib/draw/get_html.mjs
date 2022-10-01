export const get_html = (bare_value, option_name, args, get_option) => {
    // try get HTML from custom user renderer, otherwise use bare_value
    let result = ''
    if (typeof bare_value === 'string') {
        result = bare_value.trim()
    }
    if (typeof get_option(option_name) === 'function') {
        try {
            const unreliable_value = get_option(option_name)(...args)
            if (typeof unreliable_value === 'string') {
                result = unreliable_value
            } else {
                throw `options.${option_name} must return a string, instead returned: ${unreliable_value}`
            }
        } catch (e) {
            console.warn(`Failed to get a string from ${option_name}.`, e)
        }
    }
    return result
}
