import { 
    get_round_title_height,
    get_all_matches_height_with_paddings
} from '../utils/sizes.mjs'

export const measure_main_canvas = (the_root_element, first_round_match_count, options) => {
    const canvas_hor_margin = (
        options.horizontal_scroll_triggered_by === 'buttons'
        && options.horizontal_scroll_buttons_position === 'In the gutters'
    ) ? options.horizontal_scroll_buttons_clickable_width : 0

    const canvas_width = the_root_element.offsetWidth - canvas_hor_margin * 2

    const canvas_vert_margin = (
        options.vertical_scroll_triggered_by === 'buttons'
        && options.vertical_scroll_buttons_position === 'In the gutters'
    ) ? options.vertical_scroll_buttons_clickable_height : 0

    let canvas_height = the_root_element.offsetHeight
        - (options.hide_round_titles ? 0 : get_round_title_height(options))
        - canvas_vert_margin * 2

    if (options.auto_canvas_size) {
        canvas_height = get_all_matches_height_with_paddings(first_round_match_count, options)
    }

    return {
        canvas_width,
        canvas_height, 
        canvas_hor_margin,
        canvas_vert_margin
    }
}