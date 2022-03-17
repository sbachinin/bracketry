import { adjust_font, draw_team_title } from './draw_team_title.mjs'
import { MATCH_PADDING_RIGHT } from '../constants.mjs'

export const draw_tooltip = ({
    match,
    all_data,
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

    const title_width = expand_canvas_ctx.measureText(state.tooltip.text).width

    const tooltip_center_Y = state.tooltip.side_index === 0
        ? center_scroll_Y - options.match_font_size * 1.3
        : center_scroll_Y + options.match_font_size * 1.3
    const tooltip_X = round_scroll_X + all_data.round_width - MATCH_PADDING_RIGHT
        - scores_width - title_width - 30
    
    expand_canvas_ctx.translate(tooltip_X, 0)

    expand_canvas_ctx.textBaseline = 'middle'
    expand_canvas_ctx.fillStyle = options.background_color
    expand_canvas_ctx.fillRect(
        0,
        tooltip_center_Y - options.match_font_size * 0.75,
        title_width + 20,
        options.match_font_size * 1.5
    )
    expand_canvas_ctx.strokeStyle = options.connection_lines_color
    expand_canvas_ctx.strokeRect(
        0,
        tooltip_center_Y - options.match_font_size * 0.75,
        title_width + 20,
        options.match_font_size * 1.5
    )
    
    expand_canvas_ctx.translate(10, 0)
    draw_team_title({
        title: state.tooltip.text,
        y: tooltip_center_Y + 2,
        is_highlighted: false,
        is_winner,
        options,
        ctx: expand_canvas_ctx
    })

    expand_canvas_ctx.setTransform(1, 0, 0, 1, 0, 0)
}