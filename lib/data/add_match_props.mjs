import { get_fitting_string, create_unique_id } from '../utils/utils.mjs'

const set_title_font = (side, options, ctx) => {
    ctx.font = `${
        (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const add_match_props = (match, options, ctx) => {
    return {
        ...match,
        id: match.id || create_unique_id(),
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
                score: side.score.map(s => {
                    return {
                        ...s,
                        main_score_width: ctx.measureText(s.main_score).width
                    }
                })
            }
        })
    }
}