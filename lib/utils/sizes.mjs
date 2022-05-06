export const get_round_title_height = options => {
    return options.round_titles_padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_match_middle_Y = (rounds_count, round_index, match_order, canvas_height) => {
    const matches_count_of_round = Math.pow(2, rounds_count - 1 - round_index)
    const height_per_match_of_round = canvas_height / matches_count_of_round
    return height_per_match_of_round * (match_order + 0.5)
}

export const get_match_body_height = (options) => {
    return options.match_root_font_size * 3 + options.vertical_distance_between_teams
}

// round height without a main_vertical padding!
export const get_round_height = (round_last_index, scroller_height, options) => {
    const height_per_match = options.min_vertical_distance_btw_matches + get_match_body_height(options)
    const matches_count = Math.pow(2, round_last_index)
    const all_anchor_matches_height = matches_count * height_per_match
    return Math.max(
        all_anchor_matches_height,
        scroller_height - options.main_vertical_padding * 2
    )
}


export const get_max_scroll_round_index = (stable_elements, all_data) => {
    const round_width = stable_elements.rounds_elements_wrapper.clientWidth / all_data.rounds.length
    const visible_rounds_count = stable_elements.content_horizontal_scroller.clientWidth / round_width
    return all_data.rounds.length - visible_rounds_count
}
