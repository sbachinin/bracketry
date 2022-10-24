import { handle_data_errors } from './data/handle_errors.mjs'
import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { create_unique_id, deep_clone_object, is_object, is_valid_number } from './utils.mjs'
import { create_html_shell } from './html_shell/html_shell.mjs'
import { install_ui_events } from './ui_events/ui_events.mjs'
import { update_highlight } from './ui_events/highlight.mjs'
import { get_options_flattened_meta } from './options/options_meta_getter.mjs'
import { create_options_dealer } from './options/options_dealer.mjs'
import { create_navigation } from './navigation/navigation.mjs'
import { update_all_styles } from './styles/update_all_styles.mjs'
import { render_content } from './draw/render_content.mjs'
import { get_match_element } from './draw/get_match_element.mjs'
import { create_scrolla } from './ui_events/scroll.mjs'
import { enable_scroll, disable_scroll } from './ui_events/disable_scroll_on_element.mjs'

const apply_new_options = (
    new_options,
    options_dealer,
    root_id,
    { the_root_element, matches_vertical_scroller, matches_positioner }
) => {
    options_dealer.try_merge_options(new_options)

    the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('leftNavigationButtonHTML'))
    the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('rightNavigationButtonHTML'))

    update_all_styles(root_id, options_dealer.get_final_value)

    if (new_options.verticalScrollMode === 'buttons') {
        disable_scroll(the_root_element)
        matches_vertical_scroller.scrollTop = 0
    } else {
        enable_scroll(the_root_element)
        matches_positioner.style.transform = 'none'
    }
}


const try_assign_new_data = (old_data, new_data) => {
    const { have_critical_error } = handle_data_errors(ananlyze_data(new_data))
    if (have_critical_error) return false

    Object.keys(old_data).forEach(key => delete old_data[key])
    Object.assign(old_data, deep_clone_object(new_data))
    return true
}


export const createPlayoffs = (initial_user_data, user_wrapper_el, user_options) => {
    let alive = false
    let options_dealer = create_options_dealer()
    const root_id = create_unique_id()
    let actual_data = {}

    const stub = {
        moveToPreviousRound: () => void 0,
        moveToNextRound: () => void 0,
        moveToLastRound: () => void 0,
        setBaseRoundIndex: () => void 0,
        getNavigationState: () => void 0,
        applyNewOptions: () => void 0,
        replaceData: () => void 0,
        applyMatchesUpdates: () => void 0,
        getAllData: () => deep_clone_object(initial_user_data || {}),
        getUserOptions: () => deep_clone_object(user_options),
        highlightContestantHistory: () => void 0,
        uninstall: () => void 0
    }


    if (!user_wrapper_el
        || !(user_wrapper_el instanceof Element)
        || !user_wrapper_el.closest('html')
    ) {
        console.warn('Could not install playoffs because invalid element is provided: ', user_wrapper_el)
        return stub
    }

    let html_shell = create_html_shell(user_wrapper_el, root_id)
    apply_new_options(user_options, options_dealer, root_id, html_shell)

    const merge_succeeded = try_assign_new_data(actual_data, initial_user_data)

    if (!merge_succeeded) {
        return stub
    }

    alive = true

    render_content(actual_data, html_shell, options_dealer.get_final_value)

    let scrolla = create_scrolla(html_shell, options_dealer.get_final_value)

    let navigation = create_navigation(root_id, options_dealer.get_final_value)

    html_shell.the_root_element.style.opacity = 1
    html_shell.the_root_element.style.visibility = 'visible'


    const uninstall = () => {
        if (html_shell !== null) {
            Object.keys(html_shell).forEach(k => {
                html_shell[k].remove()
                delete html_shell[k]
            })
            html_shell = null
        }
        ui_events.uninstall()
        scrolla.uninstall()
        options_dealer = null
        actual_data = null
        initial_user_data = null
        navigation = null
        alive = false
    }

    const ui_events = install_ui_events(
        actual_data,
        options_dealer.get_final_value,
        html_shell,
        navigation,
        uninstall
    )

// expose stuff
    return {
        moveToPreviousRound: () => alive && navigation.move_left(),

        moveToNextRound: () => alive && navigation.move_right(),

        moveToLastRound: () => alive && navigation.set_base_round_index(Infinity),

        setBaseRoundIndex: (i) => {
            if (!is_valid_number(i)) {
                console.warn('setBaseRoundIndex accepts only numbers, instead got: ', i)
                return
            }
            return alive && navigation.set_base_round_index(i)
        },

        getNavigationState: navigation.get_state,

        applyNewOptions: (new_options) => {
            if (!alive) return

            const meta = get_options_flattened_meta()
            const updatable_new_options = {}
            
            is_object(new_options)
                && Object.entries(new_options).forEach(([n, v]) => {
                    if (
                        meta[n]?.type === 'function_or_null'
                        || meta[n].non_updatable === true
                    ) {
                        console.warn(`${n} option can't be updated via applyNewOptions`)
                    } else {
                        updatable_new_options[n] = v
                    }
                })

            apply_new_options(updatable_new_options, options_dealer, root_id, html_shell)
            navigation.repaint()
        },

        replaceData: (new_data) => {
            if (!alive) return
            const merge_succeeded = try_assign_new_data(actual_data, new_data)
            if (!merge_succeeded) {
                console.warn('Failed to apply new data')
                return
            }

            render_content(actual_data, html_shell, options_dealer.get_final_value)

            navigation.set_base_round_index(0)
            navigation.repaint()

            html_shell.matches_vertical_scroller.scrollTop = 0
        },

        applyMatchesUpdates: (updates) => {
            if (!alive) return
            if (!Array.isArray(actual_data.matches)) return
            if (!Array.isArray(updates)) {
                console.warn(`applyMatchesUpdates must be called with an array of matches, instead called with: `, updates)
                return
            }

            const { have_critical_error } = handle_data_errors(validate_matches(updates, actual_data.contestants))
            if (have_critical_error) return

            updates.forEach(u => {
                if (!is_valid_number(u.order) || !is_valid_number(u.roundIndex)) return

                const m_i = actual_data.matches.findIndex((old_match) => {
                    return old_match.roundIndex === u.roundIndex && old_match.order === u.order
                })

                if (m_i === -1) {
                    actual_data.matches.push(u)
                } else {
                    Object.assign(actual_data.matches[m_i], u)
                }

                const round_el = document.querySelectorAll(`#${root_id} .round-wrapper`)[u.roundIndex]
                const match_el = round_el?.querySelectorAll('.match-wrapper')[u.order]
                if (!match_el) return
                match_el.replaceWith(
                    get_match_element(u.roundIndex, u.order, actual_data, options_dealer.get_final_value)
                )
            })
            navigation.repaint()
        },

        getAllData: () => deep_clone_object(actual_data || {}),

        getUserOptions: () => deep_clone_object(options_dealer?.get_user_options() || {}),

        highlightContestantHistory: (contestantId) => {
            alive && update_highlight(html_shell.matches_positioner, contestantId)
        },

        uninstall
    }
}
