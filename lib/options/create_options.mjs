import { get_default_options, get_flattened_options } from './get_default_options.mjs'
import { deep_clone_object, is_object } from '../utils/utils.mjs'

export const create_options = (orig_user_options) => {
    const user_options = deep_clone_object(orig_user_options)

    const actual_options = Object.assign({}, get_default_options(), user_options)

    Object.entries(user_options).forEach(([option_name, option_value]) => {
        const option_meta = get_flattened_options()[option_name]

// check for misspelled options
        if (!option_meta) {
            console.warn(`Unknown option provided: %c${option_name}`, 'background: pink; font-weight: bold')
            return
        }

// try fix options of wrong type
        if (option_meta.type === 'number' && typeof option_value !== 'number') {
            option_value = parseInt(option_value)
            if (Number.isNaN(option_value)) {
                warn(option_name, option_value)
                option_value = get_default_options()[option_name]
            }
        }

        if (
            (option_meta.type === 'string' || option_meta.type === 'multiline_string')
            && typeof option_value !== 'string'
        ) {
            warn(option_name, option_value)
            option_value = get_default_options()[option_name]
        }

        if (option_meta.type === 'function_or_null' && typeof option_value !== 'function' && option_value !== null) {
            warn(option_name, option_value)
            option_value = get_default_options()[option_name]
        }

        if (option_meta.type === 'boolean' && typeof option_value !== 'boolean') {
            if (option_value === 'false') {
                option_value = false
            } else if (option_value === 'true') {
                option_value = true
            } else {
                warn(option_name, option_value)
                option_value = get_default_options()[option_name]
            }
        }
        
        if (option_meta.type === 'select'
            && !option_meta.options.find(o => is_object(o) ? (o.value === option_value) : (o === option_value))
        ) {
            warn(option_name, option_value)
            option_value = get_default_options()[option_name]
        }
        
// ensure min numbers
        if (option_meta.type === 'number' && typeof option_meta.min_value === 'number') {
            option_value = Math.max(option_value, option_meta.min_value)
        }

        actual_options[option_name] = option_value
    })
    return actual_options
}