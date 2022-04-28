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

export const get_round_height = (round_last_index, scroller_height, options) => {
    const height_per_match = options.min_horizontal_distance_btw_matches + get_match_body_height(options)
    const matches_count = Math.pow(2, round_last_index)
    const all_anchor_matches_height = matches_count * height_per_match
    return Math.max(
        all_anchor_matches_height + options.main_vertical_padding * 2,
        scroller_height
    )
}

export const get_round_width = root_elements => {
    if (root_elements.rounds_elements_wrapper.firstChild) {
        return root_elements.rounds_elements_wrapper.firstChild.clientWidth
    }
    return 300
}


// returns fractional number of rounds at least partly visible
export const get_visible_rounds_count = (
    root_elements
) => root_elements.content_horizontal_scroller.clientWidth / get_round_width(root_elements)


export const get_max_scroll_round_index = (root_elements, all_data) => {
    return all_data.rounds.length - get_visible_rounds_count(root_elements)
}
