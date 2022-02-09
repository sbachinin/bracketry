import { get_total_rounds_height, get_round_title_height } from '../utils/sizes.mjs'
import { create_horizontal_scroll_buttons } from '../horizontal_scroll/buttons/create_horizontal_scroll_buttons.mjs'
import { create_vertical_scroll_buttons } from '../vertical_scroll/create_vertical_scroll_buttons.mjs'

// set updater
export const update_root_elements = (root_elements, options, all_data, state) => {
    const { wrapper, main_canvas_el, round_titles_canvas_el,
        highlight_canvas_el, expand_canvas_el } = root_elements
    
// create buttons, if they weren't
    if (options.horizontal_scroll_triggered_by === 'buttons'
        && root_elements.hor_buttons === null
    ) {
        root_elements.hor_buttons = create_horizontal_scroll_buttons(all_data.root_id, options)
        wrapper.append(
            root_elements.hor_buttons.left_button, root_elements.hor_buttons.right_button)
    }
    root_elements.hor_buttons?.update_visibility(all_data.all_content_width, options, state.scroll_X)
    root_elements.hor_buttons?.apply_options(options)

// create vert scroll buttons
    // const vert_buttons = create_vertical_scroll_buttons(wrapper)



    wrapper.style.height = options.auto_canvas_height ? 'auto' : '100%'

    main_canvas_el.width = wrapper.clientWidth
    main_canvas_el.height = wrapper.clientHeight
        - (options.hide_round_titles ? 0 : get_round_title_height(options))

    if (options.auto_canvas_height) {
        main_canvas_el.height = get_total_rounds_height(options, all_data.rounds[0].matches.length)
    }
    main_canvas_el.style.backgroundColor = options.background_color
    
    if (options.hide_round_titles) {
        round_titles_canvas_el.style.display = 'none'
    } else {
        round_titles_canvas_el.width = wrapper.clientWidth
        round_titles_canvas_el.height = get_round_title_height(options)
        round_titles_canvas_el.style.display = 'block'
        round_titles_canvas_el.style.backgroundColor = options.background_color
    }

        highlight_canvas_el.style.top = get_round_title_height(options)
        highlight_canvas_el.width = wrapper.clientWidth
        highlight_canvas_el.height = wrapper.clientHeight

        expand_canvas_el.style.top = get_round_title_height(options)
        expand_canvas_el.width = wrapper.clientWidth
        expand_canvas_el.height = wrapper.clientHeight
}
