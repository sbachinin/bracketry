import { validate_matches } from './data/validate_matches.mjs'
import { handle_data_errors } from './data/handle_errors.mjs'
import { get_match_element } from './draw/get_match_element.mjs'
import { is_valid_number } from './utils.mjs'
import { update_highlight } from './ui_events/highlight.mjs'

export const apply_matches_updates = (updates, actual_data, html_shell, get_option, repaint) => {
    if (!Array.isArray(actual_data.matches)) return
    if (!Array.isArray(updates)) {
        console.warn(`applyMatchesUpdates must be called with an array of matches, instead called with: `, updates)
        return
    }

    const { have_critical_error } = handle_data_errors(validate_matches(updates, actual_data.contestants))
    if (have_critical_error) return

    const hl_contestant_id = html_shell.matches_positioner
        .querySelector('.side-wrapper.highlighted')
        ?.getAttribute('contestant-id')

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
            get_match_element(u.roundIndex, u.order, actual_data, get_option)
        )
    })

    repaint()

    if (typeof hl_contestant_id === 'string' && hl_contestant_id.length) {
        update_highlight(html_shell.matches_positioner, hl_contestant_id)
    }
}