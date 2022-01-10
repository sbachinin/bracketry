import { get_fitting_string } from '../utils/utils.mjs'

const get_title_to_display = (side, options, ctx) => {
    ctx.font = `${
        (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
    return get_fitting_string(
        ctx,
        side.short_title,
        options.team_title_max_width
    )
}

export const add_permanent_drawing_data = (rounds, options, canvas_el) => {
    const ctx = canvas_el.getContext('2d')

    return rounds.map(round => {
        return {
            ...round,
            matches: round.matches.map(match => {
                return {
                    ...match,
                    sides: match.sides.map(side => {
                        return {
                            ...side,
                            title_to_display: get_title_to_display(side, options, ctx)
                        }
                    })
                }
            })
        }
    })
}
