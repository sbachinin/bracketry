import { is_object } from '../utils.mjs'

export const validate_matches = (matches, contestants) => {
    const errors = []

    if (matches === undefined) {
        errors.push({
            is_critical: true,
            message: 'data.matches must be provided and it must be an array',
        })
    } else if (!Array.isArray(matches)) {
        errors.push({
            is_critical: true,
            message: 'data.matches must be an array, instead got',
            data: matches
        })
    }

    matches && matches.length && matches.forEach((match) => {
        if (!is_object(match)) {
            errors.push({
                is_critical: true,
                message: 'Expected a match object, instead got',
                data: match
            })
        }

        if (match.match_id === undefined) {
            errors.push({
                is_critical: false,
                message: 'Match must contain .match_id property',
                data: match
            })
        }
        if (typeof match.round_index !== 'number') {
            errors.push({
                is_critical: false,
                message: `Match must contain .round_index property and it must be a number`,
                data: match
            })
        }
        if (match.order === undefined) {
            errors.push({
                is_critical: false,
                message: 'Match must contain .order property',
                data: match
            })
        }
        if (typeof match.order !== 'number') {
            errors.push({
                is_critical: false,
                message: `Match.order property is required, and it must be a number`,
                data: match
            })
        }





        if (!Array.isArray(match.sides)) {
            errors.push({
                is_critical: true,
                message: 'Match.sides is required and must be an array',
                data: match
            })
        } else {
            match.sides.forEach(side => {

                if (!is_object(side)) {
                    errors.push({
                        is_critical: true,
                        message: `Match's side must be an object`,
                        data: match
                    })
                }
                
                if (typeof side.contestant_id !== 'string') {
                    errors.push({
                        is_critical: false,
                        message: `Side.contestant_id is required and must be a string`,
                        data: side
                    })
                }
                
                if (!Object.keys(contestants).includes(side.contestant_id)) {
                    errors.push({
                        is_critical: false,
                        message: 'No contestant data found for this side.contestant_id',
                        data: side
                    })
                }
    
                if (side.is_winner !== undefined && typeof side.is_winner !== 'boolean') {
                    errors.push({
                        is_critical: false,
                        message: 'If you provide side.is_winner, it must be a boolean',
                        data: side
                    })
                }
    
                if (side.score !== undefined && !Array.isArray(side.score)) {
                    errors.push({
                        is_critical: false,
                        message: 'If side.score is provided, it must be an array',
                        data: side
                    })
                }
                
                if (Array.isArray(side.score)) {
                    side.score.forEach(single_set_score => {
                        if (!is_object(single_set_score)) {
                            errors.push({
                                is_critical: false,
                                message: 'Score must be an object',
                                data: side
                            })
                        }
                        if (single_set_score.main_score === undefined) {
                            errors.push({
                                is_critical: false,
                                message: 'If you provide a side.score, it must contain a "main_score" property',
                                data: side
                            })
                        }
                        if (
                            typeof single_set_score.main_score !== 'number'
                            && typeof single_set_score.main_score !== 'string'
                        ) {
                            errors.push({
                                is_critical: false,
                                message: 'Side.score.main_score must be a number or a string',
                                data: side
                            })
                        }
                        if (
                            typeof single_set_score.tie_break !== 'number'
                            && typeof single_set_score.tie_break !== 'undefined'
                        ) {
                            errors.push({
                                is_critical: false,
                                message: 'If you provide side.score.tie_break, it must be a number',
                                data: side
                            })
                        }
                        if (
                            typeof single_set_score.is_winner !== 'boolean'
                            && typeof single_set_score.is_winner !== 'undefined'
                        ) {
                            errors.push({
                                is_critical: false,
                                message: 'If you provide side.score.is_winner, it must be a boolean',
                                data: side
                            })
                        }
                    })
                }
    
                
    
                if (side.subscore !== undefined && typeof side.subscore !== 'number' && typeof side.subscore !== 'string') {
                    errors.push({
                        is_critical: false,
                        message: 'If side.subscore is provided, it must be a number or a string',
                        data: side
                    })
                }
    
                if (side.is_serving !== undefined && typeof side.is_serving !== 'boolean') {
                    errors.push({
                        is_critical: false,
                        message: 'If side.is_serving is provided, it must be a boolean',
                        data: side
                    })
                }
                
            })
        }
        
    })

    return errors
}