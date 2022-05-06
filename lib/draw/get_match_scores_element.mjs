import { gap_btw_sides } from './utils.mjs'

const get_single_side_score_el = (side, score_index) => {
    if (!side || !side.score || side.score[score_index] === undefined) return '<div>&#8203;</div>'

    // here: side exists and it has a score at this index

    const { main_score, tie_break } = side.score[score_index]

    const main_score_el = `<span class="main-score">${main_score ?? ''}</span>`
    const tie_break_el = tie_break === undefined
        ? ''
        : `<span class="tie-break">${tie_break}</span>`

    return `<div class="single-score">${main_score_el}${tie_break_el}</div>`
}

export const get_match_scores_element = (match) => {
    let pairs = []

    if (Array.isArray(match.sides) && match.sides.length) {
        let score_index = 0
        while (match.sides.find(side => side.score?.[score_index] !== undefined)) {
            // here: at least one side has a defined score at this index (this "set")
    
            const upper_score_el = get_single_side_score_el(match.sides[0], score_index)
            const lower_score_el = get_single_side_score_el(match.sides[1], score_index)
    
            const pair = `<div class="match-info-pair">
                ${upper_score_el}
                ${gap_btw_sides}
                ${lower_score_el}
            </div>`
            pairs.push(pair)
            score_index++
        }
    }

    return `<div class="match-scores">${pairs.join('')}</div>`
}