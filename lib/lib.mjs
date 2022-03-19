import { ananlyze_data } from './data/analyze_data.mjs'
import { create_unique_id } from './utils/utils.mjs'
import { create_root_elements } from './root_elements/create_root_elements.mjs'
import { update_root_elements } from './root_elements/update_root_elements.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { try_get_flag_imgs } from './data/try_get_flag_imgs.mjs'
import { create_store } from './store/store.mjs'
import { create_options } from './options/create_options.mjs'
import { get_effects } from './effects/get_effects.mjs'
import { draw_all } from './draw/draw_all.mjs'

export const createBrackets = (initial_data, root_container, user_options) => {

    const { actual_options, update_options } = create_options()
    const all_data = { root_id: create_unique_id() }
    const store = create_store(actual_options)

    const update_all = async (user_data = initial_data, user_options = {}) => {
        const new_data = JSON.parse(JSON.stringify(user_data))
        let data_summary = null
        try {
            data_summary = ananlyze_data(new_data, actual_options)
        } catch (e) {
            return
        }
        update_options(user_options)

        Object.assign(all_data, get_permanent_drawing_props(new_data, actual_options))
        
        store.update_some_props(actual_options)
        
        update_root_elements(root_elements, actual_options, all_data, store.state)
        
        const flags_urls_to_images = await try_get_flag_imgs(data_summary.flag_urls)
        Object.assign(all_data, { flags_urls_to_images }) // must check performance implications of keeping flags in all_data
        
        root_elements.offscreen_canvas.draw(all_data, actual_options)
        draw_all(all_data, store, actual_options, root_elements)
    }

    const root_elements = create_root_elements(all_data.root_id, update_all)

    root_container.append(root_elements.wrapper)
    if (!root_elements.main_canvas_el.getContext) return

    store.set_effects(
        get_effects(store, all_data, actual_options, root_elements)
    )

    update_all(initial_data, user_options)

    install_mouse_events(
        all_data,
        actual_options,
        store,
        root_elements,
    )

    return update_all
}
