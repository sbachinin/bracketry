import { get_match_scores_element } from './get_match_scores_element.mjs'
import { dummy_item } from './utils.mjs'
import { get_failed_img_srcs } from './flags.mjs'




/* 

    .match-info-pair
        .side-info-item
            .player-info-item
        .side-info-item
            ...

*/


const get_pair = (pair_class, match_id, side0_html, side1_html) => {
    return `<div class="match-info-pair ${pair_class}" match-id="${match_id}">
        <div class="side-info-item">
            ${side0_html}
        </div>
        <div class="side-info-item">
            ${side1_html}
        </div>
    </div>`
}


const get_entry_status_pair = (match) => {
    return get_pair(
        'entry-statuses',
        match.id,
        match.sides[0]?.[0]?.entry_status === undefined
            ? dummy_item
            : `<div>${match.sides[0]?.entry_status}&#8203;</div>`,
        match.sides[1]?.[0]?.entry_status === undefined
            ? dummy_item
            : `<div>${match.sides[1]?.entry_status}&#8203;</div>`
    )
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
const get_nationality_pair = (match) => {
    return get_pair(
        'nationalities',
        match.id,
        get_nationality_item(match.sides[0]?.[0]),
        get_nationality_item(match.sides[1]?.[0])
    )
}







const get_title_item = (player) => { return `
    <div
        class="team-title-item ${ player.result === 'winner' ? 'winner' : '' }"
        team-id=${player.id}
    >
        ${player.title}
        &#8203;
    </div>
`}
const get_titles_pair = (match) => {
    return get_pair(
        'team-titles',
        match.id,
        match.sides[0]?.[0]?.title === undefined
                ? dummy_item
                : get_title_item(match.sides[0]?.[0]),
        match.sides[1]?.[0]?.title === undefined
            ? dummy_item
            : get_title_item(match.sides[1]?.[0])
    )
}







const get_result_mark = (result, options) => {
    if (result === 'winner') {
        return `<div class="winner-mark-wrapper">${options.winner_mark}</div>`
    } else if (result === undefined) {
        return dummy_item
    } else { // render any given non-winner result which can be also HTML
        return `<div>${result}&#8203;</div>`
    }
}
const get_result_pair = (match, options) => {
    return get_pair(
        'result-status',
        match.id,
        get_result_mark(match.sides[0]?.[0]?.result, options),
        get_result_mark(match.sides[1]?.[0]?.result, options)
    )
}







export const get_match_info_html = (match, options) => {
    return `
        ${ get_entry_status_pair(match) }
        ${ get_nationality_pair(match) }
        ${ get_titles_pair(match) }
        ${ get_result_pair(match, options) }
        ${ get_match_scores_element(match) }
    `
}