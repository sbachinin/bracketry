import {
    measure_round_heights,
    measure_widths,
    get_round_left_X,
    get_all_content_width
} from './sizes.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const extract_basic_drawing_attrs = (rounds, options, canvas_el) => {
    const {
        round_width,
        first_round_width,
        team_title_width
    } = measure_widths(rounds, options, canvas_el.getContext('2d'))

    return {
        all_content_width: get_all_content_width(options, rounds.length, round_width, first_round_width),
        round_width,
        first_round_width,
        team_title_width,
        rounds: rounds.map(
            (round, round_index) => {
                return {
                    title: round.name || get_default_round_title(rounds.length, round_index),
                    ...measure_round_heights(
                        round.matches.length,
                        options,
                        canvas_el.height
                    ),
                    left_X: get_round_left_X(options, round_index, round_width, first_round_width)
                }
            }
        )
    }
}