import { OPTIONS } from '../options.mjs'

export const get_default_options = () => {
    const default_options = {}
    Object.entries(OPTIONS).forEach(([option_name, { default_value }]) => {
        default_options[option_name] = default_value
    })
    return default_options
}
