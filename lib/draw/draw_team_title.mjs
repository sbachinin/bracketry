import {
    TEAM_TITLE_LEFT_MARGIN,
} from '../constants.mjs'

export const adjust_font = (options, is_winner) => {
    return `${
        (options.winner_is_highlighted && is_winner) ? 'bold': ''
    } ${
        options.match_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const draw_team_title = ({
    side,
    y,
    is_highlighted,
    is_winner,
    options,
    ctx
}) => {
    ctx.translate(TEAM_TITLE_LEFT_MARGIN, 0)
    ctx.textAlign = 'left'

    ctx.fillStyle = is_highlighted
        ? options.highlighted_team_text_color
        : options.team_title_text_color
    ctx.font = adjust_font(options, is_winner)
    ctx.fillText(
        side.title,
        0,
        Math.floor(y))
}