import { create_element_from_Html } from '../utils/utils.mjs'
import { get_match_scores_element } from './get_match_scores_element.mjs'

const get_item_el = (item) => {
    if (item === undefined) {
        return '<div class="empty-item">&#8203;</div>'
    }
    return `<div>${item}&#8203;</div>`
}

export const get_round_element = (round, options) => {
    const el = create_element_from_Html(`
        <div class="round-wrapper">
            <div class="round-column entry-statuses" style="align-items: center;">
                ${round.matches.map(m => `
                    <div class="match-info-pair" style="text-align: center;">
                        ${get_item_el(m.sides[0]?.entry_status)}
                        ${get_item_el(m.sides[1]?.entry_status)}
                    </div>
                `).join('')}
            </div>
            <div class="round-column nationalities" style="align-items: center;">
                ${round.matches.map(m => `
                    <div class="match-info-pair" style="text-align: center;">
                        ${get_item_el(m.sides[0]?.nationality_code)}
                        ${get_item_el(m.sides[1]?.nationality_code)}
                    </div>
                `).join('')}
            </div>
            <div class="round-column team-titles" style="align-items: flex-start;">
                ${round.matches.map(m => `
                    <div class="match-info-pair">
                        ${get_item_el(m.sides[0]?.title)}
                        ${get_item_el(m.sides[1]?.title)}
                    </div>
                `).join('')}
            </div>
            <div class="round-column winner-mark" style="align-items: flex-start;">
                ${round.matches.map(m => `
                    <div class="match-info-pair">
                        ${get_item_el(m.sides[0]?.isWinner ? options.winner_mark : undefined)}
                        ${get_item_el(m.sides[1]?.isWinner ? options.winner_mark : undefined)}
                    </div>
                `).join('')}
            </div>
            <div class="round-column scores" style="align-items: flex-start;">
                ${round.matches.map(m => get_match_scores_element(m)).join('')}
            </div>
        </div>

    `)
    return el
}