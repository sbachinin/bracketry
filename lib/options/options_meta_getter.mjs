import { OPTIONS } from './options_meta.mjs'

export const get_options_flattened_meta = () => {
    const flattened = {}
    Object.values(OPTIONS).forEach(options_of_kind => Object.assign(flattened, options_of_kind))
    return flattened
}

export const get_default_options = () => {
    const default_options = {}
    Object.entries(get_options_flattened_meta())
        .forEach(([option_name, { default_value }]) => {
            default_options[option_name] = default_value
        })
    return default_options
}

export const get_option_meta = option_name => get_options_flattened_meta()[option_name]

export const get_all_options_names = () => Object.keys(get_options_flattened_meta())