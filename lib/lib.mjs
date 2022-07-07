import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { observe_resize_later, create_unique_id, deep_clone_object, create_element_from_Html } from './utils/utils.mjs'
import { create_stable_elements } from './stable_elements/create_stable_elements.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { create_options_dealer } from './options/create_options_dealer.mjs'
import { validate_user_options } from './options/validate_user_options.mjs'
import { create_navigation } from './navigation/navigation.mjs'
import { update_all_styles } from './styles/update_all_styles.mjs'
import { create_matches } from './draw/create_matches.mjs'
import { get_match_element } from './draw/get_match_element.mjs'

const apply_new_options = (
    new_options,
    options_dealer,
    all_data,
    stable_elements
) => {
    validate_user_options(new_options)
    options_dealer.update_user_options(new_options)

    stable_elements.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('leftNavigationButtonHTML'))
    stable_elements.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('rightNavigationButtonHTML'))

    stable_elements.scrollbar.style.display = options_dealer.get_final_value('showScrollbar') ? 'block' : 'none'

    update_all_styles(all_data.root_id, options_dealer.get_final_value)
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
    const options_dealer = create_options_dealer()
    const all_data = { root_id: create_unique_id() }

    try {
        try_merge_new_data(user_data, all_data)
    } catch (_) {
        console.log('err')
        return { moveToPreviousRound: () => void 0, moveToNextRound: () => void 0, getNavigationState: () => void 0, applyNewOptions: () => void 0, applyAllData: () => void 0, applyMatchUpdates: () => void 0 }
    }

    const stable_elements = create_stable_elements(user_wrapper_el, all_data)

    apply_new_options(user_options, options_dealer, all_data, stable_elements)

    create_matches(all_data, stable_elements)

    const navigation = create_navigation(all_data.root_id, options_dealer.get_final_value)



    observe_resize_later(user_wrapper_el, navigation.repaint)

    install_mouse_events(
        all_data,
        options_dealer.get_final_value,
        stable_elements,
        navigation
    )










// expose stuff
    return {
        moveToPreviousRound: navigation.move_left,

        moveToNextRound: navigation.move_right,

        setBaseRoundIndex: navigation.set_base_round_index,

        getNavigationState: navigation.get_state,

        applyNewOptions: (new_options) => {
            apply_new_options(new_options, options_dealer, all_data, stable_elements)
            navigation.apply_options()
        },

        applyFullDataUpdate: (new_data) => {
            try_merge_new_data(new_data, all_data)
            const scroll_top = stable_elements.matches_vertical_scroller.scrollTop
            stable_elements.matches_positioner.innerHTML = ''
            create_matches(all_data, stable_elements)
            navigation.repaint()
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

        getUserOptions: options_dealer.get_user_options
    }
}
