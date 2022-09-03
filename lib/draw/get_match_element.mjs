import { get_original_data_copy } from '../data/get_original_data_copy.mjs'
import { create_element_from_Html } from '../utils.mjs'

const checkmark_svg = `<svg class="default-winner-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>`

const fill_player_template = (nationality, title) => {
    return `<div class="player-wrapper">
        <div class="nationality">${nationality}</div>
        <div class="player-title">${title}</div>
    </div>`
}


const get_entry_status_html = (context, all_data, get_option) => {
    let result = ''

    const contestant = all_data.contestants[context.contestantId]

    if (typeof contestant.entryStatus === 'string') {
        result = contestant.entryStatus.trim()
    }

    // if getEntryStatusHTML is a function, it should be called anyway, even if contestants[i].entryStatus is missing or invalid
    if (typeof get_option('getEntryStatusHTML') === 'function') {
        try {
            const unreliable_value = get_option('getEntryStatusHTML')(
                contestant.entryStatus, context, all_data
            )
            if (typeof unreliable_value === 'string') {
                result = unreliable_value
            } else {
                throw `options.getEntryStatusHTML must return a string, instead returned: ${unreliable_value}`
            }
        } catch (e) {
            console.warn('Failed to get a string from getEntryStatusHTML.', e)
        }
    }

    return result
}


const get_player_html = (player, context, all_data, get_option) => {
    let nationality = ''

    if (typeof player.nationality === 'string') {
        nationality = player.nationality.trim()
    }

    // if getNationalityHTML is a function, it should be called anyway, even if player.nationality is missing or invalid
    if (typeof get_option('getNationalityHTML') === 'function') {
        try {
            const unreliable_value = get_option('getNationalityHTML')(
                player.nationality, context, all_data
            )
            if (typeof unreliable_value === 'string') {
                nationality = unreliable_value
            } else {
                throw `options.getNationalityHTML must return a string, instead returned: ${unreliable_value}`
            }
        } catch (e) {
            console.warn('Failed to get a string from getNationalityHTML.', e)
        }
    }

    const title = typeof player.title === 'string' ? player.title : ''

    return fill_player_template(nationality, title)
}


const get_side_scores_html = (side, other_side) => {
    if (!Array.isArray(side.score)) return ''

    const single_score_html_strings = side.score.map((sc, i) => {
        if (sc.mainScore === undefined) return

        let is_winner = sc.isWinner ?? !!side.isWinner

        const side_own_score_html = `
                <div class="side-own-score">
                    <span class="main-score">${sc.mainScore}</span>
                    ${typeof sc.tieBreak === 'number' ? `<span class="tie-break">${sc.tieBreak}</span>` : ''}
                </div>
            `

        let other_side_score_html = ''
        if (other_side && Array.isArray(other_side.score) && other_side.score[i]) {
            other_side_score_html = `
                    <span class="other-side-invisible_score">
                        <span class="main-score">${other_side.score[i].mainScore}</span>
                        ${typeof other_side.score[i].tieBreak === 'number' ? `<span class="tie-break">${other_side.score[i].tieBreak}</span>` : ''}
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


const get_side_html = (match, side_index, all_data, get_option) => {
    const this_side = match.sides?.[side_index]
    const other_side = match.sides?.[side_index === 1 ? 0 : 1]

    let looser_class = ''
    let winner_class = ''
    let contestantId = ''
    let entry_status = ''
    let players_html = ''
    let scores_html = ''
    let subscore = ''
    let hidden_serving_class = ''
    let transparent_serving_class = ''

    if (this_side) {
        if (this_side.isWinner) { winner_class = 'winner' }
        if (typeof this_side.contestantId === 'string') {
            contestantId = `contestant-id="${this_side.contestantId}"`
        } else if (typeof this_side.title === 'string') {
            players_html = fill_player_template('', this_side.title)
        }

        scores_html = get_side_scores_html(this_side, other_side)
        subscore = this_side.subscore ?? ''

        if (!this_side.isServing && !other_side?.isServing) { hidden_serving_class = 'hidden' }
        if (other_side?.isServing) { transparent_serving_class = 'transparent' }

        let contestant = all_data.contestants?.[this_side.contestantId]

        if (contestant) {
            entry_status = get_entry_status_html(
                { matchId: match.id, contestantId: this_side.contestantId },
                all_data,
                get_option
            )

            players_html = (contestant.players || []).map(
                (pl, playerIndex) => {
                    return get_player_html(
                        pl,
                        { matchId: match.id, contestantId: this_side.contestantId, playerIndex },
                        all_data,
                        get_option
                    )
                }
            ).join('')
        }
    }

    if (other_side) {
        if (other_side.isWinner) { looser_class = 'looser' }
    }

    // TODO perhaps can simplify serving-mark using :empty
    return `
        <div class="side-wrapper ${looser_class} ${winner_class}"  ${contestantId}>
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
    const maybe_match_data = all_data.matches?.find(m => m.roundIndex === round_index && m.order === match_order)



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
    if (typeof render_match === 'function') {
        try {
            const maybe_el = render_match(round_index, match_order, get_original_data_copy(all_data))
            if (maybe_el instanceof Element || typeof maybe_el === 'string') {
                match_wrapper_element.prepend(match_body_element)
                match_body_element.append(maybe_el)
            } else {
                throw `It returned a value which is neither a string nor an Element`
            }
        } catch (e) {
            console.warn(`Failed to get an element from getMatchElement. `, e)
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
            ${get_side_html(maybe_match_data, 0, all_data, get_option)}
            ${get_side_html(maybe_match_data, 1, all_data, get_option)}
        </div>
    `

    const have_score = !!maybe_match_data.sides
        && maybe_match_data.sides.find(side => Array.isArray(side.score) && side.score.length)

    if (!have_score && maybe_match_data.matchStatus) {
        match_body_element.innerHTML += `<div class="match-status">${maybe_match_data.matchStatus}</div>`
    }

    match_wrapper_element.prepend(match_body_element)
    return match_wrapper_element
}