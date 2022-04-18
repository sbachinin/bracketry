import { create_element_from_Html } from '../utils/utils.mjs'
import { get_match_scores_element } from './get_match_scores_element.mjs'

const get_item_el = (maybe_value) => {
    if (maybe_value === undefined) {
        return '<div class="empty-item">&#8203;</div>'
    }
    return `<div>${maybe_value}&#8203;</div>`
}

const dummy_match_pair = `
    <div class="match-info-pair">
        <div class="empty-item">&#8203;</div>
        <div class="empty-item">&#8203;</div>
    </div>
`

const populate_round_column = (match_count, actual_matches, get_match_info_pair_el) => {
    return Array.from(Array(match_count)).map((_, match_index) => {
        const maybe_match = actual_matches.find(m => (m.order - 1) === match_index)
        if (maybe_match === undefined) {
            return dummy_match_pair
        }
        return get_match_info_pair_el(maybe_match)
    }).join('')
}

export const get_round_element = (round, round_last_index, options) => {

    const match_count = Math.pow(2, round_last_index)

    const el = create_element_from_Html(`
        <div class="round-wrapper">
            <div class="round-column entry-statuses" style="align-items: center;">
                ${populate_round_column(
                    match_count,
                    round.matches,
                    (m) => `
                        <div class="match-info-pair" style="text-align: center;">
                            ${get_item_el(m.sides[0]?.entry_status)}
                            ${get_item_el(m.sides[1]?.entry_status)}
                        </div>
                    `
                )}
            </div>
            <div class="round-column nationalities" style="align-items: center;">
                ${populate_round_column(
                    match_count,
                    round.matches,
                    (m) => `
                        <div class="match-info-pair" style="text-align: center;">
                            ${get_item_el(m.sides[0]?.nationality_code)}
                            ${get_item_el(m.sides[1]?.nationality_code)}
                        </div>
                    `
                )}
            </div>
            <div class="round-column team-titles" style="align-items: flex-start;">
                ${populate_round_column(
                    match_count,
                    round.matches,
                    (m) => `
                        <div class="match-info-pair">
                            ${get_item_el(m.sides[0]?.title)}
                            ${get_item_el(m.sides[1]?.title)}
                        </div>
                    `
                )}
            </div>
            <div class="round-column winner-mark" style="align-items: flex-start;">
                ${populate_round_column(
                    match_count,
                    round.matches,
                    (m) => `
                        <div class="match-info-pair">
                            ${get_item_el(m.sides[0]?.isWinner ? options.winner_mark : undefined)}
                            ${get_item_el(m.sides[1]?.isWinner ? options.winner_mark : undefined)}
                        </div>
                    `
                )}
            </div>
            <div class="round-column scores" style="align-items: flex-start;">
                ${populate_round_column(
                    match_count,
                    round.matches,
                    (m) => get_match_scores_element(m)
                )}
            </div>
        </div>

    `)
    return el
}