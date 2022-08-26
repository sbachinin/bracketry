import { get_original_data_copy } from '../data/get_original_data_copy.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { create_element_from_Html } from '../utils.mjs'

const checkmark_svg = `<svg class="default-winner-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>`


const get_player_el = (player) => {
    const flag_img_html = player.flag_url
        && !get_failed_img_srcs().includes(player.flag_url)
        && `<img class="player-flag" src="${player.flag_url}" loading=lazy />`

    let nationality = typeof player.nationality_code === 'string'
        ? player.nationality_code
        : (flag_img_html || '')

// TODO is .player-wrapper necessary?
    return `<div class="player-wrapper">
        <div class="nationality">${nationality}</div>
        <div class="player-title">${typeof player.title === 'string' ? player.title : ''}</div>
    </div>`
}


const get_side_scores_html = (side, other_side) => {
    if (!Array.isArray(side.score)) return ''

    const single_score_html_strings = side.score.map((sc, i) => {
        if (sc.main_score === undefined) return

        let is_winner = sc.is_winner ?? !!side.is_winner

        const side_own_score_html = `
                <div class="side-own-score">
                    <span class="main-score">${sc.main_score}</span>
                    ${typeof sc.tie_break === 'number' ? `<span class="tie-break">${sc.tie_break}</span>` : ''}
                </div>
            `

        let other_side_score_html = ''
        if (other_side && Array.isArray(other_side.score) && other_side.score[i]) {
            other_side_score_html = `
                    <span class="other-side-invisible_score">
                        <span class="main-score">${other_side.score[i].main_score}</span>
                        ${typeof other_side.score[i].tie_break === 'number' ? `<span class="tie-break">${other_side.score[i].tie_break}</span>` : ''}
                    </span>
                `
        }

        return `<div class="single-score ${is_winner ? 'winner' : ''}">
                ${side_own_score_html}
                ${other_side_score_html}
            </div>`
    })

    return single_score_html_strings.join('')
}


const get_side_html = (side, other_side, all_data) => {

    let looser_class = ''
    let winner_class = ''
    let contestant_id = ''
    let entry_status = ''
    let players_html = ''
    let scores_html = ''
    let subscore = ''
    let hidden_serving_class = ''
    let transparent_serving_class = ''

    if (side) {
        if (side.is_winner) { winner_class = 'winner' }
        if (typeof side.contestant_id === 'string') {
            contestant_id = `contestant-id="${side.contestant_id}"`
        } else if (typeof side.title === 'string') {
            players_html = get_player_el({ title: side.title })
        }

        scores_html = get_side_scores_html(side, other_side)
        subscore = side.subscore ?? ''

        if (!side.is_serving && !other_side?.is_serving) { hidden_serving_class = 'hidden' }
        if (other_side?.is_serving) { transparent_serving_class = 'transparent' }

        let contestant = all_data.contestants?.[side.contestant_id]

        if (contestant) {
            entry_status = (typeof contestant.entry_status === 'string') ? contestant.entry_status : ''
            players_html = contestant.players.map(pl => get_player_el(pl, all_data)).join('')
        }
    }

    if (other_side) {
        if (other_side.is_winner) { looser_class = 'looser' }
    }

    // TODO perhaps can simplify serving-mark using :empty
    return `
        <div class="side-wrapper ${looser_class} ${winner_class}"  ${contestant_id}>
            <div class="side-info-item entry-status">${entry_status}</div>
            <div class="side-info-item players-info">${players_html}</div>
            <div class="side-info-item winner-mark">${checkmark_svg}</div>
            <div class="side-info-item side-scores">${scores_html}</div>
            <div class="side-info-item subscore">${subscore}</div>
            <div class="side-info-item serving-mark ${hidden_serving_class} ${transparent_serving_class}"></div>
        </div>
    `
}



export const get_match_element = (round_index, match_order, all_data, get_option) => {
    const maybe_match_data = all_data.matches?.find(m => m.round_index === round_index && m.order === match_order)



// create a shell of a match
    const match_wrapper_element = create_element_from_Html(`
        <div
            class="match-wrapper ${maybe_match_data?.is_live ? 'live' : ''} ${match_order % 2 === 0 ? 'even' : 'odd'}"
            ${maybe_match_data?.id ? `match-id="${maybe_match_data.id}"` : ''}
        >
            <div class="match-lines-area">
                <div class="line-wrapper upper"></div>
                <div class="line-wrapper lower"></div>
            </div>
        </div>
    `)

    const match_body_element = create_element_from_Html(`<div class="match-body"></div>`)




// maybe use custom match renderer provided by user
    const render_match = get_option('getMatchElement')
    if (render_match !== null) {
        const maybe_el = render_match(round_index, match_order, get_original_data_copy(all_data))
        if (maybe_el instanceof Element || typeof maybe_el === 'string') {
            match_wrapper_element.prepend(match_body_element)
            match_body_element.append(maybe_el)
        } else {
            console.warn(`getMatchElement function has to return an Element, instead returned: `, maybe_el)
        }
        return match_wrapper_element
    }




// otherwise: maybe return a 'placeholder' of a match
    if (maybe_match_data === undefined) {
        return match_wrapper_element
    }



// otherwise: render a contentful match using default layout
    match_body_element.innerHTML += `
        <div class="sides">
            ${get_side_html(maybe_match_data.sides?.[0], maybe_match_data.sides?.[1], all_data)}
            ${get_side_html(maybe_match_data.sides?.[1], maybe_match_data.sides?.[0], all_data)}
        </div>
    `

    const have_score = !!maybe_match_data.sides
        && maybe_match_data.sides.find(side => Array.isArray(side.score) && side.score.length)

    if (!have_score && maybe_match_data.match_status) {
        match_body_element.innerHTML += `<div class="match-status">${maybe_match_data.match_status}</div>`
    }

    match_wrapper_element.prepend(match_body_element)
    return match_wrapper_element
}