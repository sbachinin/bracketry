import { get_main_canvas } from './utils.mjs'
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

export const get_height_deficit_for_round = (
    match_count,
    options,
) => {
    return (
        get_all_matches_height_with_paddings(match_count, options)
        - get_main_canvas().height
    )
}

const get_height_per_match = (matches_count, options) => {
    return Math.max(
        get_min_height_per_match(options),
        (get_main_canvas().height
            - options.matches_padding_top
            - options.matches_padding_bottom
        ) / matches_count
    )
}
export const get_all_matches_height_with_paddings = (first_round_match_count, options) => {
    return (
        get_min_height_per_match(options) * first_round_match_count
        + options.matches_padding_top
        + options.matches_padding_bottom
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

export const is_match_visible_Y = (center_scroll_Y, options) => {
    return center_scroll_Y > -get_min_height_per_match(options)/2
        && (center_scroll_Y - get_min_height_per_match(options)/2) < get_main_canvas().height
}

export const get_round_scroll_Y_px = (round, scroll_Y, options) => {
    const round_height_deficit = get_height_deficit_for_round(round.matches.length, options)
    return round_height_deficit > 0
        ? round_height_deficit / 100 * scroll_Y
        : 0
}


export const get_match_center_scroll_Y = (round, scroll_Y, match_index, options) =>{ 
    return options.matches_padding_top
        + get_height_per_match(round.matches.length, options) * (match_index + 0.5)
        - get_round_scroll_Y_px(round, scroll_Y, options)
}

export const get_root_el_height = (user_wrapper, options) => {
    if (options.auto_canvas_size) return 'auto'

    const min_height = get_round_title_height(options) + MAIN_CANVAS_MIN_HEIGHT
    return Math.max(
        min_height,
        user_wrapper.offsetHeight
    ) + 'px'
}