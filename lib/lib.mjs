import { debounce, create_unique_id } from './utils/utils.mjs'
import { create_canvas } from './utils/create_canvas.mjs'
import { draw_all } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { install_mouse_events } from './utils/install_mouse_events.mjs'
import { get_all_content_width } from './utils/sizes.mjs'
import { get_default_options } from './utils/get_default_options.mjs'

// if element gets WIDER on resize, right gap may appear
// This free space may be used to scroll back to show more rounds on the left
const try_adjust_scrollX_on_resize = (
    scrollX,
    all_content_width,
    root_container_width
) => {
    const maximum_visible_width = all_content_width + scrollX
    const right_gap_width = root_container_width - maximum_visible_width
    if (right_gap_width <= 0) return scrollX
    return Math.min(0, scrollX + right_gap_width)
}

export const createBrackets = (
    all_data,
    root_container,
    user_options
) => {
    const actual_options = {
        ...get_default_options(),
        ...user_options
    }

    const root_id = create_unique_id()
    const root_bracket_container = document.createElement('div')
    root_bracket_container.className = root_id + ' root_bracket_container'
    root_bracket_container.style.overflow = 'hidden'
    root_bracket_container.style.width = '100%'
    root_bracket_container.style.height = '100%'
    root_bracket_container.style.position = 'relative'
    root_bracket_container.style.resize = 'both'

    root_container.append(root_bracket_container)

    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const canvas_el = create_canvas(root_bracket_container, actual_options)

    const handle_new_scrollX = new_scrollX => {
        state.scrollX = new_scrollX
        draw_all(all_data, state, canvas_el, actual_options)
    }

    create_horizontal_scroll_buttons(
        root_bracket_container,
        actual_options,
        all_data.rounds.length,
        state,
        handle_new_scrollX,
        root_id
    )

    new ResizeObserver(
        debounce(resize_entry => {
            const root_container_width = resize_entry[0].contentRect.width
            const root_container_height = resize_entry[0].contentRect.height

            canvas_el.width = root_container_width
            canvas_el.height = root_container_height

            state.scrollX = try_adjust_scrollX_on_resize(
                state.scrollX,
                get_all_content_width(actual_options, all_data.rounds.length),
                root_container_width,
            )
            
            draw_all(all_data, state, canvas_el, actual_options)
        })
    ).observe(root_bracket_container)

    draw_all(all_data, state, canvas_el, actual_options)

    install_mouse_events(all_data, actual_options, state, handle_new_scrollX, canvas_el)
}
