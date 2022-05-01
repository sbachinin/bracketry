import {
    get_round_title_height,
    get_round_height,
    get_round_width } from '../utils/sizes.mjs'
import { MAIN_CANVAS_MIN_HEIGHT } from '../constants.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const {
        the_root_element,
        round_titles,
        matches_vertical_scroller,
        matches_scrollable_area,
        lines_canvas,
        left_scroll_button, right_scroll_button
    } = root_elements

    // create vert scroll buttons, if they weren't
    /* 
        if (!options.auto_content_size
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
    
        the_root_element.style.width = options.auto_content_size ? 'auto' : '100%'
        // inline-block is to make it expand to the width of the main_canvas which will be as wide as the actual drawn content
        the_root_element.style.display = options.auto_content_size ? 'inline-block' : 'block'
     */

    the_root_element.style.height = the_root_element.parentElement.clientHeight > MAIN_CANVAS_MIN_HEIGHT
        ? '100%'
        : (MAIN_CANVAS_MIN_HEIGHT + get_round_title_height(options)) + 'px'
    the_root_element.style.backgroundColor = options.background_color

    matches_scrollable_area.style.margin = options.main_vertical_padding + 'px 0'

    const anchor_round_height = get_round_height(
        all_data.rounds.length - 1 - Math.floor(state.anchor_round_index),
        matches_vertical_scroller.clientHeight,
        options
    )

    const content_width = get_round_width(root_elements) * all_data.rounds.length
    lines_canvas.height = anchor_round_height
    lines_canvas.style.height = anchor_round_height + 'px'
    lines_canvas.width = content_width
    lines_canvas.style.width = content_width
    lines_canvas.style.backgroundColor = options.background_color


    
    
// apply options for hor buttons
    const in_gutters = options.horizontal_scroll_buttons_position === 'In the gutters'
    const buttons_are_hidden = options.horizontal_scroll_buttons_position === 'Hidden' || options.auto_content_size
    
    left_scroll_button.innerHTML = options.left_scroll_button_icon
    left_scroll_button.style.display = buttons_are_hidden ? 'none' : 'flex'
    left_scroll_button.style.position = in_gutters ? 'static' : 'absolute'
    left_scroll_button.style.background = options.left_scroll_button_background
    left_scroll_button.style.borderRight = in_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none'
    left_scroll_button.style.width = options.horizontal_scroll_button_size
    left_scroll_button.style.top = options.scroll_buttons_top_distance
    left_scroll_button.style.transform = in_gutters ? 'none' : 'translate(0, -50%)'
    left_scroll_button.style.minHeight = in_gutters ? '100%' : options.horizontal_scroll_button_size

    right_scroll_button.innerHTML = options.right_scroll_button_icon
    right_scroll_button.style.display = buttons_are_hidden ? 'none' : 'flex'
    right_scroll_button.style.position = in_gutters ? 'static' : 'absolute'
    right_scroll_button.style.background = options.right_scroll_button_background
    right_scroll_button.style.borderLeft = in_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none'
    right_scroll_button.style.width = options.horizontal_scroll_button_size
    right_scroll_button.style.top = options.scroll_buttons_top_distance
    right_scroll_button.style.transform = in_gutters ? 'none' : 'translate(0, -50%)'
    right_scroll_button.style.minHeight = in_gutters ? '100%' : options.horizontal_scroll_button_size

    const left_scroll_svg = left_scroll_button.querySelector('svg')
    const right_scroll_svg = right_scroll_button.querySelector('svg')
    if (left_scroll_svg) {
        left_scroll_svg.style.fill = options.horizontal_scroll_buttons_svg_color
    }
    if (right_scroll_svg) {
        right_scroll_svg.style.fill = options.horizontal_scroll_buttons_svg_color
    }

    
    if (options.hide_round_titles) {
        round_titles.style.display = 'none'
    } else {
        round_titles.style.display = 'flex'
        round_titles.style.height = options.round_titles_height
        round_titles.style.fontSize = options.round_title_font_size + 'px'
        round_titles.style.fontFamily = options.round_title_font_family || options.root_font_family
        round_titles.style.color = options.round_title_color
        round_titles.style.borderBottom = `1px solid ${options.round_titles_border_bottom_color}`
    }

}
