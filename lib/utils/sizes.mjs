import { get_main_canvas } from './utils.mjs'

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
    return options.round_titles_padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_round_title_left_X = (round_scroll_left_X, round_width, options) => {
    switch (options.round_title_text_align) {
        case 'left': return round_scroll_left_X + options.round_title_hor_margin
        case 'center': return round_scroll_left_X + round_width/2
        case 'right': return round_scroll_left_X + round_width - options.round_title_hor_margin
    }
}

export const get_height_deficit_for_round = (
    matches_count,
    options,
) => {
    return (
        matches_count * options.min_height_per_match
        + options.matches_padding_bottom
        + options.matches_padding_top
    ) - get_main_canvas().height
}

const get_height_per_match = (matches_count, options) => {
    return Math.max(
        options.min_height_per_match,
        (get_main_canvas().height
            - options.matches_padding_top
            - options.matches_padding_bottom
        ) / matches_count
    )
}
export const get_total_rounds_height = (options, longest_round_match_count) => {
    return options.min_height_per_match * longest_round_match_count
        + options.matches_padding_top + options.matches_padding_bottom
}

export const get_match_body_height = (options) => {
    return options.vert_gap_between_opponents + options.team_title_font_size * 2.5
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
        + (options.draw_seed === 'At all rounds' && !is_match_reduced ? options.seed_width : 0)
        + team_title_width
        + (is_match_reduced ? 0 : scores_width + options.scores_left_margin)
        + options.match_padding_right

    let first_round_width = round_width
    if (options.draw_seed === 'At first round' && !is_match_reduced) {
        first_round_width += options.seed_width
    }

    return {
        team_title_width: Math.floor(team_title_width),
        scores_width,
        round_width: Math.floor(round_width),
        first_round_width: Math.floor(first_round_width)
    }
}

export const is_round_visible_X = (round_width, round_scroll_X, options, canvas_width) => {
    return (round_scroll_X + round_width) > 0
        && (round_scroll_X - options.distance_between_rounds) < canvas_width
}

export const is_match_visible_Y = (center_scroll_Y, canvas_height, options) => {
    return center_scroll_Y > -options.min_height_per_match/2
        && (center_scroll_Y + options.min_height_per_match/2) < canvas_height
}

export const get_round_scroll_Y_px = (round, scroll_Y, options) => {
    const round_height_deficit = get_height_deficit_for_round(round.matches.length, options)
    return round_height_deficit > 0
        ? Math.floor(round_height_deficit / 100 * scroll_Y)
        : 0
}


export const get_match_center_scroll_Y = (round, scroll_Y, match_index, options) =>{ 
    return Math.floor(
        options.matches_padding_top
        + get_height_per_match(round.matches.length, options) * (match_index + 0.5)
        - get_round_scroll_Y_px(round, scroll_Y, options)
    )
}

export const get_team_texts_offset = options => {
    return Math.floor(options.vert_gap_between_opponents/2 + options.team_title_font_size/2)
}