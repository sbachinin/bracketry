import { create_element_from_Html } from '../utils/utils.mjs'
import { get_match_scores_element } from './get_match_scores_element.mjs'
import { dummy_item, dummy_match_pair } from './utils.mjs'
import { add_flags_listeners, get_failed_img_srcs } from './flags.mjs'

const populate_round_column = (match_count, actual_matches, get_match_info_pair_el) => {
    return Array.from(Array(match_count)).map((_, match_index) => {
        const maybe_match = actual_matches.find(m => m.order === match_index)
        if (maybe_match === undefined) {
            return dummy_match_pair
        }
        return get_match_info_pair_el(maybe_match)
    }).join('')
}

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

    const el = create_element_from_Html(`
        <div class="round-wrapper" style="width: ${state.first_round_width}px"></div>
    `)

    const round_can_be_visible = round_index >= Math.floor(state.anchor_round_index)
    if (!round_can_be_visible) return el // return a placeholder that occupies the width
    





    let round_content = ''

    if (options.onMatchClick) {
        round_content += `<section class="round-column pseudo-column matches-clickable-areas">
            ${populate_round_column(
                match_count,
                round.matches,
                (m) => `<div class="match-clickable-area" match-id="${m.id}"></div>`
            )}
        </section>`
    }


    round_content += `<div class="round-column entry-statuses">
        ${populate_round_column(
            match_count,
            round.matches,
            (m) => `
                <div class="match-info-pair" style="align-items: center;">
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
            `
        )}
    </div>`

        
    round_content += `<div class="round-column nationalities"">
        ${populate_round_column(
            match_count,
            round.matches,
            (m) => `
                <div class="match-info-pair" style="align-items: center;">
                    ${get_nationality_item(m.sides[0])}
                    ${get_nationality_item(m.sides[1])}
                </div>
            `
        )}
    </div>`


    round_content += `<div class="round-column team-titles" style="align-items: flex-start;">
        ${populate_round_column(
            match_count,
            round.matches,
            (m) => `
                <div class="match-info-pair" match-id="${m.id}">
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
            `
        )}
    </div>`


    round_content += `<div class="round-column result-mark"">
        ${populate_round_column(
            match_count,
            round.matches,
            (m) => `
                <div class="match-info-pair" style="align-items: center;">
                    ${ get_result_mark(m.sides[0]?.result, options) }
                    ${ get_result_mark(m.sides[1]?.result, options) }
                </div>
            `
        )}
    </div>`

    round_content += `<div class="round-column scores">
        ${populate_round_column(
            match_count,
            round.matches,
            (m) => get_match_scores_element(m)
        )}
    </div>`

    el.innerHTML = round_content

    add_flags_listeners(el)
    
    return el
}
