// non-existent option names
// wrong value types



import { get_default_options, get_options_flattened_meta } from './options_meta_getter.mjs'

export const shout_impossible_option_value = (option_name, option_value) => {
    console.warn(
        `Impossible value %c${JSON.stringify(option_value, null, 2)}%c provided for ${option_name} option.`
        + ` Default value of %c${get_default_options()[option_name]}%c will be used instead`,
        'background: pink',
        '',
        'background: #c7ffc9',
        ''
    )
}

export const validate_user_options = (o) => {
    const all_options_meta = get_options_flattened_meta()

    Object.entries(some_options).forEach(([option_name, option_value]) => {

// valid option name?
        const option_meta = all_options_meta[option_name]
        if (!option_meta) {
            console.warn(`Unknown option provided: %c${option_name}`, 'background: pink; font-weight: bold')
            return
        }

// valid option value?
// could guess this in options.get_final_value

    })

}