import { get_default_options } from './options_meta_getter.mjs'
import { debounce, is_object, is_valid_number } from '../utils.mjs'

export const shout_impossible_option_value = debounce((option_name, option_value) => {
    console.warn(
        `Impossible value provided for "${option_name}" option: %c${JSON.stringify(option_value, null, 2)}%c.
Default value of %c${get_default_options()[option_name]}%c will be used instead`,
        'background: #c7ffc9; color: black; padding: 0 3px',
        '',
        'background: pink; color: black; padding: 0 3px',
        ''
    )
}, 0)


const is_valid_option_type = (value, meta) => {
    switch (meta.type) {
        case 'number':
        case 'pixels': {
            return is_valid_number(value)
        }
        case 'multiline_string':
        case 'string': {
            return typeof value === 'string'
        }
        case 'function_or_null': {
            return typeof value === 'function' || value === null
        }
        case 'boolean': {
            return typeof value === 'boolean'
        }
        case 'select': {
            return meta.options?.find(o => is_object(o) ? (o.value === value) : (o === value))
        }
    }
}


export const is_valid_option = (name, value, meta) => {
    if (!meta) {
        console.warn(`Unknown option provided: %c${name}`, 'background: pink; color: black; font-weight: bold; padding: 0 3px;')
        return false
    } else if (!is_valid_option_type(value, meta)) {
        shout_impossible_option_value(name, value)
        return false
    }
    return true
}
