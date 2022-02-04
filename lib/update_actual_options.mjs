import { get_default_options, get_all_options_names } from './utils/get_default_options.mjs'

export const update_actual_options = (actual_options, user_options) => {
    const all_options_names = get_all_options_names()
    Object.keys(user_options).forEach(option_name => {
        if (!all_options_names.includes(option_name)) {
            console.warn(`Unknown option provided: %c${option_name}`, 'background: pink; font-weight: bold')
        }
    })

    Object.assign(actual_options, get_default_options(), user_options)

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

    if (actual_options.reduce_match_until_hover) {
        Object.assign(actual_options, { reduce_match_until_clicked: false })
    }

    // + reduce vs tooltip
}