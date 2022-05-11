import { get_match_scores_element } from './get_match_scores_element.mjs'
import { dummy_item } from './utils.mjs'
import { get_failed_img_srcs } from './flags.mjs'

const get_title_item = (player) => { console.log(player); return `
    <div
        class="team-title-item ${ player.result === 'winner' ? 'winner' : '' }"
        team-id=${player.id}
    >
        ${player.title}
        &#8203;
    </div>
`}

const get_result_mark = (result, options) => {
    if (result === 'winner') {
        return `<div class="winner-mark-wrapper">${options.winner_mark}</div>`
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




export const get_match_info_html = (match, options) => {
    return `
        <div class="match-info-pair entry-statuses">
            ${
                match.sides[0]?.[0]?.entry_status === undefined
                ? dummy_item
                : `<div>${match.sides[0]?.entry_status}&#8203;</div>`
            }
            ${
                match.sides[1]?.[0]?.entry_status === undefined
                ? dummy_item
                : `<div>${match.sides[1]?.entry_status}&#8203;</div>`
            }

        </div>
        
        <div class="match-info-pair nationalities">
            ${get_nationality_item(match.sides[0]?.[0])}
            ${get_nationality_item(match.sides[1]?.[0])}
        </div>

        <div class="match-info-pair team-titles" match-id="${match.id}">
            ${
                match.sides[0]?.[0]?.title === undefined
                ? dummy_item
                : get_title_item(match.sides[0]?.[0])
            }
            ${
                match.sides[1]?.[0]?.title === undefined
                ? dummy_item
                : get_title_item(match.sides[1]?.[0])
            }
        </div>

        <div class="match-info-pair" style="align-items: center;">
            ${ get_result_mark(match.sides[0]?.[0]?.result, options) }
            ${ get_result_mark(match.sides[1]?.[0]?.result, options) }
        </div>

        ${ get_match_scores_element(match) }
    `
}