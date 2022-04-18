import { add_match_props } from './add_match_props.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_permanent_drawing_props = (all_data, options) => {
    return {
        ...all_data,
        rounds: all_data.rounds.map(
            (round, round_index) => {
                return {
                    ...round,
                    title: round.name || get_default_round_title(all_data.rounds.length, round_index),
                    matches: round.matches.map(m => add_match_props(all_data, m, options))
                }
            }
        )
    }
}
