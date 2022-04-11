import { get_main_canvas } from './utils.mjs'

export const get_round_title_height = options => {
    return options.round_titles_padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_round_title_left_X = (round_left_X, width_per_round, options) => {
    switch (options.round_title_text_align) {
        case 'left': return round_left_X + options.round_title_hor_margin + options.match_hor_margin
        case 'center': return round_left_X + width_per_round / 2
        case 'right': return round_left_X + width_per_round - options.round_title_hor_margin - options.match_hor_margin
    }
}

export const get_matches_height_for_round = (match_count, options) => {
    return (
        get_min_height_per_match(options) * match_count
        + options.main_vertical_padding * 2
    )
}

export const get_match_body_height = options => {
    return options.match_font_size * 3.1
}

export const get_min_height_per_match = options => {
    return get_match_body_height(options) + options.min_vert_margin_between_matches
}

export const is_round_visible_X = (width_per_round, round_scroll_X) => {
    return (round_scroll_X + width_per_round) > 0
        && round_scroll_X < get_main_canvas().width
}

export const get_match_middle_Y = (all_data, round_index, match_index) => {
    const round = all_data.rounds[round_index]
    const height_per_match_of_round = get_main_canvas().height / round.matches.length
    return height_per_match_of_round * (match_index + 0.5)
}

export const get_round_height = (round, scroller_height, options) => {
    const all_anchor_matches_height = round.matches.length * get_min_height_per_match(options)
    return Math.max(
        all_anchor_matches_height + options.main_vertical_padding * 2,
        scroller_height
    )
}
/* 
export const analyze_anchor_round_height = (all_data, state, options) => {
    const anchor_round = all_data.rounds[state.anchor_round_index]
    const anchor_height_per_match = Math.max(
        // minimum height per match:
        get_min_height_per_match(options),
        // available canvas height per anchor round match:
        (get_main_canvas().height - options.main_vertical_padding * 2) / anchor_round.matches.length
    )

    const full_anchor_round_height = anchor_round.matches.length * anchor_height_per_match + options.main_vertical_padding * 2
    const anchor_round_height_deficit = full_anchor_round_height - get_main_canvas().height

    return {
        anchor_height_per_match, anchor_round_height_deficit
    }
}
 */