import { add_match_props } from './add_match_props.mjs'
import {
    get_round_left_X,
    get_all_content_width
} from '../utils/sizes.mjs'
import { get_permanent_widths } from './get_permanent_widths.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_permanent_drawing_props = (rounds, options) => {
    const widths = get_permanent_widths(rounds, options)

    return {
        ...widths,
        all_content_width: get_all_content_width(options, rounds.length, widths.round_width),
        rounds: rounds.map(
            (round, round_index) => {
                return {
                    ...round,
                    title: round.name || get_default_round_title(rounds.length, round_index),
                    // left_X relative to content, not scroll:
                    left_X: get_round_left_X(options, round_index, widths.round_width),
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
