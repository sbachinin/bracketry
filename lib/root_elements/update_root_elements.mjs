import { measure_main_canvas } from './measure_main_canvas.mjs'
import { get_root_el_height,
    get_round_title_height
} from '../utils/sizes.mjs'
import { create_horizontal_scroll_buttons } from '../horizontal_scroll/buttons/create_horizontal_scroll_buttons.mjs'
import { create_vertical_scroll_buttons } from '../vertical_scroll/create_vertical_scroll_buttons.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const { the_root_element, main_canvas_el, round_titles_canvas_el,
        highlight_canvas_el } = root_elements
    
// create hor scroll buttons, if they weren't
    if (options.horizontal_scroll_triggered_by === 'buttons'
        && root_elements.hor_buttons === null
    ) {
        root_elements.hor_buttons = create_horizontal_scroll_buttons(all_data.root_id, options)
        the_root_element.append(
            root_elements.hor_buttons.left_button.wrapper,
            root_elements.hor_buttons.right_button.wrapper
        )
    }
    root_elements.hor_buttons?.update_visibility(all_data, options, state.scroll_X_anchor_round_index)
    root_elements.hor_buttons?.apply_options(options)

// create vert scroll buttons, if they weren't
    if (options.vertical_scroll_triggered_by === 'buttons'
        && root_elements.vert_buttons === null
    ) {
        root_elements.vert_buttons = create_vertical_scroll_buttons(all_data.root_id, options)
        the_root_element.append(
            root_elements.vert_buttons.up_button.wrapper,
            root_elements.vert_buttons.down_button.wrapper
        )
    }
    root_elements.vert_buttons?.update_visibility(options, state.scroll_Y)
    root_elements.vert_buttons?.apply_options(options)




    the_root_element.style.height = get_root_el_height(
        the_root_element.parentElement, options
    )

    const {
        canvas_width,
        canvas_height, 
        canvas_hor_margin,
        canvas_vert_margin
    } = measure_main_canvas(the_root_element, all_data.rounds[0].matches.length, options)

    main_canvas_el.width = canvas_width
    main_canvas_el.height = canvas_height
    main_canvas_el.style.marginTop = canvas_vert_margin
    main_canvas_el.style.marginLeft = canvas_hor_margin
    main_canvas_el.style.backgroundColor = options.background_color
    
    if (options.hide_round_titles) {
        round_titles_canvas_el.style.display = 'none'
    } else {
        round_titles_canvas_el.width = canvas_width
        round_titles_canvas_el.height = get_round_title_height(options)
        round_titles_canvas_el.style.display = 'block'
        round_titles_canvas_el.style.backgroundColor = options.background_color
        round_titles_canvas_el.style.marginLeft = canvas_hor_margin
    }

    highlight_canvas_el.width = canvas_width
    highlight_canvas_el.height = canvas_height
    highlight_canvas_el.style.top = get_round_title_height(options) + canvas_vert_margin
    highlight_canvas_el.style.left = canvas_hor_margin
}
