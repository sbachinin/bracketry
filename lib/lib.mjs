import { validate_data } from './validate_data.mjs'
import { debounce, create_unique_id } from './utils/utils.mjs'
import { create_canvas } from './create_canvas.mjs'
import { draw_rounds } from './draw/draw_rounds.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_default_options } from './utils/get_default_options.mjs'
import { set_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { set_round_heights } from './data/temporary_drawing_props.mjs'
import { set_matches_coords, try_update_matches_coords } from './data/matches_coords.mjs'

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

    const state = {
        scroll_Y: 0,
        scroll_X: 0,
        hovered_match_id: undefined
    }

    const canvas_el = create_canvas(root_brackets_el, actual_options, initial_data[0].matches.length)
    if (!canvas_el.getContext) return

    const all_data = set_permanent_drawing_props(
        JSON.parse(JSON.stringify(initial_data)),
        actual_options,
        canvas_el
    )
    set_round_heights(all_data, actual_options, canvas_el.height)
    set_matches_coords(all_data, 0, actual_options)

    const update_state = (update = {}, force_redraw = false) => {
        try_update_matches_coords(all_data, state, update, actual_options)
        if ('scroll_Y' in update && update.scroll_Y !== state.scroll_Y) {
            update.hovered_match_id = undefined
        }
        const old_state_string = JSON.stringify(state)
        Object.assign(state, update)
        if (!force_redraw && JSON.stringify(state) === old_state_string) return
        
        update_buttons?.(state.scroll_X)
        draw_rounds(all_data, state, canvas_el, actual_options)
    }

    const update_buttons = create_horizontal_scroll_buttons(
        all_data,
        root_brackets_el,
        actual_options,
        state,
        update_state,
        root_id,
    )

    new ResizeObserver(
        debounce(resize_entry => {
            const root_container_width = resize_entry[0].contentRect.width
            canvas_el.width = root_container_width
            
            if (!actual_options.auto_canvas_height) {
                const root_container_height = resize_entry[0].contentRect.height
                canvas_el.height = root_container_height
            }

            set_round_heights(all_data, actual_options, canvas_el.height)
            
            update_state({}, true)
        })
    ).observe(root_brackets_el)

    update_state({}, true) // trigger first paint

    install_mouse_events(
        all_data,
        actual_options,
        state,
        update_state,
        root_brackets_el,
    )
}
