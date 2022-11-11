import { create_element_from_Html, is_object, deep_clone_object } from '../utils.mjs'
import { get_single_score, get_scores_for_side } from './get_scores_for_side.mjs'
import { get_default_or_custom_html } from './get_default_or_custom_html.mjs'
import { try_get_custom_element } from './try_get_custom_element.mjs'

const checkmark_svg = `<svg class="default-winner-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>`

const fill_player_template = (nationality, title) => {
    return `<div class="player-wrapper">
        <div class="nationality">${nationality}</div>
        <div class="player-title">${title}</div>
    </div>`
}


const get_player_html = (player, context, all_data, get_option) => {
    const nationality = get_default_or_custom_html(
        () => player.nationality,
        get_option('getNationalityHTML'),
        [ player, context ],
        'getNationalityHTML',
    )
    
    const title = get_default_or_custom_html(
        () => player.title,
        get_option('getPlayerTitleHTML'),
        [ deep_clone_object(player), context ],
        'getPlayerTitleHTML'
    )

    return fill_player_template(nationality, title)
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
    let current_score = ''
    let hidden_serving_class = 'hidden'
    let transparent_serving_class = 'transparent'

    if (is_object(this_side)) {
        if (this_side.isWinner === true) { winner_class = 'winner' }
        if (typeof this_side.contestantId === 'string') {
            contestantId = `contestant-id="${this_side.contestantId}"`
        }
        
        if (typeof this_side.contestantId !== 'string' && typeof this_side.title === 'string') {
            // render bare side.title if side has no contestant_id
            players_html = fill_player_template('', this_side.title)
        }

        scores_html = get_default_or_custom_html(
            () => get_scores_for_side(this_side, other_side),
            get_option('getScoresHTML'),
            [ deep_clone_object(this_side), deep_clone_object(match) ],
            'getScoresHTML'
        )
        
        // TODO if current score is defined but invalid, you get an empty box with border
        if (this_side.currentScore !== undefined) {
            current_score = get_single_score(
                { mainScore: this_side.currentScore },
                { mainScore: other_side?.currentScore }
            )
        }

        if (this_side.isServing === true || other_side?.isServing === true) { hidden_serving_class = '' }
        if (this_side.isServing === true) { transparent_serving_class = '' }

        let contestant = all_data.contestants?.[this_side.contestantId]

        if (contestant) {
            let context = { roundIndex: match.roundIndex, matchOrder: match.order, contestantId: this_side.contestantId }

            const bare_entry_status = all_data.contestants[context.contestantId].entryStatus
            entry_status = get_default_or_custom_html(
                () => bare_entry_status,
                get_option('getEntryStatusHTML'),
                [ bare_entry_status, context ],
                'getEntryStatusHTML'
            )

            players_html = (contestant.players || []).map(
                (pl, playerIndex) => {
                    return get_player_html(pl, { ...context, playerIndex }, all_data, get_option)
                }
            ).join('')
        }
    }

    if (other_side) {
        if (other_side.isWinner === true) { looser_class = 'looser' }
    }

    return `
        <div class="side-wrapper ${looser_class} ${winner_class}"  ${contestantId}>
            <div class="side-info-item entry-status">${entry_status}</div>
            <div class="side-info-item players-info">${players_html}</div>
            <div class="side-info-item winner-mark">${checkmark_svg}</div>
            <div class="side-info-item side-scores">${scores_html}</div>
            <div class="side-info-item current-score">${current_score}</div>
            <div class="side-info-item serving-mark ${hidden_serving_class} ${transparent_serving_class}"></div>
        </div>
    `
}



const get_match_content = (
    maybe_match_data, 
    all_data, 
    round_index, 
    match_order, 
    get_option
) => { // => .match-body or ''

// maybe use custom match renderer provided by user
// try this even if there is no data for a match
    const custom_match_element = try_get_custom_element(
        get_option('getMatchElement'),
        [ round_index, match_order ],
        'getMatchElement'
    )
    if (custom_match_element === null) { // null indicates that a user wishes not to render default stuff
        return ''
    }

    const match_body_element = create_element_from_Html(`<div class="match-body"></div>`)

    if (custom_match_element instanceof Element) {
        match_body_element.append(custom_match_element)
        return match_body_element
    }

// here: custom getMatchElement wasn't provided or returned smth invalid

    if (maybe_match_data === undefined) {
        return ''
    }



// render a contentful match using default layout
    if (
        Array.isArray(maybe_match_data.sides)
        && maybe_match_data.sides.find(s => is_object(s) && Object.keys(s).length > 0)
    ) {
        match_body_element.innerHTML += `
            <div class="sides">
                ${get_side_html(maybe_match_data, 0, all_data, get_option)}
                ${get_side_html(maybe_match_data, 1, all_data, get_option)}
            </div>
        `
    }

    if (typeof maybe_match_data.matchStatus === 'string' && maybe_match_data.matchStatus.length) {
        match_body_element.innerHTML += `<div class="match-status">${maybe_match_data.matchStatus}</div>`
    }

    return match_body_element
}





export const get_match_element = (round_index, match_order, all_data, get_option) => {
    const maybe_match_data = all_data.matches?.find(m => m.roundIndex === round_index && m.order === match_order)

    const should_be_live = (
        Array.isArray(maybe_match_data?.sides)
        && maybe_match_data?.sides.length
        && maybe_match_data?.isLive === true
        && typeof get_option('getMatchElement') !== 'function'
    )

// create a shell of a match
    const match_wrapper_element = create_element_from_Html(`
        <div
            class="
                match-wrapper
                ${should_be_live ? 'live' : ''}
                ${match_order % 2 === 0 ? 'even' : 'odd'}
            "
            match-order="${match_order}"
        >
            <div class="match-lines-area">
                <div class="line-wrapper upper"></div>
                <div class="line-wrapper lower"></div>
            </div>
        </div>
    `)

    
    match_wrapper_element.prepend(
        get_match_content(
            maybe_match_data, 
            all_data, 
            round_index, 
            match_order, 
            get_option
        )
    )
    
    return match_wrapper_element
}