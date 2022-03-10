import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'

/*
    SHAPE:

[
    {
        name?: string,
        matches: [
            {
                id?: string,
                order?: number, // may start from any other number (0 or whatever). If 'order' not provided, then order of elements in original array is used
                sides: [
                    {
                        id: string, (required if team history is highlightable)
                        short_title: string,
                        nationality_code?: string,
                        entry_status?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | number
                        score: [
                            {
                                main_score: number | string,
                                tie_break?: number
                            }
                        ]
                        isWinner: boolean
                    }
                ]
            }
        ]
    }
]
*/

export const validate_data = (all_rounds_data, options) => {
    
    if (!Array.isArray(all_rounds_data)) {
        halt('Expected an array of rounds, instead got: ', all_rounds_data)
    }

    if (all_rounds_data.length === 0) {
        halt('At least 1 round must be provided')
    }
    
    all_rounds_data.forEach(round => {
        if (!is_object(round)) {
            halt('Round must be an object, instead got: ', round)
        }

        if (!Array.isArray(round.matches)) {
            halt('Expected an array of matches, instead got: ', round.matches)
        }

        if (round.matches.length === 0) {
            halt('Must be at least 1 match in round: ', round)
        }

        round.matches?.forEach(match => {
            if (!is_object(match)) {
                halt('Expected a match object: ', match)
            }
            if (typeof match.id !== 'undefined' && typeof match.id !== 'string') {
                halt(`Match id must be a string: `, match)
            }
            if (typeof match.order !== 'undefined' && typeof match.order !== 'number') {
                halt(`If you provide match.order property, it must be a number: `, match)
            }
    
            if (!Array.isArray(match.sides)) {
                halt(`Match.sides must be an array: `, match)
            }
            if (match.sides.length < 2) {
                halt('Match must have 2 sides: ', match)
            }
            let have_match_winner = false
            match.sides.forEach?.(side => {
                if (!is_object(side)) {
                    halt(`Match's side must be an object: `, match)
                }

                if (options.highlight_team_history_on_click
                    && typeof side.id !== 'string') {
                    halt(`Side must have an id property if options.highlight_team_history_on_click is true: `, side)
                }

                if (typeof side.entry_status !== 'undefined' && typeof side.entry_status !== 'string') {
                    halt('If side.entry_status is provided, it must be a string: ', side)
                }
                if (typeof side.short_title !== 'string') {
                    halt('Side.short_title must be a string: ', side)
                }

                // if (options.draw_nationalities !== 'Never' && typeof side.nationality_code !== 'string') {
                //     shout(`You set 'draw_nationalities' option to true but didn't provide nationality: `, side)
                // }

                if (typeof side.nationality_code !== 'undefined' && typeof side.nationality_code !== 'string') {
                    halt('If side.nationality_code is provided, it must be a string: ', side)
                }
                
                if (!Array.isArray(side.score)) {
                    halt('Side.score must be an array: ', side)
                }
                side.score.forEach(single_set_score => {
                    if (!is_object(single_set_score)) {
                        halt(`Score must be an object: `, side)
                    }
                    if (
                        typeof single_set_score.main_score !== 'number'
                        && typeof single_set_score.main_score !== 'string'
                    ) {
                        halt('Side.score.main_score must be a number or a string: ', side)
                    }
                    if (
                        typeof single_set_score.tie_break !== 'number'
                        && typeof single_set_score.tie_break !== 'undefined'
                    ) {
                        halt('Side.score.tie_break must be a number or undefined: ', side)
                    }
                })
                if (side.isWinner) have_match_winner = true
            })
            if (!have_match_winner) {
                halt('Winning side must have { isWinner: true } property: ', match)
            }
            
        })
    })
}
