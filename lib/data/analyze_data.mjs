import { is_object } from '../utils.mjs'
import { validate_matches } from './validate_matches.mjs'


export const ananlyze_data = (all_data) => {
    if (!is_object(all_data)) {
        return [{
            is_critical: true,
            message: 'Data must be an object, instead got: ',
            data: all_data
        }]
    }

    if (!Array.isArray(all_data.rounds)) {
        return [{
            is_critical: true,
            message: 'Data must contain "rounds" property and it must be an array: ',
            data: all_data.rounds
        }]
    }

    if (!all_data.rounds.length && !all_data.matches?.length) {
        return [{
            is_critical: true,
            message: 'At least one round or one match must be provided'
        }]
    }







    const all_errors = []

    all_data.rounds.forEach(round => {
        if (!is_object(round)) {
            all_errors.push({
                is_critical: true,
                message: 'data.rounds may contain only objects: ',
                data: round
            })
        }

        if (round.name !== undefined && typeof round.name !== 'string') {
            all_errors.push({
                is_critical: false,
                message: 'round.name must be a string: ',
                data: round
            })
        }
    })





// matches
    const matches_errors = validate_matches(all_data.matches, all_data.contestants)
    all_errors.push(...matches_errors)



// contestants
    if (all_data.contestants !== undefined && !is_object(all_data.contestants)) {
        all_errors.push({
            is_critical: true,
            message: 'data.contestants must be an object which maps ids to contestants, instead got: ',
            data: all_data.contestants
        })
    }

    is_object(all_data.contestants) && Object.values(all_data.contestants).forEach((contestant) => {
        if (!is_object(contestant)) {
            all_errors.push({
                is_critical: true,
                message: 'Contestant must be an object, instead got: ',
                data: contestant
            })
        }

        if (typeof contestant.entryStatus !== 'undefined' && typeof contestant.entryStatus !== 'string') {
            all_errors.push({
                is_critical: false,
                message: 'If entryStatus is provided for a contestant, it must be a string: ',
                data: contestant
            })
        }

        if (contestant.players === undefined) {
            all_errors.push({
                is_critical: false,
                message: 'contestant.players is required: ',
                data: contestant
            })
        } else if (!Array.isArray(contestant.players)) {
            all_errors.push({
                is_critical: true,
                message: 'contestant.players must be an array: ',
                data: contestant
            })
        } else if (contestant.players.length === 0) {
            all_errors.push({
                is_critical: false,
                message: 'contestant.players must contain at least one element: ',
                data: contestant
            })
        } else {
            contestant.players.forEach(player => {
                if (!is_object(player)) {
                    all_errors.push({
                        is_critical: true,
                        message: 'contestant.players array must contain only objects: ',
                        data: player
                    })
                }
    
                if (typeof player.title !== 'string') {
                    all_errors.push({
                        is_critical: false,
                        message: 'Player must have a title, and it must be a string, instead got: ',
                        data: player
                    })
                }
    
                if (typeof player.nationality !== 'undefined' && typeof player.nationality !== 'string') {
                    all_errors.push({
                        is_critical: false,
                        message: 'If nationality is provided for a player, it must be a string: ',
                        data: player
                    })
                }
            })
        }
    })

    return all_errors
}
