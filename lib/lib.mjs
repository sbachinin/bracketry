import { handle_data_errors } from './data/handle_errors.mjs'
import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { get_original_data_copy } from './data/get_original_data_copy.mjs'
import { create_unique_id, deep_clone_object, is_valid_number } from './utils.mjs'
import { create_html_shell } from './html_shell/html_shell.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { update_highlight } from './mouse_events/highlight.mjs'
import { create_options_dealer } from './options/create_options_dealer.mjs'
import { validate_user_options } from './options/validate_user_options.mjs'
import { create_navigation } from './navigation/navigation.mjs'
import { update_all_styles } from './styles/update_all_styles.mjs'
import { render_content } from './draw/render_content.mjs'
import { get_match_element } from './draw/get_match_element.mjs'

const apply_new_options = (
    new_options,
    options_dealer,
    root_id,
    html_shell
) => {
    validate_user_options(new_options)
    options_dealer.update_user_options(new_options)

    html_shell.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('leftNavigationButtonHTML'))
    html_shell.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.innerHTML = options_dealer.get_final_value('rightNavigationButtonHTML'))

    update_all_styles(root_id, options_dealer.get_final_value)
}


const try_assign_new_data = (new_data, old_data) => {
    const { have_critical_error } = handle_data_errors(ananlyze_data(new_data))
    if (have_critical_error) return false

    Object.keys(old_data).forEach(key => delete old_data[key])
    Object.assign(old_data, deep_clone_object(new_data))
    return true
}


export const createPlayoffs = (user_data, user_wrapper_el, user_options) => {
    let alive = false
    let options_dealer = create_options_dealer()
    const root_id = create_unique_id()
    let all_data = {}

    const stub = {
        moveToPreviousRound: () => void 0,
        moveToNextRound: () => void 0,
        moveToLastRound: () => void 0,
        setBaseRoundIndex: () => void 0,
        getNavigationState: () => void 0,
        applyNewOptions: () => void 0,
        replaceData: () => void 0,
        applyMatchesUpdates: () => void 0,
        getAllData: () => user_data,
        getUserOptions: () => user_options,
        highlightContestantHistory: () => void 0
    }


    if (!user_wrapper_el
        || !(user_wrapper_el instanceof Element)
        || !user_wrapper_el.closest('html')
    ) {
        console.warn('Could not install easy-playoffs because invalid element is provided: ', user_wrapper_el)
        return stub
    }

    let html_shell = create_html_shell(user_wrapper_el, root_id)
    apply_new_options(user_options, options_dealer, root_id, html_shell)

    const merge_succeeded = try_assign_new_data(user_data, all_data)

    if (!merge_succeeded) {
        return stub
    }

    alive = true

    render_content(all_data, html_shell, options_dealer.get_final_value)

    let navigation = create_navigation(root_id, options_dealer.get_final_value)

    const mouse_events = install_mouse_events(
        all_data,
        options_dealer.get_final_value,
        html_shell,
        navigation
    )

    const x = new MutationObserver(function (e) {
        if (!html_shell?.the_root_element.closest('html')) { // root is detached
            mouse_events.uninstall()
            if (html_shell !== null) {
                Object.keys(html_shell).forEach(k => {
                    html_shell[k].remove()
                    delete html_shell[k]
                })
                html_shell = null
            }
            options_dealer = null
            all_data = null
            navigation = null
            x.disconnect()
            alive = false
        }
    })
    x.observe(user_wrapper_el.parentElement, { childList: true, subtree: true })






// expose stuff
    return {
        // TODO perhaps i need a way to detach (uninstall) playoffs

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
            apply_new_options(new_options, options_dealer, root_id, html_shell)
            navigation.repaint()
        },

        replaceData: (new_data) => {
            if (!alive) return
            const merge_succeeded = try_assign_new_data(new_data, all_data)
            if (!merge_succeeded) {
                console.warn('Failed to apply new data')
                return
            }

            render_content(all_data, html_shell, options_dealer.get_final_value)

            navigation.set_base_round_index(0)
            navigation.repaint()

            html_shell.matches_vertical_scroller.scrollTop = 0
        },

        applyMatchesUpdates: (fresh_matches) => {
            if (!alive) return
            if (!Array.isArray(all_data.matches)) return
            if (!Array.isArray(fresh_matches)) {
                console.warn(`applyMatchesUpdates must be called with an array of matches, instead called with: `, fresh_matches)
                return
            }

            const { have_critical_errors } = handle_data_errors(validate_matches(fresh_matches, all_data.contestants))
            if (have_critical_errors) return

            fresh_matches.forEach(m => {
                if (!is_valid_number(m.order) || !is_valid_number(m.roundIndex)) return

                const m_i = all_data.matches.findIndex((old_match) => {
                    return old_match.roundIndex === m.roundIndex && old_match.order === m.order
                })

                if (m_i === -1) {
                    all_data.matches.push(m)
                } else {
                    all_data.matches[m_i] = m
                }

                const round_el = document.querySelectorAll(`#${root_id} .round-wrapper`)[m.roundIndex]
                const match_el = round_el?.querySelectorAll('.match-wrapper')[m.order]
                if (!match_el) return
                match_el.replaceWith(
                    get_match_element(m.roundIndex, m.order, all_data, options_dealer.get_final_value)
                )
            })
        },

        // need consistent return
        getAllData: () => alive && get_original_data_copy(all_data),

        // need consistent return
        getUserOptions: () => alive && options_dealer.get_user_options(), // TODO test that it returns exactly what user provided

        // TODO getActualOptions

        highlightContestantHistory: (contestantId) => {
            alive && update_highlight(html_shell.matches_positioner, contestantId)
        }
    }
}
