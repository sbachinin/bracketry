import { 
    get_round_title_height,
    get_matches_height_for_round
} from '../utils/sizes.mjs'

export const measure_main_canvas = (the_root_element, all_data, options) => {
    let canvas_hor_margin = 0
    if (!options.auto_canvas_size
        && options.horizontal_scroll_buttons_position === 'In the gutters'
    ) {
        canvas_hor_margin = options.horizontal_scroll_buttons_clickable_width
    }

    let canvas_width = the_root_element.clientWidth - canvas_hor_margin * 2
    if (options.auto_canvas_size) {
        canvas_width = all_data.width_per_round * all_data.rounds.length
    }

    let canvas_vert_margin = 0
    if (!options.auto_canvas_size
        && options.vertical_scroll_triggered_by === 'buttons'
        && options.vertical_scroll_buttons_position === 'In the gutters'
    ) {
        canvas_vert_margin = options.vertical_scroll_buttons_clickable_height
    }
    
    let canvas_height = the_root_element.clientHeight
        - (options.hide_round_titles ? 0 : get_round_title_height(options))
        - canvas_vert_margin * 2

    if (options.auto_canvas_size) {
        canvas_height = get_matches_height_for_round(all_data.rounds[0].matches.length, options)
    }

    return {
        canvas_width,
        canvas_height, 
        canvas_hor_margin,
        canvas_vert_margin
    }
}