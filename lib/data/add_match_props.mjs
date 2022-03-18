import { create_unique_id, get_main_canvas } from '../utils/utils.mjs'

const get_title_font = (side, options) => {
    return `${
        (options.winner_is_highlighted && side.isWinner) ? 'bold': ''
    } ${
        options.match_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const add_match_props = (match, options) => {
    const ctx = get_main_canvas().getContext('2d')

    return {
        ...match,
        id: match.id || create_unique_id(),
        sides: match.sides.map(side => {
            ctx.font = get_title_font(side, options)
            return {
                ...side,
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