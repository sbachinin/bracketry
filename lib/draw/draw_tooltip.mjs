import { adjust_font, draw_team_title } from './draw_team_title.mjs'

export const draw_tooltip = ({
    match,
    round,
    center_scroll_Y,
    round_scroll_X,
    scores_width,
    state,
    options,
    expand_canvas_ctx
}) => {
    if (!options.show_full_title_tooltip) return
    if (!state.tooltip) return
    if (match.id !== state.tooltip?.match_id) return
    
    const is_winner = match.sides[state.tooltip.side_index].isWinner
    expand_canvas_ctx.font = adjust_font(options, is_winner)

    const font_size = options.team_title_font_size
    const longer_title = match.sides[state.tooltip.side_index].short_title
    const title_width = expand_canvas_ctx.measureText(longer_title).width

    const tooltip_center_Y = state.tooltip.side_index === 0
        ? center_scroll_Y - options.vert_gap_between_opponents / 2 - font_size * 1
        : center_scroll_Y + options.vert_gap_between_opponents / 2 + font_size * 1
    const tooltip_X = round_scroll_X + round.width - options.match_padding_right
        - scores_width - title_width - 30
    
    expand_canvas_ctx.translate(tooltip_X, 0)

    expand_canvas_ctx.textBaseline = 'middle'
    expand_canvas_ctx.fillStyle = options.background_color
    expand_canvas_ctx.fillRect(
        0,
        tooltip_center_Y - font_size * 0.75,
        title_width + 20,
        font_size * 1.5
    )
    expand_canvas_ctx.strokeStyle = options.connection_lines_color
    expand_canvas_ctx.strokeRect(
        0,
        tooltip_center_Y - font_size * 0.75,
        title_width + 20,
        font_size * 1.5
    )
    
    expand_canvas_ctx.translate(10, 0)
    draw_team_title({
        title: longer_title,
        y: tooltip_center_Y + 2,
        is_highlighted: false,
        is_winner,
        options,
        ctx: expand_canvas_ctx
    })

    expand_canvas_ctx.setTransform(1, 0, 0, 1, 0, 0)
}