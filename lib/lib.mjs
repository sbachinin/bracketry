import { validate_data } from './validate_data.mjs'
import { debounce, create_unique_id } from './utils/utils.mjs'
import { create_canvas } from './utils/create_canvas.mjs'
import { draw_all } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { install_mouse_events } from './utils/mouse_events.mjs'
import { get_all_content_width } from './utils/sizes.mjs'
import { get_default_options } from './utils/get_default_options.mjs'
import { extract_basic_drawing_attrs } from './utils/extract_basic_drawing_attrs.mjs'

// if element gets WIDER on resize, right gap may appear
// This free space may be used to scroll back to show more rounds on the left
const try_adjust_scroll_X_on_resize = (
    scroll_X,
    all_content_width,
    root_container_width
) => {
    const maximum_visible_width = all_content_width + scroll_X
    const right_gap_width = root_container_width - maximum_visible_width
    if (right_gap_width <= 0) return scroll_X
    return Math.min(0, scroll_X + right_gap_width)
}

export const createBrackets = (
    all_rounds_data,
    root_container,
    user_options
) => {
    try {
        validate_data(all_rounds_data)
    } catch (e) {
        console.error(e)
        return
    }

    const actual_options = {
        ...get_default_options(),
        ...user_options
    }

    const root_id = create_unique_id()
    const root_brackets_el = document.createElement('div')
    root_brackets_el.className = root_id + ' root_brackets_el'
    root_brackets_el.style.overflow = 'hidden'
    root_brackets_el.style.width = '100%'
    root_brackets_el.style.height = actual_options.auto_canvas_height ? 'auto' : '100%'
    root_brackets_el.style.position = 'relative'
    root_brackets_el.style.resize = 'both'

    root_container.append(root_brackets_el)

    const state = {
        scroll_Y: 0,
        scroll_X: 0
    }

    const canvas_el = create_canvas(
        root_brackets_el,
        actual_options,
        all_rounds_data[0].matches.length
    )

    // make heavy calculations to prevent doing it inside draw_all which can be called every frame during animations
    const basic_drawing_attrs = extract_basic_drawing_attrs(
        all_rounds_data,
        actual_options,
        canvas_el.getContext('2d')
    )

    const update_state = update => {
        Object.assign(state, update)
        draw_all(
            all_rounds_data,
            state,
            canvas_el,
            actual_options,
            basic_drawing_attrs
        )
    }

    create_horizontal_scroll_buttons(
        root_brackets_el,
        actual_options,
        all_rounds_data.length,
        state,
        scroll_X => update_state({ scroll_X }),
        root_id
    )

    new ResizeObserver(
        debounce(resize_entry => {
            const root_container_width = resize_entry[0].contentRect.width
            canvas_el.width = root_container_width
            
            if (!actual_options.auto_canvas_height) {
                const root_container_height = resize_entry[0].contentRect.height
                canvas_el.height = root_container_height
            }

            update_state({
                scroll_X: try_adjust_scroll_X_on_resize(
                    state.scroll_X,
                    get_all_content_width(actual_options, all_rounds_data.length),
                    root_container_width,
                )
            })
        })
    ).observe(root_brackets_el)

    update_state({}) // trigger first paint

    install_mouse_events(
        all_rounds_data,
        actual_options,
        state,
        update_state,
        root_brackets_el
    )
}
