import { draw_team_title } from './draw_team_title.mjs'

export const draw_tooltip = ({
    match,
    round,
    center_scroll_Y,
    round_scroll_X,
    scores_width,
    state,
    options,
    ctx
}) => {
    if (state.tooltip && match.id === state.tooltip?.match_id) {
        const font_size = options.team_title_font_size
        const longer_title = match.sides[state.tooltip.side_index].short_title
        const title_width = ctx.measureText(longer_title).width

        const tooltip_center_Y = state.tooltip.side_index === 0
            ? center_scroll_Y - options.vert_gap_between_opponents / 2 - font_size * 1
            : center_scroll_Y + options.vert_gap_between_opponents / 2 + font_size * 1
        const tooltip_X = round_scroll_X + round.width - options.match_padding_right
            - scores_width - title_width - 30
        
        ctx.textBaseline = 'middle'
        ctx.fillStyle = options.background_color
        ctx.fillRect(
            tooltip_X,
            tooltip_center_Y - font_size * 0.75,
            title_width + 20,
            font_size * 1.5
        )
        ctx.strokeStyle = options.connection_lines_color
        ctx.strokeRect(
            tooltip_X,
            tooltip_center_Y - font_size * 0.75,
            title_width + 20,
            font_size * 1.5
        )
        
        draw_team_title({
            title: longer_title,
            x: tooltip_X + 10,
            y: tooltip_center_Y + 2,
            is_highlighted: false,
            is_winner: match.sides[state.tooltip.side_index].isWinner,
            options,
            ctx
        })
    }
}