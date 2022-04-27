import { ananlyze_data } from './data/analyze_data.mjs'
import { create_unique_id, deep_clone_object } from './utils/utils.mjs'
import { create_root_elements } from './root_elements/create_root_elements.mjs'
import { update_root_elements } from './root_elements/update_root_elements.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { create_store } from './store/store.mjs'
import { create_options } from './options/create_options.mjs'
import { get_effects } from './effects/get_effects.mjs'
import { full_redraw_matches } from './draw/full_redraw_matches.mjs'
import { update_styles } from './utils/utils.mjs'
import { get_rounds_styles } from './draw/round_styles.mjs'
import { try_update_scroll_round_index } from './hor_scroll/try_update_scroll_round_index.mjs'
import { get_initial_anchor_index } from './hor_scroll/get_initial_anchor_index.mjs'


export const createBrackets = (initial_data, user_wrapper_el, user_options) => {

    let actual_options = create_options(user_options)
    const all_data = { root_id: create_unique_id() }
    const store = create_store(actual_options)

    const full_update = async (original_user_data = initial_data, user_options = {}) => {
        const user_data = deep_clone_object(original_user_data)
        try {
            ananlyze_data(user_data, actual_options)
        } catch (e) {
            console.error(e)
            return
        }
        
        actual_options = create_options(user_options)

        Object.assign(all_data, get_permanent_drawing_props(user_data, actual_options))

        store.update_some_props(actual_options)

        update_root_elements(root_elements, actual_options, all_data, store.state)

        // try_add_flag_images(all_data, actual_options).then(() => {
        //     full_redraw_matches(all_data, actual_options, store, root_elements)
        // })

        update_styles(all_data.root_id, 'rounds-styles', get_rounds_styles(all_data.root_id, actual_options))
        full_redraw_matches(all_data, actual_options, store, root_elements)
        store.update_state({
            anchor_round_index: get_initial_anchor_index(all_data, root_elements)
        })
    }

    const root_elements = create_root_elements(user_wrapper_el, all_data.root_id, full_update, actual_options)

    if (!root_elements.lines_canvas.getContext) return

    store.set_effects(
        get_effects(store, all_data, actual_options, root_elements)
    )

    full_update(initial_data, user_options)

    install_mouse_events(
        all_data,
        actual_options,
        store,
        root_elements,
    )

    return {
        full_update,
        scroll_left: () => try_update_scroll_round_index(-1, all_data, store, root_elements),
        scroll_right: () => try_update_scroll_round_index(1, all_data, store, root_elements)
    }
}
