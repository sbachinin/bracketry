import { add_match_props } from './add_match_props.mjs'
import { get_permanent_widths } from './get_permanent_widths.mjs'
import { get_min_height_per_match } from '../utils/sizes.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_permanent_drawing_props = (all_data, options) => {
    const widths = get_permanent_widths(all_data, options)

    const full_matches_content_height = get_min_height_per_match(options) * all_data.rounds[0].matches.length
        + options.main_vertical_padding * 2

    return {
        ...all_data,
        ...widths,
        full_matches_content_height,
        rounds: all_data.rounds.map(
            (round, round_index) => {
                return {
                    ...round,
                    title: round.name || get_default_round_title(all_data.rounds.length, round_index),
                    static_left_X: round_index * widths.width_per_round,
                    matches: round.matches
                        .sort((a, b) => {
                            if (typeof a.order === 'number' && typeof b.order === 'number') {
                                return a.order - b.order
                            }
                            return 0
                        })
                        .map(m => add_match_props(m, options))
                }
            }
        )
    }
}
