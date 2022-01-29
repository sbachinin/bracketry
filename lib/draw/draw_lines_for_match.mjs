import { draw_connecting_lines } from './draw_connecting_lines.mjs'

export const draw_lines_for_match = (
    rounds,
    round_index,
    match_index,
    round_scroll_X,
    center_Y,
    state,
    options,
    ctx
) => {
    const round = rounds[round_index]
    const match = round.matches[match_index]
    
    ctx.beginPath()

// draw 'axis' of the match
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(round_scroll_X + round.width - (options.connection_lines_type === 'curve' ? 20 : 4), center_Y)
    const connection_point = [round_scroll_X, center_Y]
    ctx.lineTo(...connection_point)

    const upper_parent = rounds[round_index - 1]?.matches[match_index*2]
    const lower_parent = rounds[round_index - 1]?.matches[match_index*2 + 1]

// draw regular connecting lines
    if (round_index > 0) {
        draw_connecting_lines({
            type: options.connection_lines_type,
            later_connection_point: connection_point,
            upper_parent,
            lower_parent,
            parent_to_highlight: null,
            options,
            ctx
        })
    }

    ctx.stroke();

// decide if highlighted
    if (!options.highlight_team_history_on_click || typeof state.highlighted_team_id !== 'string') return
    const team_to_highlight = match.sides.find(s => s.id === state.highlighted_team_id)
    const match_was_highlighted = !!match.sides.find(s => s.id === state.previous_highlighted_team_id)
    if (!team_to_highlight) return

    ctx.globalAlpha = match_was_highlighted ? 1 : state.highlight_opacity

// maybe draw an 'end of team history' rect, if loss
    /* if (team_to_highlight.isWinner === false) {
        ctx.fillStyle = options.highlighted_connection_lines_color
        const dot_size = Math.max(8, options.highlighted_connection_lines_width)
        ctx.fillRect(
            round_scroll_X + round.width - (options.connection_lines_type === 'curve' ? 20 : 0) - dot_size/2,
            center_Y - dot_size/2,
            dot_size,
            dot_size,
        )
    } */

// maybe draw higlighted 'axis' & connecting lines
    ctx.beginPath()
    ctx.strokeStyle = options.highlighted_connection_lines_color
    ctx.lineWidth = options.highlighted_connection_lines_width
    ctx.moveTo(round_scroll_X + round.width - (options.connection_lines_type === 'curve' ? 20 : 0), center_Y)
    ctx.lineTo(...connection_point)
    if (round_index > 0) {
        const parent_to_highlight = rounds[round_index - 1].matches
                .find(m => m.sides.find(s => s.id === team_to_highlight?.id))
        parent_to_highlight && draw_connecting_lines({
            type: options.connection_lines_type,
            later_connection_point: connection_point,
            upper_parent,
            lower_parent,
            parent_to_highlight,
            options,
            ctx,
        })
    }
    ctx.stroke();
    ctx.globalAlpha = 1
    
}