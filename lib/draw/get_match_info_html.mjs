import { get_match_scores_element } from './get_match_scores_element.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { get_n_things } from '../utils/utils.mjs'


const dummy_item = '<div class="dummy">&#8203;</div>'

/* 

    .match-info-pair
        .side-info-item
            .players-info-wrapper
                div (.player-info-item)
                div
            .height-maker
        .side-info-item
            ...

*/


// this guy ensures that all side-info-items are at least as high as team-titles side-info-item
const get_height_maker = (match) => {
    const players_max_count = Math.max(
        match.sides[0]?.players.length || 0,
        match.sides[1]?.players.length || 0
    )
    return `<div class="height-maker">
        ${get_n_things(players_max_count, () => dummy_item).join('')}
    </div>`
}

const get_pair = (pair_class, match, side0_players_info, side1_players_info) => {
    return `<div class="match-info-pair ${pair_class}" match-id="${match.id}">
        <div class="side-info-item">
            <div class="players-info-wrapper">
                ${side0_players_info}
            </div>
            ${get_height_maker(match)}
        </div>
        <div class="side-info-item">
            <div class="players-info-wrapper">
                ${side1_players_info}
            </div>
            ${get_height_maker(match)}
        </div>
    </div>`
}


const get_entry_status_pair = (match) => {
    return get_pair(
        'entry-statuses',
        match,
        match.sides[0]?.entry_status === undefined
            ? dummy_item
            : `<div>${match.sides[0]?.entry_status}</div>`,
        match.sides[1]?.entry_status === undefined
            ? dummy_item
            : `<div>${match.sides[1]?.entry_status}</div>`
    )
}




const get_nationalities_for_side = (side) => {
    if (!side) return ''

    return side.players.map((pl) => {
        let content = ''

        if (pl.flag_url && !get_failed_img_srcs().includes(pl.flag_url)) {
            content = `<img class="team-flag" src="${pl.flag_url}" loading=lazy />`
        } else if (side.nationality_code !== undefined) {
            content = side.nationality_code
        }
        return `<div>
            <div class="height-maker">&#8203;</div>
            ${content}
        </div>`

    }).join('')
}
const get_nationality_pair = (match) => {
    return get_pair(
        'nationalities',
        match,
        get_nationalities_for_side(match.sides[0]),
        get_nationalities_for_side(match.sides[1])
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

const get_titles_for_side = (side) => {
    return side?.players.map(p => `
        <div class="player-info-item">${ p.title }</div>
    `).join('')
    // match.sides[0]?.[0]?.title === undefined
    //             ? dummy_item
    //             : get_title_item(match.sides[0]?.[0]),
    //     match.sides[1]?.[0]?.title === undefined
    //         ? dummy_item
    //         : get_title_item(match.sides[1]?.[0])


}

const get_titles_pair = (match) => {
    return get_pair(
        'team-titles',
        match,
        get_titles_for_side(match.sides[0]),
        get_titles_for_side(match.sides[1])
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
        match,
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