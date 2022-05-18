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
    return options.match_root_font_size * 3 + options.vertical_gap_between_sides
}

export const get_max_scroll_round_index = (
    { matches_vertical_scroller, content_horizontal_scroller },
    all_data
) => {
    const width_per_round = matches_vertical_scroller.scrollWidth / all_data.rounds.length
    const visible_width_in_rounds = content_horizontal_scroller.clientWidth / width_per_round
    return all_data.rounds.length - visible_width_in_rounds
}
