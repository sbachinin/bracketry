export const deprecated_get_single_score_width = ({ main_score, tie_break }, options, ctx) => {
    ctx.save()
    ctx.font = `bold ${options.score_font_size}px ${options.score_font_family}`;
    const main_score_width = ctx.measureText(main_score).width

    let tie_break_width = 0
    if (tie_break !== undefined) {
        ctx.font = `bold ${options.score_font_size/1.6}px ${options.score_font_family}`;
        tie_break_width = ctx.measureText(tie_break).width
    }

    ctx.restore()
    return main_score_width + tie_break_width
}

export const get_round_left_X = (options, round_index, round_width, first_round_width) => {
    if (round_index === 0) return options.padding_left
    
    return options.padding_left
        + first_round_width
        + round_width * (round_index-1)
        + options.distance_between_rounds * round_index
}

export const get_all_content_width = (options, rounds_count, round_width, first_round_width) => {
    return (
        first_round_width
        + (rounds_count-1) * round_width
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

export const get_total_content_height = (options, longest_round_match_count) => {
    return (
        get_round_title_height(options)
        + options.min_height_per_match * longest_round_match_count
        + options.padding_bottom
    )
}

export const deprecated_get_single_player_scores_width = (score, options, ctx) => {
    return score
        .map(single_score => {
            return (
                deprecated_get_single_score_width(single_score, options, ctx)
                + options.score_hor_margin*2
            )
        })
        .reduce((a, b) => a + b, 0)
}

export const get_match_body_height = (options) => {
    return options.vert_gap_between_opponents + options.team_title_font_size * 2
}

let longest_score_length = 0

export const measure_widths = (rounds, options, ctx) => {
    ctx.save();

    let widest_team_title_width = 0
    rounds.forEach(round => {
        round.matches.forEach(match => {
            ctx.font = `${options.team_title_font_size}px ${options.team_title_font_family}`
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].short_title).width,
                ctx.measureText(match.sides[1].short_title).width
            )
            longest_score_length = Math.max(
                longest_score_length,
                match.sides[0].score.length,
                match.sides[1].score.length,
            )
        })
    })

    ctx.restore();
    
    const team_title_width = Math.min(
        parseInt(options.team_title_max_width),
        widest_team_title_width
    )

    const scores_width = (options.score_font_size + options.score_hor_margin*2) * longest_score_length

    const is_match_reduced = options.reduce_match_until_clicked || options.reduce_match_until_hovered
    const round_width = options.match_padding_left
        + (options.draw_seed === 'At all rounds' ? options.seed_width : 0)
        + team_title_width
        + (is_match_reduced ? 0 : scores_width + options.scores_left_margin)
        + options.match_padding_right

    let first_round_width = round_width
    if (options.draw_seed === 'At first round') {
        first_round_width += options.seed_width
    }

    return {
        team_title_width,
        round_width,
        first_round_width
    }
}
