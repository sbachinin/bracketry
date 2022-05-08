import { create_element_from_Html } from '../utils/utils.mjs'
import { get_match_scores_element } from './get_match_scores_element.mjs'
import { dummy_item } from './utils.mjs'
import { add_flags_listeners, get_failed_img_srcs } from './flags.mjs'

const get_title_item = (side, state) => `
    <div
        class="
            team-title-item
            ${ side.id === state.highlighted_team_id ? 'highlighted' : '' }
            ${ side.result === 'winner' ? 'winner' : '' }
        "
        team-id=${side.id}
    >
        ${side.title}
        &#8203;
    </div>
`

const get_result_mark = (result, options) => {
    if (result === 'winner' && options.show_winner_mark) {
        return `<div>${options.winner_mark}</div>`
    } else if (result === 'winner' && !options.show_winner_mark) {
        return dummy_item
    } else if (result === undefined) {
        return dummy_item
    } else { // render any given non-winner result which can be also HTML
        return `<div>${result}&#8203;</div>`
    }
}

const get_nationality_item = (side) => {
    if (side?.flag_url && !get_failed_img_srcs().includes(side?.flag_url)) {
        return `<div>
            <img class="team-flag" src="${side.flag_url}" loading=lazy />
            &#8203;
        </div>`
    }
    if (side?.nationality_code !== undefined) {
        return `<div>${side.nationality_code}&#8203;</div>`
    }
    return dummy_item
}

export const get_round_element = (all_data, round_index, state, options) => {
    const round = all_data.rounds[round_index]
    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)


    const info_pairs = Array.from(Array(match_count)).map((_, match_index) => {
        const m = round.matches.find(m => m.order === match_index)
        if (m === undefined) {
            return `<div class="missing-match-placeholder full-width-grid-column";></div>`
        }
        
        return `
            <div class="match-info-pair entry-statuses">
                ${
                    m.sides[0]?.entry_status === undefined
                    ? dummy_item
                    : `<div>${m.sides[0]?.entry_status}&#8203;</div>`
                }
                ${
                    m.sides[1]?.entry_status === undefined
                    ? dummy_item
                    : `<div>${m.sides[1]?.entry_status}&#8203;</div>`
                }

            </div>
            
            <div class="match-info-pair nationalities">
                ${get_nationality_item(m.sides[0])}
                ${get_nationality_item(m.sides[1])}
            </div>

            <div class="match-info-pair team-titles" match-id="${m.id}">
                ${
                    m.sides[0]?.title === undefined
                    ? dummy_item
                    : get_title_item(m.sides[0], state)
                }
                ${
                    m.sides[1]?.title === undefined
                    ? dummy_item
                    : get_title_item(m.sides[1], state)
                }
            </div>

            <div class="match-info-pair" style="align-items: center;">
                ${ get_result_mark(m.sides[0]?.result, options) }
                ${ get_result_mark(m.sides[1]?.result, options) }
            </div>

            ${ get_match_scores_element(m) }
        `

    })

    // RESTORE THIS!
    // add_flags_listeners(el)

    const round_can_be_visible = round_index >= Math.floor(state.anchor_round_index)
    
    return create_element_from_Html(`
        <div class="round-wrapper" style="
            ${ round_can_be_visible ? '' : 'height: 0' }
        ">${info_pairs.join('')}</div>
    `)
}
