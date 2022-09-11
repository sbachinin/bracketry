import { is_object, is_valid_number, get_n_things, remove_whitespace_from_html } from '../utils.mjs'

const is_displayable_score = s => {
    return is_valid_number(s) || typeof s === 'string'
}


export const get_single_score = (own_score, opponent_score) => {
    const own_main_score = is_displayable_score(own_score?.mainScore)
        ? own_score.mainScore
        : ''
    const own_tiebreak = is_displayable_score(own_score?.tieBreak)
        ? `<span class="tie-break">${own_score.tieBreak}</span>`
        : ''

    const opponent_main_score = is_displayable_score(opponent_score?.mainScore)
        ? opponent_score.mainScore
        : ''
    const opponent_tiebreak = is_displayable_score(opponent_score?.tieBreak)
        ? `<span class="tie-break">${opponent_score.tieBreak}</span>`
        : ''

    return remove_whitespace_from_html(
        `<div class="single-score-wrapper ${own_score?.isWinner ? 'winner' : ''}">
            <div class="side-own-single-score">
                <span class="main-score">${own_main_score}</span>
                ${own_tiebreak}
            </div>
            <span class="opponent-single-score">
                <span class="main-score">${opponent_main_score}</span>
                ${opponent_tiebreak}
            </span>
        </div>`
    )
}


export const get_scores_for_side = (side, other_side) => {
    const own_score = (is_object(side) && Array.isArray(side.score)) ? side.score : []
    const opponent_score = (is_object(other_side) && Array.isArray(other_side.score)) ? other_side.score : []
    const max_score_length = Math.max(own_score.length, opponent_score.length)

    // render as much <single-score-wrapper>s as the longest score of both sides
    const strings = get_n_things(
        max_score_length,
        (i) => get_single_score(own_score[i], opponent_score[i])
    )
    return strings.join('')
}