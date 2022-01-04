import { is_object } from './utils/utils.mjs'

/*
DESIRABLE SHAPE:
[
    {
        name?: string,
        matches: [
            {
                order: number,
                sides: [
                    {
                        title: string,
                        nationality: string,
                        score: number[],
                        isWinner: boolean
                    }
                ]
            }
        ]
    }
]
*/

const err = (msg, actual_data) => {
    throw `Incorrect data. ${msg} ${JSON.stringify(actual_data)}`
}

export const validate_data = all_rounds_data => {
    
    if (!Array.isArray(all_rounds_data)) {
        err('Expected an array of rounds, instead got: ', all_rounds_data)
    }
    
    all_rounds_data.forEach(round => {
        if (!is_object(round)) {
            err('Round must be an object, instead got: ', round)
        }

        if (!Array.isArray(round.matches)) {
            err('Expected an array of matches, instead got: ', round.matches)
        }
        round.matches?.forEach(match => {
            if (!is_object(match)) {
                err('Expected a match object, instead got: ', match)
            }
            if (typeof match.order !== 'number') {
                err(`Match's order property must be a number, instead got: `, match.order)
            }
    
            if (!Array.isArray(match.sides)) {
                err(`Match's sides property must be an array, instead got: `, match.sides)
            }
            if (match.sides.length < 2) {
                err('Match must have 2 sides: ', match)
            }
            let have_match_winner = false
            match.sides.forEach?.(side => {
                if (!is_object(side)) {
                    err(`Match's side must be an object, instead got: `, side)
                    return
                }
                if (typeof side.title !== 'string') {
                    err('side.title must be a string, instead got: ', side.title)
                }

                // check for nationality if options are set to show nationality

                if (!Array.isArray(side.score)) {
                    err('side.score must be an array, instead got: ', side.score)
                }
                side.score.forEach(single_score => {
                    if (
                        typeof single_score !== 'number'
                        && typeof single_score !== 'string'
                    ) {
                        err('side.score must be a number or a string, instead got: ', single_score)
                    }
                })
                if (side.isWinner) have_match_winner = true
            })
            if (!have_match_winner) {
                err('Winning side must have a { isWinner: true } property: ', match)
            }
            
        })
    })
}
