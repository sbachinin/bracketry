import { get_round_title_height, get_round_height } from '../utils/sizes.mjs'
import { MAIN_CANVAS_MIN_HEIGHT } from '../constants.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const {
        the_root_element,
        matches_scroller,
        main_canvas_el,
        round_titles_canvas_el
    } = root_elements

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

    matches_scroller.style.height = `calc(100% - ${get_round_title_height(options)}px)`
    matches_scroller.style.paddingLeft = options.horizontal_scroll_buttons_clickable_width + 'px'

    const anchor_round_height = get_round_height(all_data.rounds[Math.floor(state.anchor_round_index)], matches_scroller.clientHeight, options)

    main_canvas_el.height = anchor_round_height
    main_canvas_el.style.height = anchor_round_height + 'px'
    main_canvas_el.style.backgroundColor = options.background_color

    root_elements.hor_buttons.apply_options(options)





    if (options.hide_round_titles) {
        round_titles_canvas_el.style.display = 'none'
    } else {
        round_titles_canvas_el.height = get_round_title_height(options)
        round_titles_canvas_el.style.display = 'block'
        round_titles_canvas_el.style.backgroundColor = options.background_color
        round_titles_canvas_el.style.paddingLeft = options.horizontal_scroll_buttons_clickable_width + 'px'
    }
}
