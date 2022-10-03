export const try_get_custom_element = (
    custom_getter,
    custom_getter_args,
    custom_getter_name
) => {

    if (typeof custom_getter === 'function') {
        try {
            const val = custom_getter(...custom_getter_args)
            if (val instanceof Element || val === null) {
                return val
            } else {
                throw `options.${custom_getter_name} must return an Element or null, instead returned: ${val}`
            }
        } catch (e) {
            console.warn(`Failed to get a valid return from ${custom_getter_name}.`, e)
        }
    }

    return undefined
}
