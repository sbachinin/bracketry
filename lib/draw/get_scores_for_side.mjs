import { is_object, is_valid_number, get_n_things, remove_whitespace_from_html } from '../utils.mjs'

const is_displayable_main_score = s => {
    return is_valid_number(s) || typeof s === 'string'
}


const get_single_score = (i, own_scores /* array for sure */, opponent_scores /* array for sure */) => {
    const own_main_score = is_displayable_main_score(own_scores[i]?.mainScore)
        ? own_scores[i].mainScore
        : ''
    const own_tiebreak = is_valid_number(own_scores[i]?.tieBreak)
        ? `<span class="tie-break">${own_scores[i].tieBreak}</span>`
        : ''

    const opponent_main_score = is_displayable_main_score(opponent_scores[i]?.mainScore)
        ? opponent_scores[i].mainScore
        : ''
    const opponent_tiebreak = is_valid_number(opponent_scores[i]?.tieBreak)
        ? `<span class="tie-break">${opponent_scores[i].tieBreak}</span>`
        : ''

    return remove_whitespace_from_html(`
        <div class="single-score-wrapper ${own_scores[i]?.isWinner ? 'winner' : ''}">
            <div class="side-own-single-score">
                <span class="main-score">${own_main_score}</span>
                ${own_tiebreak}
            </div>
            <span class="opponent-single-score">
                <span class="main-score">${opponent_main_score}</span>
                ${opponent_tiebreak}
            </span>
        </div>
    `)
}


export const get_scores_for_side = (side, other_side) => {
    const own_score = (is_object(side) && Array.isArray(side.score)) ? side.score : []
    const opponent_score = (is_object(other_side) && Array.isArray(other_side.score)) ? other_side.score : []
    const max_score_length = Math.max(own_score.length, opponent_score.length)

    // render as much <single-score-wrapper>s as the longest score of both sides
    const strings = get_n_things(
        max_score_length,
        (i) => get_single_score(i, own_score, opponent_score)
    )
    return strings.join('')
}