import { handle_data_errors } from './data/handle_errors.mjs'
import { ananlyze_data } from './data/analyze_data.mjs'
import { validate_matches } from './data/validate_matches.mjs'
import { get_original_data_copy } from './data/get_original_data_copy.mjs'
import { create_unique_id, deep_clone_object } from './utils.mjs'
import { create_html_shell } from './html_shell/html_shell.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { create_options_dealer } from './options/create_options_dealer.mjs'
import { validate_user_options } from './options/validate_user_options.mjs'
import { create_navigation } from './navigation.mjs'
import { update_all_styles } from './styles/update_all_styles.mjs'
import { render_content } from './draw/render_content.mjs'
import { get_match_element } from './draw/get_match_element.mjs'
import { update_highlight } from './mouse_events/highlight.mjs'

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

    html_shell.scrollbar.style.display = options_dealer.get_final_value('showScrollbar') ? 'block' : 'none'

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
    const options_dealer = create_options_dealer()
    const root_id = create_unique_id()
    const all_data = {}

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
        return stub
    }

    const html_shell = create_html_shell(user_wrapper_el, root_id)
    apply_new_options(user_options, options_dealer, root_id, html_shell)

    const merge_succeeded = try_assign_new_data(user_data, all_data)

    if (!merge_succeeded) {
        return stub
    }

    render_content(all_data, html_shell, options_dealer.get_final_value)

    const navigation = create_navigation(root_id, options_dealer.get_final_value)

    install_mouse_events(
        all_data,
        options_dealer.get_final_value,
        html_shell,
        navigation
    )










// expose stuff
    return {
        // TODO perhaps i need a way to detach (uninstall) playoffs

        moveToPreviousRound: navigation.move_left,

        moveToNextRound: navigation.move_right,

        moveToLastRound: () => navigation.set_base_round_index(Infinity),

        setBaseRoundIndex: navigation.set_base_round_index,

        getNavigationState: navigation.get_state,

        applyNewOptions: (new_options) => {
            apply_new_options(new_options, options_dealer, root_id, html_shell)
            navigation.update_round_natural_width()
            navigation.repaint()
        },

        replaceData: (new_data) => {
            const merge_succeeded = try_assign_new_data(new_data, all_data)
            if (!merge_succeeded) {
                console.warn('Failed to apply new data')
                return
            }

            render_content(all_data, html_shell, options_dealer.get_final_value)

            navigation.set_base_round_index(0)
            navigation.update_round_natural_width()
            navigation.repaint()

            html_shell.matches_vertical_scroller.scrollTop = 0
        },

        applyMatchesUpdates: (fresh_matches) => {
            if (!Array.isArray(all_data.matches)) return

            const { have_critical_errors } = handle_data_errors(validate_matches(fresh_matches, all_data.contestants))
            if (have_critical_errors) return

            fresh_matches.forEach(m => {

                const m_i = all_data.matches.findIndex((old_match) => {
                    return old_match.roundIndex === m.roundIndex && old_match.order === m.order
                })

                if (m_i === -1) {
                    all_data.matches.push(m)
                } else {
                    all_data.matches[m_i] = m
                }

                const round_el = document.querySelectorAll(`#${root_id} .round-wrapper`)[m.roundIndex]
                const match_el = round_el.querySelectorAll('.match-wrapper')[m.order]
                if (!match_el) return
                match_el.replaceWith(
                    get_match_element(m.roundIndex, m.order, all_data, options_dealer.get_final_value)
                )
            })
        },

        getAllData: () => get_original_data_copy(all_data),

        getUserOptions: options_dealer.get_user_options, // TODO test that it returns exactly what user provided

        // TODO getActualOptions

        highlightContestantHistory: (contestant_id) => {
            update_highlight(html_shell.matches_positioner, contestant_id)
        }
    }
}
