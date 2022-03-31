import { get_main_canvas } from './utils.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'
import { MAIN_CANVAS_MIN_HEIGHT } from '../constants.mjs'

export const get_round_left_X = (options, round_index, round_width) => {
    if (round_index === 0) return options.padding_left
    
    return options.padding_left
        + round_width * round_index
        + options.distance_between_rounds * round_index
}

export const get_all_content_width = (options, rounds_count, round_width) => {
    return (
        + rounds_count * round_width
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

export const is_round_visible_X = (round_width, round_scroll_X, options) => {
    return (round_scroll_X + round_width) > 0
        && (round_scroll_X - options.distance_between_rounds) < get_main_canvas().width
}

export const get_round_scroll_X = (round, state, options) => {
    return round.left_X - (options.auto_canvas_size ?  0 : state.scroll_X)
}

export const get_match_center_Y = (all_data, round_index, match_index, state, options) => {
    const { anchor_height_per_match, anchor_round_height_deficit } = analyze_anchor_round_height(all_data, state, options)
    const height_growth_factor = Math.pow(2, Math.max(round_index - state.scroll_X_anchor_round_index, 0))
    const height_per_match = anchor_height_per_match * height_growth_factor

    return (
        options.main_vertical_padding
        + (match_index + 0.5) * height_per_match
        - anchor_round_height_deficit / 100 * state.scroll_Y
    )
}

export const get_root_el_height = (user_wrapper, options) => {
    if (options.auto_canvas_size) return 'auto'

    const min_height = get_round_title_height(options) + MAIN_CANVAS_MIN_HEIGHT
    return Math.max(
        min_height,
        user_wrapper.clientHeight
    ) + 'px'
}


export const analyze_anchor_round_height = (all_data, state, options) => {
    const anchor_round = all_data.rounds[state.scroll_X_anchor_round_index]
    const anchor_height_per_match = Math.max(
        // minimum height per match:
        options.min_vert_margin_between_matches + get_match_body_height(options),
        // available canvas height per anchor round match:
        (get_main_canvas().height - options.main_vertical_padding * 2) / anchor_round.matches.length
    )

    const full_anchor_round_height = anchor_round.matches.length * anchor_height_per_match + options.main_vertical_padding * 2
    const anchor_round_height_deficit = full_anchor_round_height - get_main_canvas().height

    return {
        anchor_height_per_match, anchor_round_height_deficit
    }
}
