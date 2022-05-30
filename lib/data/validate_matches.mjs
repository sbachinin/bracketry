import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'

export const validate_matches = (matches) => {
    if (!Array.isArray(matches)) {
        halt('Data.matches must be an array, instead got: ', matches)
    }

    matches.forEach((match) => {
        if (!is_object(match)) {
            halt('Expected a match object, instead got: ', match)
        }
        if (match.match_id === undefined) {
            halt(`Match must contain .match_id property: `, match)
        }
        if (match.round_id === undefined) {
            halt(`Match must contain .round_id property: `, match)
        }
        if (match.order === undefined) {
            halt('Match must contain .order property: ', match)
        }
        if (typeof match.order !== 'number') {
            halt(`Match.order property is required, and it must be a number: `, match)
        }

        if (!Array.isArray(match.sides)) {
            halt(`Match.sides is required and must be an array: `, match)
        }
        match.sides.forEach(side => {
            !is_object(side)
                && halt(`Match's side must be an object: `, match)

            typeof side.contestant_id !== 'string'
                && halt(`Side.contestant_id must be provided: `, side)

            side.is_winner !== undefined
                && typeof side.is_winner !== 'boolean'
                && halt('If you provide side.is_winner, it must be a boolean: ', side)

            if (side.score === undefined || !Array.isArray(side.score)) {
                halt('Side.score is required and it must be an array (at least empty): ', side)
            }

            side.score.forEach(single_set_score => {
                if (!is_object(single_set_score)) {
                    halt(`Score must be an object: `, side)
                }
                if (single_set_score.main_score === undefined) {
                    halt('If you provide a side.score, it must contain a "main_score" property', side)
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
                    halt('If you provide side.score.tie_break, it must be a number: ', side)
                }
            })

            side.subscore !== undefined
                && typeof side.subscore !== 'number'
                && typeof side.subscore !== 'string'
                && halt('If side.subscore is provided, it must be a number or a string: ', side)

            side.is_serving !== undefined
                && typeof side.is_serving !== 'boolean'
                && halt('If side.is_serving is provided, it must be a boolean: ', side)
        })
    })


}