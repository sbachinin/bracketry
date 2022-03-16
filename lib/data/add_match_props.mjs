import { get_fitting_string, create_unique_id } from '../utils/utils.mjs'

const get_title_font = (side, options) => {
    return `${
        (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
    } ${
        options.match_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const add_match_props = (match, options, ctx) => {
    return {
        ...match,
        id: match.id || create_unique_id(),
        sides: match.sides.map(side => {
            ctx.font = get_title_font(side, options)
            return {
                ...side,
                title_to_display: get_fitting_string(
                    ctx,
                    side.title,
                    options.team_title_max_width
                ),
                title_width: ctx.measureText(side.title).width,
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