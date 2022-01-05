export const get_round_left_X = (options, round_index, round_width) => {
    return (round_width + options.distance_between_rounds) * round_index
        + options.padding_left
}

export const get_all_content_width = (options, rounds_count, round_width) => {
    return (
        rounds_count * round_width
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

export const measure_widths = (rounds, options, ctx) => {
    ctx.save();

    let widest_team_title_width = 0
    let widest_team_score_width = 0
    rounds.forEach(round => {
        round.matches.forEach(match => {
            ctx.font = `${options.team_title_font_size}px ${options.team_title_font_family}`
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].title).width,
                ctx.measureText(match.sides[1].title).width
            )
            ctx.font = `bold ${options.score_size}px ${options.score_font_family}`;
            widest_team_score_width = Math.max(
                widest_team_score_width,
                get_single_player_scores_width(match.sides[0].score, options, ctx),
                get_single_player_scores_width(match.sides[1].score, options, ctx),
            )
        })
    })

    ctx.restore();
    
    return {
        widest_team_title_width,
        round_width: options.match_padding_left
            + widest_team_title_width
            + options.scores_left_margin
            + widest_team_score_width
            + options.match_padding_right
    }
}
