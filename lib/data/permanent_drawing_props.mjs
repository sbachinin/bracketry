import { get_fitting_string } from '../utils/utils.mjs'
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

const set_title_font = (side, options, ctx) => {
    ctx.font = `${
        (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const set_permanent_drawing_props = (rounds, options, canvas_el) => {
    const ctx = canvas_el.getContext('2d')

    const {
        round_width,
        first_round_width,
        team_title_width,
        scores_width
    } = measure_widths(rounds, options, canvas_el.getContext('2d'))

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
                    matches: round.matches.map(match => {
                        return {
                            ...match,
                            sides: match.sides.map(side => {
                                set_title_font(side, options, ctx)
                                return {
                                    ...side,
                                    title_to_display: get_fitting_string(
                                        ctx,
                                        side.short_title,
                                        options.team_title_max_width
                                    ),
                                    short_title_width: ctx.measureText(side.short_title).width,
                                    seed_text: ( // string | undefined
                                        typeof side.seed === 'number'
                                        ? String(side.seed)
                                        : side.entry_status
                                    ),
                                    score: side.score.map(s => {
                                        return {
                                            ...s,
                                            main_score_width: ctx.measureText(s.main_score).width
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        )
    }
}
