import { validate_data } from './validate_data.mjs'
import { create_unique_id, shallow_get_diff_keys, includes_some } from './utils/utils.mjs'
import { create_root_elements } from './create_root_elements.mjs'
import { draw_rounds } from './draw/draw_rounds.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_default_options } from './utils/get_default_options.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { set_round_heights } from './data/temporary_drawing_props.mjs'
import { set_matches_center_Ys } from './data/matches_coords.mjs'
import { create_store } from './store.mjs'

const update_cursor = (is_cursor_pointer, root_brackets_el) => {
    if (is_cursor_pointer) {
        root_brackets_el.style.cursor = 'pointer'
    } else {
        root_brackets_el.style.cursor = 'auto'
    }
}

export const createBrackets = (initial_data, root_container, user_options) => {

    const actual_options = { ...get_default_options() }
    const all_data = {}
    const root_id = create_unique_id()
    const store = create_store()

    const update_all = (user_data = initial_data, user_options = actual_options) => {
        const new_data = JSON.parse(JSON.stringify(user_data))

        try {
            validate_data(new_data)
        } catch (e) {
            console.error(e)
            return
        }

        Object.assign(actual_options, user_options)
    
        update_root_elements(actual_options, new_data[0].matches.length)
        
        Object.assign(all_data, get_permanent_drawing_props(new_data, actual_options, canvas_el))
        set_round_heights(all_data, actual_options, canvas_el.height)
        set_matches_center_Ys(all_data, store.state.scroll_Y, actual_options)

        buttons.update_visibility()
        buttons.apply_options()
        
        draw_rounds(all_data, store.state, canvas_el, actual_options)
    }

    const {
        root_brackets_el, canvas_el, update_root_elements
    } = create_root_elements(root_id, update_all)

    root_container.append(root_brackets_el)
    if (!canvas_el.getContext) return

    const buttons = create_horizontal_scroll_buttons(
        all_data,
        root_brackets_el,
        actual_options,
        store,
        root_id,
    )

    store.onchange((state, old_state, force_redraw) => {
        const changed_state_keys = shallow_get_diff_keys(old_state, state)

        if (includes_some(changed_state_keys, ['is_cursor_pointer'])) {
            update_cursor(state.is_cursor_pointer, root_brackets_el)
        }
        
        if (includes_some(changed_state_keys, ['scroll_X'])) {
            buttons.update_visibility()
        }

        if (includes_some(changed_state_keys, ['scroll_Y'])) {
            set_matches_center_Ys(all_data, state.scroll_Y, actual_options)
        }
        
        if (includes_some(changed_state_keys, [
            'scroll_Y', 'scroll_X', 'expanded_match_id', 'expanded_match_opacity', 'highlighted_team_id', 'highlight_opacity'
        ]) || force_redraw) {
            setTimeout(() => draw_rounds(all_data, state, canvas_el, actual_options))
        }
    })

    install_mouse_events(
        all_data,
        actual_options,
        store,
        root_brackets_el,
    )

    update_all(initial_data, user_options)

    return update_all
}
