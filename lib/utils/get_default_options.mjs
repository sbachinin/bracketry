import * as OPTIONS from '../options.mjs'

const get_flattened_options = () => {
    const flattened = {}
    Object.values(OPTIONS).forEach(options_of_kind => Object.assign(flattened, options_of_kind))
    return flattened
}

export const get_default_options = () => {
    const default_options = {}
    Object.entries(get_flattened_options())
        .forEach(([option_name, { default_value }]) => {
            default_options[option_name] = default_value
        })
    return default_options
}
