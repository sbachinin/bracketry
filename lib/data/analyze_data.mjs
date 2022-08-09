import { is_object } from '../utils/utils.mjs'
import { validate_matches } from './validate_matches.mjs'


export const ananlyze_data = (all_data) => {
    const all_errors = []

// rounds
    if (!Array.isArray(all_data.rounds)) {
        all_errors.push({
            is_critical: true,
            message: 'Expected an array of rounds, instead got: ',
            data: all_data.rounds
        })

    }

    all_data.rounds && all_data.rounds.length && all_data.rounds.forEach(round => {
        if (!is_object(round)) {
            all_errors.push({
                is_critical: true,
                message: 'Round must be an object, instead got: ',
                data: round
            })
        }


        if (round.id === undefined) {
            all_errors.push({
                is_critical: true,
                message: 'Round must have an id: ',
                data: round
            })
        } else if (typeof round.id !== 'string') {
            all_errors.push({
                is_critical: true,
                message: 'Round id must be a string: ',
                data: round
            })
        }

        if (round.name === undefined) {
            all_errors.push({
                is_critical: false,
                message: 'Please provide a name for a round: ',
                data: round
            })
        } else if (typeof round.name !== 'string') {
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
    if (!is_object(all_data.contestants)) {
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

        if (typeof contestant.entry_status !== 'undefined' && typeof contestant.entry_status !== 'string') {
            all_errors.push({
                is_critical: false,
                message: 'If entry_status is provided for a contestant, it must be a string: ',
                data: contestant
            })
        }

        if (!Array.isArray(contestant.players)) {
            all_errors.push({
                is_critical: true,
                message: 'Array of players must be provided for a contestant: ',
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
                        is_critical: false,
                        message: 'Player should be an object, instead got: ',
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
    
                if (typeof player.nationality_code !== 'undefined' && typeof player.nationality_code !== 'string') {
                    all_errors.push({
                        is_critical: false,
                        message: 'If nationality_code is provided for a player, it must be a string: ',
                        data: player
                    })
                }
    
                if (typeof player.flag_url !== 'undefined' && typeof player.flag_url !== 'string') {
                    all_errors.push({
                        is_critical: false,
                        message: 'If flag_url is provided for a player, it must be a string: ',
                        data: player
                    })
                }
            })
        }
    })

    return all_errors
}
