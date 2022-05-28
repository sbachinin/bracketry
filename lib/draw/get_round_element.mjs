import { create_element_from_Html, get_n_things } from '../utils/utils.mjs'
import { add_flags_listeners, get_failed_img_srcs } from './flags.mjs'


const maybe_get_nationality = (player, all_data) => { // => div.nationality or empty string
    if (!all_data.have_nationalities) return ''
    
    let content = ''

    if (player.nationality_code) {
        content = player.nationality_code
    }

    if (player.flag_url && !get_failed_img_srcs().includes(player.flag_url)) {
        content = `<img class="player-flag" src="${player.flag_url}" loading=lazy />`
    }
    
    return `<div class="nationality">${ content }</div>`
}



const get_player_el = (pl, all_data) => `<div class="player-wrapper">
    ${ maybe_get_nationality(pl, all_data)}
    <div class="player-title">${ pl.title }</div>
</div>`



const get_side_content = (side, other_side, all_data) => {
    let content = ''

    if (all_data.have_entry_statuses) {
        content += `<div class="side-info-item entry-status">${side.entry_status || ''}</div>`
    }

    content += `<div class="side-info-item players-info">
        ${ side.players.map(pl => get_player_el(pl, all_data)).join('') }
    </div>`

    if (side.is_winner) {
        content += `<div class="side-info-item winner-mark">
            <svg class="default-winner-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>
        </div>`
    }

    content += `<div class="side-info-item score">
        ${ side.score.map(s => `<div class="single-score">
            <span class="main-score">${ s.main_score }</span>
            ${ typeof s.tie_break === 'number' ? `<span class="tie-break">${ s.tie_break }</span>` : '' }
        </div>`).join('') }
    </div>`

    if (side.subscore) {
        content += `<div class="side-info-item subscore">${ side.subscore }</div>`
    }

    if (other_side?.is_serving) {
        content += '<div class="side-info-item serving-mark transparent"></div>'
    } else if (side.is_serving) {
        content += '<div class="side-info-item serving-mark"></div>'
    }

    return content
}



const get_side_el = (side, other_side, all_data) => {
    return `<div class="side-wrapper
            ${side === undefined ? 'empty-side' : ''}
            ${other_side?.is_winner ? 'looser' : ''}
            ${side?.is_winner ? 'winner' : ''}
        "
        ${side ? ` contestant-id="${ side.contestant_id }"` : ''}
    >
        ${ side ? get_side_content(side, other_side, all_data) : '' }
    </div>`
}



const get_match_el = (round_id, match_index, all_data) => {
    const m = all_data.matches.find(m => m.round_id === round_id && m.order === match_index)
    
    if (m === undefined) {
        return `<div class="match-wrapper missing-match-placeholder">
            ${ get_side_el(null, null) }
            ${ get_side_el(null, null) }
            <div class="match-lines-area">
                <div class="line-wrapper upper"></div>
                <div class="line-wrapper lower"></div>
            </div>
        </div>`
    }

    return `<div class="match-wrapper ${ m.is_live ? 'live' : ''}" match-id="${m.match_id}">
        <div class="match-body">
            ${ get_side_el(m.sides[0], m.sides[1], all_data) }
            ${ get_side_el(m.sides[1], m.sides[0], all_data) }
        </div>
        <div class="match-lines-area">
            <div class="line-wrapper upper"></div>
            <div class="line-wrapper lower"></div>
        </div>
    </div>`
}



export const get_round_element = (all_data, round_id, round_index) => {
    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)

    const round_el = create_element_from_Html(`
        <div class="round-wrapper">
            ${
                get_n_things(
                    match_count,
                    (_, match_index) => get_match_el(round_id, match_index, all_data)
                ).join('')
            }
        </div>
    `)

    add_flags_listeners(round_el)

    return round_el
}
