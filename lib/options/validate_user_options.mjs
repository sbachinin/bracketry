import { get_default_options, get_options_flattened_meta } from './options_meta_getter.mjs'
import { is_object } from '../utils.mjs'

let did_shout = false

export const shout_impossible_option_value = (option_name, option_value) => {
    requestAnimationFrame(() => {
        if (did_shout) return
        did_shout = true
        console.warn(
            `Impossible value %c${JSON.stringify(option_value, null, 2)}%c provided for ${option_name} option.`
            + ` Default value of %c${get_default_options()[option_name]}%c will be used instead`,
            'background: pink',
            '',
            'background: #c7ffc9',
            ''
        )
    })
}

export const validate_user_options = (user_options) => {
    if (!is_object(user_options)) {
        console.warn('Options must be an object, instead got: ', user_options)
        return
    }

    const all_options_meta = get_options_flattened_meta()

    Object.entries(user_options).forEach(([option_name, option_value]) => {

// valid option name?
        const option_meta = all_options_meta[option_name]
        if (!option_meta) {
            console.warn(`Unknown option provided: %c${option_name}`, 'background: pink; font-weight: bold')
            return
        }
    })
}