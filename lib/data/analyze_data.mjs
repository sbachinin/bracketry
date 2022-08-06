import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'
import { validate_matches } from './validate_matches.mjs'


export const ananlyze_data = (all_data) => {
    const errors = []

// rounds
    if (!Array.isArray(all_data.rounds)) {
        errors.push({
            is_critical: true,
            message: 'Expected an array of rounds, instead got',
            data: all_data.rounds
        })
    }

    all_data.rounds.forEach(round => {
        if (!is_object(round)) {
            errors.push({
                is_critical: true,
                message: 'Round must be an object, instead got',
                data: round
            })
        }


        if (round.id === undefined) {
            errors.push({
                is_critical: true,
                message: 'Round must have an id',
                data: round
            })
        } else if (typeof round.id !== 'string') {
            errors.push({
                is_critical: true,
                message: 'Round id must be a string',
                data: round
            })
        }

        if (round.name === undefined) {
            errors.push({
                is_critical: false,
                message: 'Please provide a name for a round',
                data: round
            })
        } else if (typeof round.name !== 'string') {
            errors.push({
                is_critical: false,
                message: 'round.name must be a string',
                data: round
            })
        }
    })





// matches
    validate_matches(all_data.matches, all_data.contestants)




// contestants
    if (!is_object(all_data.contestants)) {
        halt('data.contestants must be an object which maps ids to contestants, instead got: ', all_data.contestants)
    }

    Object.values(all_data.contestants).forEach((contestant) => {

        if (typeof contestant.entry_status !== 'undefined' && typeof contestant.entry_status !== 'string') {
            halt('If entry_status is provided for a contestant, it must be a string: ', contestant)
        }

        if (!Array.isArray(contestant.players)) {
            halt('Array of players must be provided for a contestant: ', contestant)
            return
        }

        contestant.players.forEach(player => {
            if (!is_object(player)) {
                halt('Player should be an object: ', player)
            }

            if (typeof player.title !== 'string') {
                halt('Player must have a title, and it must be a string: ', player)
            }

            if (typeof player.nationality_code !== 'undefined' && typeof player.nationality_code !== 'string') {
                // may also check for the length of this code...
                halt('If nationality_code is provided for a player, it must be a string: ', player)
            }

            if (typeof player.flag_url !== 'undefined' && typeof player.flag_url !== 'string') {
                halt('If flag_url is provided for a player, it must be a string: ', player)
            }
        })

    })

    return errors
}
