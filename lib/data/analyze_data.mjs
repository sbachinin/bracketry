import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'
import { validate_matches } from './validate_matches.mjs'


export const ananlyze_data = (all_data) => {


// rounds
    if (!Array.isArray(all_data.rounds)) {
        halt('Expected an array of rounds, instead got: ', all_data.rounds)
    }

    if (all_data.rounds.length === 0) {
        halt('At least 1 round must be provided')
    }

    all_data.rounds.forEach(round => {
        if (!is_object(round)) {
            halt('Round must be an object, instead got: ', round)
        }

        if (typeof round.id !== 'string') {
            halt('Round must have an id: ', round)
        }

        if (round.name !== undefined && typeof round.name !== 'string') {
            halt('round.name must be a string: ', round)
        }
    })





// matches
    validate_matches(all_data.matches)




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
}
