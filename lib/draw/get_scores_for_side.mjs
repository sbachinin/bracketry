import { is_object, is_valid_number, get_n_things, remove_whitespace_from_html } from '../utils.mjs'

const is_displayable_score = s => {
    return is_valid_number(s) || typeof s === 'string'
}


export const get_single_score = (own_score, opponent_score) => {
    const own_main_score = is_displayable_score(own_score?.mainScore)
        ? own_score.mainScore
        : ''
    const own_subscore = is_displayable_score(own_score?.subscore)
        ? `<span class="subscore">${own_score.subscore}</span>`
        : ''

    const opponent_main_score = is_displayable_score(opponent_score?.mainScore)
        ? opponent_score.mainScore
        : ''
    const opponent_subscore = is_displayable_score(opponent_score?.subscore)
        ? `<span class="subscore">${opponent_score.subscore}</span>`
        : ''

    return remove_whitespace_from_html(
        `<div class="single-score-wrapper ${own_score?.isWinner ? 'winner' : ''}">
            <div class="side-own-single-score">
                <span class="main-score">${own_main_score}</span>
                ${own_subscore}
            </div>
            <span class="opponent-single-score">
                <span class="main-score">${opponent_main_score}</span>
                ${opponent_subscore}
            </span>
        </div>`
    )
}


export const get_scores_for_side = (side, other_side) => {
    const own_score = (is_object(side) && Array.isArray(side.scores)) ? side.scores : []
    const opponent_score = (is_object(other_side) && Array.isArray(other_side.scores)) ? other_side.scores : []
    const max_score_length = Math.max(own_score.length, opponent_score.length)

    // render as much <single-score-wrapper>s as the longest scores of both sides
    const strings = get_n_things(
        max_score_length,
        (i) => get_single_score(own_score[i], opponent_score[i])
    )
    return strings.join('')
}