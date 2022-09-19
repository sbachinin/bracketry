import { is_object, is_valid_number } from '../utils.mjs'
import { validate_single_score } from './validate_single_score.mjs'

export const validate_matches = (matches, contestants) => {
    const errors = []

    if (matches !== undefined && !Array.isArray(matches)) {
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

        if (!is_valid_number(match.roundIndex)) {
            errors.push({
                is_critical: false,
                message: `Match must contain .roundIndex property and it must be a number`,
                data: match
            })
        }
        if (!is_valid_number(match.order)) {
            errors.push({
                is_critical: false,
                message: `Match.order property is required, and it must be a number`,
                data: match
            })
        }

        if (match.matchStatus !== undefined && typeof match.matchStatus !== 'string') {
            errors.push({
                is_critical: false,
                message: `Match.matchStatus must be a string`,
                data: match
            })
        }

        if (match.isLive !== undefined && typeof match.isLive !== 'boolean') {
            errors.push({
                is_critical: false,
                message: `Match.isLive must be a boolean`,
                data: match
            })
        }



        if (match.sides !== undefined && !Array.isArray(match.sides)) {
            errors.push({
                is_critical: true,
                message: 'Match.sides is required and must be an array',
                data: match
            })
        }

        if (Array.isArray(match.sides)) {
            match.sides.forEach(side => {

                if (!is_object(side)) {
                    errors.push({
                        is_critical: true,
                        message: `Match's side must be an object`,
                        data: match
                    })
                    return
                }

                if (side.contestantId !== undefined && typeof side.contestantId !== 'string') {
                    errors.push({
                        is_critical: true,
                        message: `If you provide side.contestantId, it must be a string`,
                        data: side
                    })
                }

                if (
                    typeof side.contestantId === 'string'
                    && !Object.keys(contestants || {}).includes(side.contestantId)
                ) {
                    errors.push({
                        is_critical: false,
                        message: 'No contestant data found for this side.contestantId',
                        data: side
                    })
                }

                if (side.isWinner !== undefined && typeof side.isWinner !== 'boolean') {
                    errors.push({
                        is_critical: false,
                        message: 'If you provide side.isWinner, it must be a boolean',
                        data: side
                    })
                }

                if (side.score !== undefined && !Array.isArray(side.score)) {
                    errors.push({
                        is_critical: true,
                        message: 'If side.score is provided, it must be an array',
                        data: side
                    })
                }

                if (Array.isArray(side.score) && !side.score.length) {
                    errors.push({
                        is_critical: false,
                        message: `side.score is provided but it's an empty array: `,
                        data: side
                    })
                }

                if (Array.isArray(side.score)) {
                    side.score.forEach(score => {
                        errors.push(...validate_single_score(score, side))
                    })
                }


                if (side.current_score !== undefined) {
                    errors.push(...validate_single_score(side.current_score, side))
                }

                if (side.isServing !== undefined && typeof side.isServing !== 'boolean') {
                    errors.push({
                        is_critical: false,
                        message: 'If side.isServing is provided, it must be a boolean',
                        data: side
                    })
                }

            })
        }

    })

    return errors
}