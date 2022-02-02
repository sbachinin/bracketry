import { add_match_props } from './add_match_props.mjs'
import {
    measure_widths,
    get_round_left_X,
    get_all_content_width
} from '../utils/sizes.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_permanent_drawing_props = (rounds, options, main_canvas_el) => {
    const ctx = main_canvas_el.getContext('2d')

    const {
        round_width,
        first_round_width,
        team_title_width,
        scores_width
    } = measure_widths(rounds, options, ctx)

    return {
        all_content_width: get_all_content_width(options, rounds.length, round_width, first_round_width),
        team_title_width,
        scores_width,
        rounds: rounds.map(
            (round, round_index) => {
                return {
                    ...round,
                    width: round_index === 0 ? first_round_width : round_width,
                    title: round.name || get_default_round_title(rounds.length, round_index),
                    // left_X relative to content, not scroll:
                    left_X: get_round_left_X(options, round_index, round_width, first_round_width),
                    matches: round.matches
                        .sort((a, b) => {
                            if (typeof a.order === 'number' && typeof b.order === 'number') {
                                return a.order - b.order
                            }
                            return 0
                        })
                        .map(m => add_match_props(m, options, ctx))
                }
            }
        )
    }
}
