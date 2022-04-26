import { within_range } from './utils.mjs'

export const get_round_title_height = options => {
    return options.round_titles_padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_match_middle_Y = (all_data, round_index, match_order, canvas_height) => {
    const matches_count_of_round = Math.pow(2, all_data.rounds.length - 1 - round_index)
    const height_per_match_of_round = canvas_height / matches_count_of_round
    return height_per_match_of_round * (match_order + 0.5)
}

export const get_match_body_height = (options) => {
    return options.match_font_size * 3.2 * options.teams_vertical_density / 10
}

export const get_round_height = (round, scroller_height, options) => {
    const height_per_match = options.min_horizontal_distance_btw_matches + get_match_body_height(options)
    const all_anchor_matches_height = round.matches.length * height_per_match
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


export const get_visible_rounds_count = (root_elements, options) => {
    // at least partly visible
    return (
        (root_elements.the_root_element.clientWidth - options.horizontal_scroll_buttons_clickable_width * 2)
        / get_round_width(root_elements)
    )
}


export const get_max_scroll_round_index = (root_elements, all_data, options) => {
    return all_data.rounds.length - get_visible_rounds_count(root_elements, options)
}


export const get_leftmost_visible_round_height = (
    all_data,
    anchor_round_last_index,
    root_elements,
    options
) => {
    const leftmost_visible_round_index = within_range(
        Math.floor(
            all_data.rounds.length
            - anchor_round_last_index
            - get_visible_rounds_count(root_elements, options)
        ),
        0,
        all_data.rounds.length
    )

    const leftmost_visible_round = all_data.rounds[leftmost_visible_round_index]


    return get_round_height(
        leftmost_visible_round,
        root_elements.matches_vertical_scroller.clientHeight,
        options)
}