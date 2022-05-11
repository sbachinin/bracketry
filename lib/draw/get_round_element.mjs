import { create_element_from_Html } from '../utils/utils.mjs'
import { add_flags_listeners } from './flags.mjs'
import { get_match_info_html } from './get_match_info_html.mjs'

export const get_round_element = (all_data, round_index, options) => {
    const round = all_data.rounds[round_index]
    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)

    let whole_matches_html = ''
    let info_pairs_html = ''

    Array.from(Array(match_count)).map((_, match_index) => {
        const m = round.matches.find(m => m.order === match_index)
        
        if (m === undefined) {
            whole_matches_html += `<div class="whole-match zero-width"></div>`
            info_pairs_html += `<div class="missing-match-placeholder full-width-grid-column";></div>`
            return
        }

        whole_matches_html += `<div class="whole-match" match-id="${ m.id }"></div>`
        info_pairs_html += get_match_info_html(m, options)
    })

    const round_el = create_element_from_Html(`
        <div class="round-wrapper">
            ${ info_pairs_html }
            <div class="whole-matches-overlay">
                ${ whole_matches_html }
            </div>
        </div>
    `)

    add_flags_listeners(round_el)

    return round_el
}
