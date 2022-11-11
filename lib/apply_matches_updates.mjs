import { validate_matches } from './data/validate_matches.mjs'
import { handle_data_errors } from './data/handle_errors.mjs'
import { get_match_content } from './draw/get_match_element.mjs'
import { is_valid_number } from './utils.mjs'
import { update_highlight } from './ui_events/highlight.mjs'

export const apply_matches_updates = (updates, all_data, html_shell, get_option, repaint) => {
    if (!Array.isArray(all_data.matches)) return
    if (!Array.isArray(updates)) {
        console.warn(`applyMatchesUpdates must be called with an array of matches, instead called with: `, updates)
        return
    }

    const { have_critical_error } = handle_data_errors(validate_matches(updates, all_data.contestants))
    if (have_critical_error) return

    const hl_contestant_id = html_shell.matches_positioner
        .querySelector('.side-wrapper.highlighted')
        ?.getAttribute('contestant-id')

    updates.forEach(u => {
        if (!is_valid_number(u.order) || !is_valid_number(u.roundIndex)) return

        const old_match_data_i = all_data.matches.findIndex((old_match) => {
            return old_match.roundIndex === u.roundIndex && old_match.order === u.order
        })

        if (old_match_data_i > -1) {
            all_data.matches[old_match_data_i] = u
        } else {
            all_data.matches.push(u)
        }

        const round_el = html_shell.the_root_element.querySelector(`.round-wrapper[round-index="${u.roundIndex}"]`)
        const match_wrapper = round_el?.querySelector(`.match-wrapper[match-order="${u.order}"]`)

        if (!match_wrapper) return // perhaps a combination of roundIndex & order was impossible

        match_wrapper.querySelector('.match-body')?.remove()
        const content = get_match_content(u, all_data, u.roundIndex, u.order, get_option)
        match_wrapper.prepend(content || '')
    })

    repaint()

    if (typeof hl_contestant_id === 'string' && hl_contestant_id.length) {
        update_highlight(html_shell.matches_positioner, hl_contestant_id)
    }
}