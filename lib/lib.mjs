import { handle_data_errors } from './data/handle_errors.mjs'
import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { deep_clone_object, is_valid_number } from './utils.mjs'
import { create_html_shell } from './html_shell.mjs'
import { install_ui_events } from './ui_events/ui_events.mjs'
import { update_highlight } from './ui_events/highlight.mjs'
import { apply_options, filter_updatable_options } from './options/apply_options.mjs'
import { create_options_dealer } from './options/options_dealer.mjs'
import { create_navigation } from './navigation/navigation.mjs'
import { render_content } from './draw/render_content.mjs'
import { get_match_element } from './draw/get_match_element.mjs'
import { create_scrolla } from './scroll/scrolla.mjs'

const all_playoffs_instances = []

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

// destroy old playoffs in this wrapper
    all_playoffs_instances.forEach((inst) => {
        if (inst.user_wrapper_el === user_wrapper_el) {
            inst.uninstall()
        }
    })

    let html_shell = create_html_shell(user_wrapper_el, user_options?.fullscreen === true)
    apply_options(user_options, options_dealer, html_shell)

    const merge_succeeded = try_assign_new_data(actual_data, initial_user_data)

    if (!merge_succeeded) {
        return stub
    }

    alive = true

    render_content(actual_data, html_shell, options_dealer.get_final_value)

    let scrolla = create_scrolla(html_shell, options_dealer.get_final_value)

    let navigation = create_navigation(html_shell, options_dealer.get_final_value, scrolla)

    html_shell.fullscreen_wrapper && (html_shell.fullscreen_wrapper.style.opacity = 1)

    const uninstall = () => {
        ui_events.uninstall()
        scrolla.uninstall()
        navigation.uninstall()
        if (html_shell !== null) {
            Object.keys(html_shell).forEach(k => {
                html_shell[k].remove()
                delete html_shell[k]
            })
            html_shell = null
        }
        options_dealer = null
        actual_data = null
        initial_user_data = null
        navigation = null
        alive = false
        const instance_i = all_playoffs_instances.indexOf(instance)
        instance_i > -1 && all_playoffs_instances.splice(instance_i, 1)
        instance = null
    }

    const ui_events = install_ui_events(
        actual_data,
        options_dealer.get_final_value,
        html_shell,
        navigation,
        uninstall
    )

// expose stuff
    let instance = {
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
            apply_options(
                filter_updatable_options(new_options),
                options_dealer,
                html_shell
            )
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

            html_shell.matches_scroller.scrollTop = 0
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

                const round_el = html_shell.the_root_element.querySelectorAll(`.round-wrapper`)[u.roundIndex]
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

        uninstall,

        user_wrapper_el
    }

    all_playoffs_instances.push(instance)

    return instance
}
