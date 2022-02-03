export const get_adjusted_options = (user_options) => {
    const adjusted_options = JSON.parse(JSON.stringify(user_options))

    if (user_options.reduce_match_until_hovered
        || user_options.reduce_match_until_clicked
    ) {
        // should console.warn if user intended to highlight
        adjusted_options.highlight_team_history_on_click = false
    }

    // if ...hovered, unset ...clicked

    return adjusted_options
}