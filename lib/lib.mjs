import { validate_data } from './validate_data.mjs'
import { debounce, create_unique_id, shallow_get_diff_keys, includes_some } from './utils/utils.mjs'
import { create_canvas } from './create_canvas.mjs'
import { draw_rounds } from './draw/draw_rounds.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_default_options } from './utils/get_default_options.mjs'
import { set_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { set_round_heights } from './data/temporary_drawing_props.mjs'
import { set_matches_coords } from './data/matches_coords.mjs'
import { create_store } from './store.mjs'

const update_cursor = (is_cursor_pointer, root_brackets_el) => {
    if (is_cursor_pointer) {
        root_brackets_el.style.cursor = 'pointer'
    } else {
        root_brackets_el.style.cursor = 'auto'
    }
}

export const createBrackets = (
    initial_data,
    root_container,
    user_options
) => {
    try {
        validate_data(initial_data)
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

    const store = create_store()

    const canvas_el = create_canvas(root_brackets_el, actual_options, initial_data[0].matches.length)
    if (!canvas_el.getContext) return

    const all_data = set_permanent_drawing_props(
        JSON.parse(JSON.stringify(initial_data)),
        actual_options,
        canvas_el
    )
    set_round_heights(all_data, actual_options, canvas_el.height)
    set_matches_coords(all_data, 0, actual_options)

    const update_buttons = create_horizontal_scroll_buttons(
        all_data,
        root_brackets_el,
        actual_options,
        store,
        root_id,
    )

    store.onchange((state, old_state, force_redraw) => {
        const changed_state_keys = shallow_get_diff_keys(state, old_state)

        if (includes_some(changed_state_keys, ['is_cursor_pointer'])) {
            update_cursor(state.is_cursor_pointer, root_brackets_el)
        }
        
        if (includes_some(changed_state_keys, ['scroll_Y', 'scroll_X'])) {
            update_buttons(state.scroll_X)
            set_matches_coords(all_data, state.scroll_Y, actual_options)
        }
        
        if (includes_some(changed_state_keys, [
            'scroll_Y', 'scroll_X', 'expanded_match_id', 'hovered_match_opacity'
        ]) || force_redraw) {
            draw_rounds(all_data, state, canvas_el, actual_options)
        }
    })

    new ResizeObserver(
        debounce(resize_entry => {
            const root_container_width = resize_entry[0].contentRect.width
            canvas_el.width = root_container_width
            
            if (!actual_options.auto_canvas_height) {
                const root_container_height = resize_entry[0].contentRect.height
                canvas_el.height = root_container_height
            }

            set_round_heights(all_data, actual_options, canvas_el.height)
            
            store.update_state({}, true)
        })
    ).observe(root_brackets_el)

    store.update_state({}, true) // trigger first paint

    install_mouse_events(
        all_data,
        actual_options,
        store,
        root_brackets_el,
    )
}
