import { get_round_title_height, get_min_height_per_match } from '../utils/sizes.mjs'
import { create_horizontal_scroll_buttons } from '../horizontal_scroll/buttons/create_horizontal_scroll_buttons.mjs'
import { MAIN_CANVAS_MIN_HEIGHT } from '../constants.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const { the_root_element, main_canvas_wrapper, main_canvas_el, round_titles_canvas_el } = root_elements

    // create vert scroll buttons, if they weren't
    /* 
        if (!options.auto_canvas_size
            && options.vertical_scroll_triggered_by === 'buttons'
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
    
        the_root_element.style.width = options.auto_canvas_size ? 'auto' : '100%'
        // inline-block is to make it expand to the width of the main_canvas which will be as wide as the actual drawn content
        the_root_element.style.display = options.auto_canvas_size ? 'inline-block' : 'block'
     */

    the_root_element.style.height = the_root_element.parentElement.clientHeight > MAIN_CANVAS_MIN_HEIGHT
        ? '100%'
        : (MAIN_CANVAS_MIN_HEIGHT + get_round_title_height(options)) + 'px'
    the_root_element.style.backgroundColor = options.background_color

    main_canvas_wrapper.style.height = `calc(100% - ${get_round_title_height(options)}px)`
    main_canvas_wrapper.style.paddingLeft = options.horizontal_scroll_buttons_clickable_width + 'px'

    const canvas_height = get_min_height_per_match(options) * all_data.rounds[0].matches.length
        + options.main_vertical_padding * 2

    main_canvas_el.width = all_data.width_per_round * all_data.rounds.length
    main_canvas_el.height = canvas_height
    main_canvas_el.style.backgroundColor = options.background_color

// create hor scroll buttons, if they weren't
    const content_is_wider = all_data.width_per_round * all_data.rounds.length > root_elements.main_canvas_el.width

    if (content_is_wider && root_elements.hor_buttons === null) {
        root_elements.hor_buttons = create_horizontal_scroll_buttons(the_root_element, all_data.root_id, options)
        the_root_element.append(
            root_elements.hor_buttons.left_button.wrapper,
            root_elements.hor_buttons.right_button.wrapper
        )
    }
    root_elements.hor_buttons?.update_visibility(all_data, options, state.scroll_X_anchor_round_index)
    root_elements.hor_buttons?.apply_options(options)





    if (options.hide_round_titles) {
        round_titles_canvas_el.style.display = 'none'
    } else {
        round_titles_canvas_el.width = all_data.width_per_round * all_data.rounds.length
        round_titles_canvas_el.height = get_round_title_height(options)
        round_titles_canvas_el.style.display = 'block'
        round_titles_canvas_el.style.backgroundColor = options.background_color
        round_titles_canvas_el.style.paddingLeft = options.horizontal_scroll_buttons_clickable_width + 'px'
    }
}
