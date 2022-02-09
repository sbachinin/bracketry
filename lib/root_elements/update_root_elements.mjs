import { get_total_rounds_height, get_round_title_height } from '../utils/sizes.mjs'
import { create_horizontal_scroll_buttons } from '../horizontal_scroll/buttons/create_horizontal_scroll_buttons.mjs'
import { create_vertical_scroll_buttons } from '../vertical_scroll/create_vertical_scroll_buttons.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const { wrapper, main_canvas_el, round_titles_canvas_el,
        highlight_canvas_el, expand_canvas_el } = root_elements
    
// create hor scroll buttons, if they weren't
    if (options.horizontal_scroll_triggered_by === 'buttons'
        && root_elements.hor_buttons === null
    ) {
        root_elements.hor_buttons = create_horizontal_scroll_buttons(all_data.root_id, options)
        wrapper.append(
            root_elements.hor_buttons.left_button.wrapper,
            root_elements.hor_buttons.right_button.wrapper
        )
    }
    root_elements.hor_buttons?.update_visibility(all_data, options, state.scroll_X)
    root_elements.hor_buttons?.apply_options(options)

// create vert scroll buttons, if they weren't
    if (options.vertical_scroll_triggered_by === 'buttons'
        && root_elements.vert_buttons === null
    ) {
        root_elements.vert_buttons = create_vertical_scroll_buttons(all_data.root_id, options)
        wrapper.append(
            root_elements.vert_buttons.up_button.wrapper,
            root_elements.vert_buttons.down_button.wrapper
        )
    }



    wrapper.style.height = options.auto_canvas_height ? 'auto' : '100%'

    const canvas_hor_margin = options.horizontal_scroll_buttons_position === 'In the gutters'
        ? options.horizontal_scroll_buttons_clickable_width
        : 0
    const canvas_width = wrapper.clientWidth - canvas_hor_margin * 2

    main_canvas_el.width = canvas_width
    main_canvas_el.height = wrapper.clientHeight
        - (options.hide_round_titles ? 0 : get_round_title_height(options))
    main_canvas_el.style.marginLeft = canvas_hor_margin

    if (options.auto_canvas_height) {
        main_canvas_el.height = get_total_rounds_height(options, all_data.rounds[0].matches.length)
    }
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

        highlight_canvas_el.style.top = get_round_title_height(options)
        highlight_canvas_el.width = canvas_width
        highlight_canvas_el.height = wrapper.clientHeight
        highlight_canvas_el.style.marginLeft = canvas_hor_margin

        expand_canvas_el.style.top = get_round_title_height(options)
        expand_canvas_el.width = canvas_width
        expand_canvas_el.height = wrapper.clientHeight
        expand_canvas_el.style.marginLeft = canvas_hor_margin
}
