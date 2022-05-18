import { get_match_scores_element } from './get_match_scores_element.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { get_pair } from './get_pair.mjs'

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






const get_nationalities_for_side = (maybe_players) => { // : string || undefined
    return maybe_players?.map((pl) => {
        let content = ''

        if (pl.flag_url && !get_failed_img_srcs().includes(pl.flag_url)) {
            content = `<img class="player-flag" src="${pl.flag_url}" loading=lazy />`
        } else if (pl.nationality_code !== undefined) {
            content = pl.nationality_code
        }
        return `<div>
            <div class="height-maker">&#8203;</div>
            ${content}
        </div>`

    }).join('')
}







const get_titles_for_side = (maybe_side) => { // : string || undefined
    return maybe_side?.players.map(p => `<div class="player-title-item">${ p.title }</div>`).join('')
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
            'players-titles',
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