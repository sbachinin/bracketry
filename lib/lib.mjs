import { handle_data_errors } from './data/handle_errors.mjs'
import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { create_unique_id, deep_clone_object, is_object } from './utils.mjs'
import { create_stable_elements } from './stable_elements/create_stable_elements.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { create_options_dealer } from './options/create_options_dealer.mjs'
import { validate_user_options } from './options/validate_user_options.mjs'
import { create_navigation } from './navigation.mjs'
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
    if (!is_object(new_data)) return false

    const user_data = deep_clone_object(new_data)
    const { have_critical_error } = handle_data_errors(ananlyze_data(user_data))
    if (have_critical_error) return false

    Object.assign(old_data, get_permanent_drawing_props(user_data))
    return true
}


const is_valid_wrapper_el = (el) => {
    return el instanceof Element && !!el.closest('html')
}


export const createPlayoffs = (user_data, user_wrapper_el, user_options) => {
    const options_dealer = create_options_dealer()
    const all_data = { root_id: create_unique_id() }

    const merge_succeeded = try_merge_new_data(user_data, all_data)
    if (!merge_succeeded || !is_valid_wrapper_el(user_wrapper_el)) {
        return { moveToPreviousRound: () => void 0, moveToNextRound: () => void 0, getNavigationState: () => void 0, applyNewOptions: () => void 0, applyMatchesUpdates: () => void 0 }
    }

    const stable_elements = create_stable_elements(user_wrapper_el, all_data)

    apply_new_options(user_options, options_dealer, all_data, stable_elements)

    create_matches(all_data, stable_elements, options_dealer.get_final_value)

    if (stable_elements.matches_positioner.firstElementChild === null) return

    const navigation = create_navigation(all_data.root_id, options_dealer.get_final_value)

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

        moveToLastRound: () => navigation.set_base_round_index(Infinity),

        setBaseRoundIndex: navigation.set_base_round_index,

        getNavigationState: navigation.get_state,

        applyNewOptions: (new_options) => {
            apply_new_options(new_options, options_dealer, all_data, stable_elements)
            navigation.update_round_natural_width()
            navigation.repaint()
        },

        applyFullDataUpdate: (new_data) => {
            const merge_succeeded = try_merge_new_data(new_data, all_data)
            if (!merge_succeeded) {
                console.warn('Failed to apply new data')
                return
            }

            const scroll_top = stable_elements.matches_vertical_scroller.scrollTop

            stable_elements.round_titles_wrapper.innerHTML = all_data.rounds.map((r, i) => {
                return `<div class="round-name">${r.name}</div>`
            }).join('')

            stable_elements.matches_positioner.innerHTML = ''
            create_matches(all_data, stable_elements, options_dealer.get_final_value)
            navigation.update_round_natural_width()
            navigation.repaint()
            stable_elements.matches_vertical_scroller.scrollTop = scroll_top
        },

        applyMatchesUpdates: (matches_data) => {

            const { have_errors } = handle_data_errors(validate_matches(matches_data, all_data.contestants))
            if (have_errors) return

            matches_data.forEach(m => {

                const m_i = all_data.matches.findIndex(old_match => old_match.match_id === m.match_id)
                if (m_i === -1) {
                    all_data.matches.push(m)
                } else {
                    all_data.matches[m_i] = m
                }

                const round_el = document.querySelectorAll(`#${all_data.root_id} .round-wrapper`)[m.round_index]
                const match_el = round_el.querySelectorAll('.match-wrapper')[m.order]
                if (!match_el) return
                match_el.replaceWith(
                    get_match_element(m.round_index, m.order, all_data, options_dealer.get_final_value)
                )
            })
        },

        getAllData: () => deep_clone_object(all_data),

        getUserOptions: options_dealer.get_user_options
    }
}
