import { add_match_props } from './add_match_props.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

/* 
1) add a fallback round title if necessary
2) enhance each of round.matches:
    1) create matches ids if absent
    2) enhance each of match.sides:
        1) ensure that .sides are arrays, even if no players
        2) ensure that side.score is an array, even if no actual score
        3) add "players" property containing corresponding data from .contestants
 */
export const get_permanent_drawing_props = (all_data) => {
    return {
        ...all_data,
        have_entry_status: !!all_data.rounds.find(
            r => r.matches.find(
                m => m.sides.find(
                    s => typeof all_data.contestants[s.contestant_id]?.entry_status === 'string'))),
        rounds: all_data.rounds.map(
            (round, round_index) => {
                return {
                    ...round,
                    title: round.name || get_default_round_title(all_data.rounds.length, round_index),
                    matches: round.matches
                        ? round.matches.map(m => add_match_props(all_data, m))
                        : []
                }
            }
        ),
    }
}
