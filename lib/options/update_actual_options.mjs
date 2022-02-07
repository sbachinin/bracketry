import {
    get_flattened_options,
    get_all_options_names,
    get_default_options
} from './get_default_options.mjs'

export const update_actual_options = (actual_options, orig_user_options) => {
    const user_options = JSON.parse(JSON.stringify(orig_user_options))
    const all_options_names = get_all_options_names()
    
// check for misspelled options
    Object.keys(user_options).forEach(option_name => {
        if (!all_options_names.includes(option_name)) {
            console.warn(`Unknown option provided: %c${option_name}`, 'background: pink; font-weight: bold')
        }
    })

    Object.assign(actual_options, user_options)


    Object.entries(user_options).forEach(([option_name, option_value]) => {
        const option_meta = get_flattened_options()[option_name]

// try fix options of wrong type
        if (option_meta.type === 'number' && typeof option_value !== 'number') {
            option_value = parseInt(option_value)
            if (Number.isNaN(option_value)) {
                option_value = get_default_options()[option_name]
            }
        }

        if (
            (option_meta.type === 'string' || option_meta.type === 'multiline_string')
            && typeof option_value !== 'string'
        ) {
            option_value = get_default_options()[option_name]
        }

        if (option_meta.type === 'boolean' && typeof option_value !== 'boolean') {
            if (option_value === 'false') {
                option_value = false
            } else if (option_value === 'true') {
                option_value = true
            } else {
                option_value = get_default_options()[option_name]
            }
        }
        
// ensure min numbers
        if (option_meta.type === 'number' && typeof option_meta.min_value === 'number') {
            option_value = Math.max(option_value, option_meta.min_value)
        }

        actual_options[option_name] = option_value
    })


    if (
        (actual_options.reduce_match_until_hovered || actual_options.reduce_match_until_clicked)
        && actual_options.highlight_team_history_on_click
    ) {
        console.warn(
            `When %c"reduce_match_until_hovered" %cor %c"reduce_match_until_clicked" %coptions are set to true, %c"highlight_team_history_on_click" %coption will be regarded as false`,
            'font-weight:bold',
            '',
            'font-weight:bold',
            '',
            'font-weight:bold;background:pink',
            'background:pink',
            )
        Object.assign(actual_options, { highlight_team_history_on_click: false })
    }

    if (actual_options.reduce_match_until_hovered) {
        Object.assign(actual_options, { reduce_match_until_clicked: false })
    }

    if (user_options.reduce_match_until_hovered || user_options.reduce_match_until_clicked) {
        Object.assign(actual_options, { show_full_title_tooltip: false })
    }
}