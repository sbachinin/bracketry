import { get_flattened_options, get_default_options } from './get_default_options.mjs'
import { is_object } from '../utils/utils.mjs'

const warn = (option_name, option_value) => {
    console.warn(
        `Impossible value %c${JSON.stringify(option_value, null, 2)}%c provided for ${option_name} option.`
        + ` Default value of %c${get_default_options()[option_name]}%c will be used instead`,
        'background: pink',
        '',
        'background: #c7ffc9',
        ''
    )
}

export const update_actual_options = (actual_options, orig_user_options, data_summary) => {
    const user_options = JSON.parse(JSON.stringify(orig_user_options))

    Object.assign(actual_options, user_options)

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

    if (user_options.auto_canvas_height) {
        Object.assign(actual_options, { vertical_scroll_triggered_by: 'wheel' })
    }

    if ('vertical_scroll_triggered_by' in user_options
        && user_options.vertical_scroll_triggered_by !== 'buttons'
    ) {
        Object.assign(actual_options, { vertical_scroll_buttons_position: 'On top of canvas' })
    }

    if ('horizontal_scroll_triggered_by' in user_options
        && user_options.horizontal_scroll_triggered_by !== 'buttons'
    ) {
        Object.assign(actual_options, { horizontal_scroll_buttons_position: 'On top of canvas' })
    }
}