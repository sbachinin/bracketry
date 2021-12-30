export const get_round_left_X = (options, round_index) => {
    return (options.match_width + options.distance_between_rounds) * round_index
        + options.padding_left
}

export const get_all_content_width = (options, rounds_count) => {
    return (
        rounds_count * options.match_width
        + (rounds_count-1) * options.distance_between_rounds
        + options.padding_left
        + options.padding_right
    )
}

export const get_round_title_height = options => {
    return options.padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_height_available_for_matches = (canvas_height, options) => {
    return canvas_height - get_round_title_height(options)
}

export const get_height_deficit_for_round = (
    matches_count,
    options,
    canvas_height
) => {
    return matches_count * options.min_height_per_match
        - get_height_available_for_matches(canvas_height, options)
}
    
    
    
    