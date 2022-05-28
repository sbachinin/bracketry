import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'


export const ananlyze_data = (all_data) => {
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

        if (round.matches !== undefined && !Array.isArray(round.matches)) {
            halt('If you provide matches for a round, matches must be an array: ', round.matches)
        }

        round.matches?.forEach(match => {
            if (!is_object(match)) {
                halt('Expected a match object: ', match)
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
            
            if (match.order !== undefined && typeof match.order !== 'number') {
                halt(`If you provide match.order property, it must be a number: `, match)
            }

            if (match.sides !== undefined && !Array.isArray(match.sides)) {
                halt(`If match.sides is provided, it must be an array: `, match)
            }
            match.sides && match.sides.forEach?.(side => {
                !is_object(side)
                    && halt(`Match's side must be an object: `, match)

                typeof side.contestant_id !== 'string'
                    && halt(`Side.contestant_id must be provided: `, side)

                side.is_winner !== undefined
                    && typeof side.is_winner !== 'boolean'
                    && halt('If you provide side.is_winner, it must be a boolean: ', side)

                side.score !== undefined
                    && !Array.isArray(side.score)
                    && halt('Side.score must be an array: ', side)

                side.score !== undefined
                    && side.score.forEach(single_set_score => {
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
    })

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
