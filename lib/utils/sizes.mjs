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
    return (matches_count * options.min_height_per_match + options.padding_bottom)
        - get_height_available_for_matches(canvas_height, options)
}

export const measure_round_heights = (
    matches_count,
    options,
    canvas_height
) => {
    const height_deficit = get_height_deficit_for_round(
        matches_count,
        options,
        canvas_height
    )
    
    const height_per_match = Math.max(
        options.min_height_per_match,
        (get_height_available_for_matches(canvas_height, options) - options.padding_bottom)
            / matches_count
    )

    return { height_deficit, height_per_match }
}


export const get_match_center_Y = (
    options,
    height_per_match,
    match_order,
    this_round_scroll_Y
) => {
    return (
        get_round_title_height(options)
        + height_per_match * (match_order - 0.5)
        - this_round_scroll_Y
    )
}

export const get_total_content_height = (options, longest_round_match_count) => {
    return (
        get_round_title_height(options)
        + options.min_height_per_match * longest_round_match_count
        + options.padding_bottom
    )
}

export const get_single_player_scores_width = (score, options, ctx) => {
    return score
        .map(score => (
            ctx.measureText(score).width
            + options.score_hor_padding*2
            + options.score_hor_margin*2
        ))
        .reduce((a, b) => a + b, 0)
}
