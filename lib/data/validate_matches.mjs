import { is_object, is_valid_number } from '../utils.mjs'
import { validate_single_score } from './validate_single_score.mjs'

export const validate_matches = (matches, contestants) => {
    const errors = []

    if (matches !== undefined && !Array.isArray(matches)) {
        errors.push({
            is_critical: true,
            message: `data.matches must be an array:`,
            data: matches
        })
    }

    matches && matches.length && matches.forEach((match) => {
        if (!is_object(match)) {
            errors.push({
                is_critical: true,
                message: `Match must be an object:`,
                data: match
            })
        }

        if (!is_valid_number(match.roundIndex)) {
            errors.push({
                is_critical: false,
                message: `Match must contain a numeric "roundIndex" prop:`,
                data: match
            })
        }
        if (!is_valid_number(match.order)) {
            errors.push({
                is_critical: false,
                message: `Match must contain a numeric "order" prop:`,
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
                message: `Match.sides is required and must be an array`,
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
                        message: 'No contestant data found for this side.contestantId:',
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

                if (side.scores !== undefined && !Array.isArray(side.scores)) {
                    errors.push({
                        is_critical: true,
                        message: 'If side.scores is provided, it must be an array',
                        data: side
                    })
                }

                if (Array.isArray(side.scores) && !side.scores.length) {
                    errors.push({
                        is_critical: false,
                        message: `side.scores is provided but it's an empty array: `,
                        data: side
                    })
                }

                if (Array.isArray(side.scores)) {
                    side.scores.forEach(score => {
                        errors.push(...validate_single_score(score, side))
                    })
                }


                if (
                    side.currentScore !== undefined
                    && !is_valid_number(side.currentScore)
                    && typeof side.currentScore !== 'string'
                ) {
                    errors.push({
                        is_critical: false,
                        message: `If side.currentScore is provided, it must be a number or string: `,
                        data: side
                    })
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