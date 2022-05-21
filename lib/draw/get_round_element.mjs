import { create_element_from_Html, get_n_things } from '../utils/utils.mjs'
import { add_flags_listeners, get_failed_img_srcs } from './flags.mjs'

const winner_mark = `<svg class="default-winner-mark" style="fill: #00a5de" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>`


const get_player_el = (pl) => {
    let nationality = ''
    if (pl.flag_url && !get_failed_img_srcs().includes(pl.flag_url)) {
        nationality = `<img class="player-flag" src="${pl.flag_url}" loading=lazy />`
    } else if (pl.nationality_code) {
        nationality = pl.nationality_code
    }

    return `<div class="player-wrapper">
        ${ nationality ? `<div class="nationality">${ nationality }</div>` : ''}
        <div class="player-title">${ pl.title }</div>
    </div>`
    

}

const get_side_content = (side, all_data) => {
    if (side === undefined) return ''

    let content = ''

    if (all_data.have_entry_status) {
        content += `<div class="side-info-item entry-status">${side.entry_status || ''}</div>`
    }

    content += `<div class="side-info-item players-info">
        ${ side.players.map(pl => get_player_el(pl)).join('') }
    </div>`

    content += `<div class="side-info-item winner-mark">
        ${ side.result === 'winner' ? winner_mark : ''}
    </div>`

    content += `<div class="side-info-item score">
        ${ side.score.map(s => `<div class="single-score">
            <span class="main-score">${ s.main_score }</span>
            <span class="tie-break">${ s.tie_break ?? '' }</span>
        </div>`).join('') }
    </div>`

    return content
}

const get_side_el = (side, all_data) => {
    return `<div
        class="side-wrapper ${side?.result === 'winner' ? 'winner' : ''}"
        contestant-id="${side?.contestant_id || ''}"
    >
        ${ get_side_content(side, all_data) }
    </div>`
}

const get_match_el = (round, match_index, all_data) => {
    const m = round.matches.find(m => m.order === match_index)
    
    if (m === undefined) {
        return `<div class="match-wrapper missing-match-placeholder"></div>`
    }

    return `<div class="match-wrapper" match-id="${m.id}">
        ${ get_side_el(m.sides[0], all_data) }
        ${ get_side_el(m.sides[1], all_data) }
    </div>`
}

export const get_round_element = (all_data, round_index, options) => {
    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)

    const round_el = create_element_from_Html(`
        <div class="round-wrapper">
            ${
                get_n_things(
                    match_count,
                    (_, match_index) => get_match_el(all_data.rounds[round_index], match_index, all_data)
                ).join('')
            }
        </div>
    `)

    add_flags_listeners(round_el)

    return round_el
}
