import { get_original_data_copy } from '../data/get_original_data_copy.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { create_element_from_Html } from '../utils.mjs'


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

    let contestant = all_data.contestants?.[side.contestant_id]

    if (!contestant) return ''

    if (all_data.have_entry_statuses) {
        content += `<div class="side-info-item entry-status">${contestant.entry_status || ''}</div>`
    }

    content += `<div class="side-info-item players-info">
        ${ contestant.players.map(pl => get_player_el(pl, all_data)).join('') }
    </div>`

    if (side.is_winner) {
        content += `<div class="side-info-item winner-mark">
            <svg class="default-winner-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>
        </div>`
    }

    if (Array.isArray(side.score)) {
        content += `<div class="side-info-item score">
            ${ side.score.map((sc, i) => {
                let is_winner = sc.is_winner
                if (is_winner === undefined) {
                    is_winner = !!side.is_winner
                }

                const side_own_score_html = `
                    <div class="side-own-score">
                        <span class="main-score">${ sc.main_score }</span>
                        ${ typeof sc.tie_break === 'number' ? `<span class="tie-break">${ sc.tie_break }</span>` : '' }
                    </div>
                `

                let other_side_score_html = ''
                if (other_side && Array.isArray(other_side.score) && other_side.score[i]) {
                    other_side_score_html = `
                        <span class="other-side-score"> <!-- this block is for horizontal alignment between two sides' scores -->
                            <span class="main-score">${ other_side.score[i].main_score }</span>
                            ${ typeof other_side.score[i].tie_break === 'number' ? `<span class="tie-break">${ other_side.score[i].tie_break }</span>` : '' }
                        </span>
                    `
                }

                return `<div class="single-score ${is_winner ? 'winner' : ''}">
                    ${side_own_score_html}
                    ${other_side_score_html}
                </div>`
            }).join('') }
        </div>`
    }

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



const get_side_html = (side, other_side, all_data) => {
    const contestant = all_data.contestants?.[side?.contestant_id]

    return `
        <div
            class="
                side-wrapper
                ${side === undefined || contestant === undefined ? 'empty-side' : ''}
                ${other_side?.is_winner ? 'looser' : ''}
                ${side?.is_winner ? 'winner' : ''}
            "
            ${ side ? ` contestant-id="${ side.contestant_id }"` : '' }
        >
            ${ side ? get_side_content(side, other_side, all_data) : '' }
        </div>
    `
}



export const get_match_element = (round_index, match_order, all_data, get_option) => {
    const maybe_match_data = all_data.matches?.find(m => m.round_index === round_index && m.order === match_order)



// create a shell of a match
    const match_wrapper_element = create_element_from_Html(`
        <div
            class="match-wrapper ${ maybe_match_data?.is_live ? 'live' : ''} ${match_order%2 === 0 ? 'even' : 'odd'}"
            ${maybe_match_data?.id ? `match-id="${maybe_match_data.id}"` : ''}
        >
            <div class="match-lines-area">
                <div class="line-wrapper upper"></div>
                <div class="line-wrapper lower"></div>
            </div>
        </div>
    `)

    const match_body_element = create_element_from_Html(`<div class="match-body"></div>`)
    match_wrapper_element.prepend(match_body_element)




// maybe use custom match renderer provided by user
    const render_match = get_option('getMatchElement')
    if (render_match !== null) {
        const maybe_el = render_match(round_index, match_order, get_original_data_copy(all_data))
        if (maybe_el instanceof Element || typeof maybe_el === 'string') {
            match_body_element.append(maybe_el)
        } else {
            console.warn(`getMatchElement function has to return an Element, instead returned: `, maybe_el)
        }
        return match_wrapper_element
    }




// otherwise: maybe return a 'placeholder' of a match
    if (maybe_match_data === undefined) {
        match_body_element.innerHTML = `
            ${ get_side_html(null, null, all_data) }
            ${ get_side_html(null, null, all_data) }
        `
        return match_wrapper_element
    }



// otherwise: render a contentful match using default layout
    match_body_element.innerHTML = `
        <div class="sides">
            ${ get_side_html(maybe_match_data.sides[0], maybe_match_data.sides[1], all_data) }
            ${ get_side_html(maybe_match_data.sides[1], maybe_match_data.sides[0], all_data) }
        </div>
    `
    
    const have_score = maybe_match_data.sides.find(side => Array.isArray(side.score) && side.score.length)
    if (!have_score && maybe_match_data.match_status) {
        match_body_element.innerHTML += `<div class="match-status">${maybe_match_data.match_status}</div>`
    }

    return match_wrapper_element
}