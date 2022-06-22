import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { debounce, create_unique_id, deep_clone_object, create_element_from_Html } from './utils/utils.mjs'
import { create_stable_elements } from './stable_elements/create_stable_elements.mjs'
import { update_scrollbar } from './stable_elements/scrollbar.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { create_store } from './store/store.mjs'
import { create_options } from './options/create_options.mjs'
import { get_effects } from './effects/get_effects.mjs'
import { handle_round_index } from './effects/handle_round_index.mjs'
import { get_max_scroll_round_index } from './utils/sizes.mjs'
import { try_update_scroll_round_index } from './hor_scroll/try_update_scroll_round_index.mjs'
import { get_initial_anchor_index } from './hor_scroll/get_initial_anchor_index.mjs'
import { update_all_styles } from './styles/update_all_styles.mjs'
import { create_matches } from './draw/create_matches.mjs'
import { update_buttons } from './hor_scroll/update_buttons.mjs'
import { get_match_element } from './draw/get_match_element.mjs'


const apply_new_options = (
    new_options,
    actual_options,
    all_data,
    stable_elements
) => {
    Object.assign(actual_options, new_options)
    stable_elements.the_root_element.classList[new_options.use_mobile_layout ? 'add' : 'remove']('mobile')
    update_all_styles(all_data.root_id, actual_options)


    stable_elements.scroll_buttons.update_innerHTML(actual_options)
}



const try_merge_new_data = (new_data, old_data) => {
    const user_data = deep_clone_object(new_data)
    try {
        ananlyze_data(user_data)
    } catch (_) {
        throw ''
    }
    Object.assign(old_data, get_permanent_drawing_props(user_data))
}


export const createPlayoffs = (user_data, user_wrapper_el, user_options) => {
    const actual_options = create_options(user_options)
    const all_data = { root_id: create_unique_id() }
    const store = create_store()

    try {
        try_merge_new_data(user_data, all_data)
    } catch (_) {
        console.log('err')
        return { scrollLeft: () => void 0, scrollRight: () => void 0, getScrollState: () => void 0, applyNewOptions: () => void 0, applyAllData: () => void 0, applyMatchUpdates: () => void 0 }
    }

    const stable_elements = create_stable_elements(user_wrapper_el, all_data)

    apply_new_options(user_options, actual_options, all_data, stable_elements)

    create_matches(all_data, stable_elements.matches_scrollable_area)

    store.set_effects(get_effects(store, all_data, actual_options, stable_elements))

    store.update_state({ anchor_round_index: get_initial_anchor_index(all_data, stable_elements, actual_options) })







    new ResizeObserver(debounce(() => {
        () => handle_round_index(all_data, actual_options, store.state, stable_elements)
    })).observe(user_wrapper_el)

    install_mouse_events(
        all_data,
        actual_options,
        store,
        stable_elements,
    )










// expose stuff
    return {
        scrollLeft: () => try_update_scroll_round_index(-1, all_data, store, stable_elements, actual_options),

        scrollRight: () => try_update_scroll_round_index(1, all_data, store, stable_elements, actual_options),

        getScrollState: () => ({
            reachedLeftEdge: store.state.anchor_round_index <= 0,
            reachedRightEdge: store.state.anchor_round_index >= get_max_scroll_round_index(
                stable_elements, all_data, actual_options
            ),
            contentIsWider: stable_elements.matches_vertical_scroller.scrollWidth > stable_elements.content_horizontal_scroller.clientWidth
        }),

        applyNewOptions: (new_options) => {
            apply_new_options(new_options, actual_options, all_data, stable_elements)
            handle_round_index(all_data, actual_options, store.state, stable_elements)
        },

        applyFullDataUpdate: (new_data) => {
            try_merge_new_data(new_data, all_data)
            const scroll_top = stable_elements.matches_vertical_scroller.scrollTop
            stable_elements.matches_scrollable_area.innerHTML = ''
            create_matches(all_data, stable_elements.matches_scrollable_area)
            handle_round_index(all_data, actual_options, store.state, stable_elements)
            stable_elements.matches_vertical_scroller.scrollTop = scroll_top
        },

        applyMatchUpdates: (matches_data) => { // has to be returned even if data failed
            try {
                validate_matches(matches_data, all_data.contestants)
            } catch(_) {
                return
            }
            matches_data.forEach(m => {
                const el = document.querySelector(
                    `#${all_data.root_id} .round-wrapper[round-id="${m.round_id}"] .match-wrapper:nth-child(${m.order + 1})`
                )
                if (!el) return
                el.replaceWith(
                    create_element_from_Html(get_match_element(m, all_data))
                )

                const m_i = all_data.matches.findIndex(old_match => old_match.match_id === m.match_id)
                if (m_i === -1) {
                    all_data.matches.push(m)
                } else {
                    all_data.matches[m_i] = m
                }
            })
        },

        getAllData: () => deep_clone_object(all_data),

        getOptions: () => deep_clone_object(actual_options)
    }
}
