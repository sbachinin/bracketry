import { get_round_title_height, get_round_height } from '../utils/sizes.mjs'
import { MAIN_CANVAS_MIN_HEIGHT } from '../constants.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const {
        the_root_element,
        matches_content_area,
        lines_canvas,
        round_titles,
        left_scroll_button, right_scroll_button
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


    const anchor_round_height = get_round_height(all_data.rounds[Math.floor(state.anchor_round_index)], matches_content_area.clientHeight, options)

    lines_canvas.height = anchor_round_height
    lines_canvas.style.height = anchor_round_height + 'px'
    lines_canvas.style.backgroundColor = options.background_color


    
    
// apply options for hor buttons
    const left_clickable_area = left_scroll_button.querySelector('.button-clickable-area')
    const right_clickable_area = right_scroll_button.querySelector('.button-clickable-area')
    const clickable_area_position = options.horizontal_scroll_buttons_position === 'In the gutters' ? 'static' : 'absolute'
    left_clickable_area.innerHTML = options.left_scroll_button_icon
    right_clickable_area.innerHTML = options.right_scroll_button_icon
    left_clickable_area.style.position = clickable_area_position
    right_clickable_area.style.position = clickable_area_position
    left_clickable_area.style.width = options.horizontal_scroll_buttons_clickable_width + 'px'
    right_clickable_area.style.width = options.horizontal_scroll_buttons_clickable_width + 'px'
    left_scroll_button.querySelector('svg')?.setAttribute('height', options.horizontal_scroll_icon_size)
    left_scroll_button.querySelector('svg')?.setAttribute('width', options.horizontal_scroll_icon_size)
    right_scroll_button.querySelector('svg')?.setAttribute('height', options.horizontal_scroll_icon_size)
    right_scroll_button.querySelector('svg')?.setAttribute('width', options.horizontal_scroll_icon_size)



    if (options.hide_round_titles) {
    } else {
        // round_titles_canvas_el.style.height = get_round_title_height(options)
    }
}
