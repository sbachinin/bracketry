import { get_fitting_string } from './utils.mjs'

export const get_enhanced_data = (canvas_el, rounds, options) => {
    const ctx = canvas_el.getContext('2d')

    return rounds.map(round => {
        return {
            ...round,
            matches: round.matches.map(match => {
                return {
                    ...match,
                    sides: match.sides.map(side => {
                        ctx.font = `${
                            (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
                        } ${
                            options.team_title_font_size
                        }px ${
                            options.team_title_font_family
                        }`
                        return {
                            ...side,
                            title_to_display: get_fitting_string(
                                ctx,
                                side.short_title,
                                options.team_title_max_width
                            )
                        }
                    })
                }
            })
        }
    })
}
