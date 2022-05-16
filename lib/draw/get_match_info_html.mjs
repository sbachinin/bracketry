import { get_match_scores_element } from './get_match_scores_element.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { get_n_things } from '../utils/utils.mjs'

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
        ${ get_n_things(players_max_count, () => '<div>&#8203;</div>').join('') }
    </div>`
}

const get_pair = (pair_class, match, side0_players_info, side1_players_info) => {
    return `<div class="match-info-pair ${pair_class}" match-id="${match.id}">
        <div class="side-info-item">
            <div class="players-info-wrapper">
                ${side0_players_info || ''}
            </div>
            ${get_height_maker(match)}
        </div>
        <div class="side-info-item">
            <div class="players-info-wrapper">
                ${side1_players_info || ''}
            </div>
            ${get_height_maker(match)}
        </div>
    </div>`
}



const get_nationalities_for_side = (maybe_players) => { // : string || undefined
    return maybe_players?.map((pl) => {
        let content = ''

        if (pl.flag_url && !get_failed_img_srcs().includes(pl.flag_url)) {
            content = `<img class="team-flag" src="${pl.flag_url}" loading=lazy />`
        } else if (pl.nationality_code !== undefined) {
            content = pl.nationality_code
        }
        return `<div>
            <div class="height-maker">&#8203;</div>
            ${content}
        </div>`

    }).join('')
}







const get_titles_for_side = (side) => { // : string || undefined
    return side?.players.map(p => `<div class="player-title-item">${ p.title }</div>`).join('')
}





export const get_match_info_html = (match, options) => {
    return `
        ${get_pair(
            'entry-statuses',
            match,
            match.sides[0]?.entry_status,
            match.sides[1]?.entry_status
        )}

        ${get_pair(
            'nationalities',
            match,
            get_nationalities_for_side(match.sides[0]?.players),
            get_nationalities_for_side(match.sides[1]?.players)
        )}

        ${get_pair(
            'team-titles',
            match,
            get_titles_for_side(match.sides[0]),
            get_titles_for_side(match.sides[1])
        )}

        ${get_pair(
            'result-status',
            match,
            match.sides[0]?.result === 'winner' ? options.winner_mark : match.sides[0]?.result,
            match.sides[1]?.result === 'winner' ? options.winner_mark : match.sides[1]?.result
        )}

        ${ get_match_scores_element(match) }
    `
}