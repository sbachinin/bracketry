import { get_pair } from './get_pair.mjs'

const get_single_side_score_el = (maybe_side, score_index) => {
    if (!maybe_side || !maybe_side.score || maybe_side.score[score_index] === undefined) return '<div>&#8203;</div>'

    // here: side exists and it has a score at this index

    return `<div class="single-score">
        <span class="main-score">${maybe_side.score[score_index].main_score ?? ''}</span>
        <span class="tie-break">${maybe_side.score[score_index].tie_break ?? ''}</span>
    </div>`
}

export const get_match_scores_element = (match) => {
    let pairs = []

    if (Array.isArray(match.sides) && match.sides.length) {
        let score_index = 0
        while (match.sides.find(side => side.score?.[score_index] !== undefined)) {
            // here: at least one side has a defined score at this index (this "set")
            const pair = get_pair(
                'single-score-pair',
                match,
                get_single_side_score_el(match.sides[0], score_index),
                get_single_side_score_el(match.sides[1], score_index)
            )
            pairs.push(pair)
            score_index++
        }
    }

    return `<div class="match-scores">${pairs.join('')}</div>`
}