import { draw_connecting_lines } from './draw_connecting_lines.mjs'

export const draw_lines_for_match = ({
    this_round,
    this_round_scroll_X,
    previous_round,
    match,
    state,
    options,
    ctx
}) => {
    const match_index = this_round.matches.findIndex(m => m.id === match.id)
    
    ctx.beginPath()

// draw 'axis' of the match
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(this_round_scroll_X + this_round.width - (options.connection_lines_type === 'curve' ? 20 : 4), match.center_Y)
    const connection_point = [this_round_scroll_X, match.center_Y]
    ctx.lineTo(...connection_point)

    const upper_parent = previous_round?.matches[match_index*2]
    const lower_parent = previous_round?.matches[match_index*2 + 1]

// draw regular connecting lines
    if (previous_round) {
        draw_connecting_lines({
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
            this_round_scroll_X + this_round.width - (options.connection_lines_type === 'curve' ? 20 : 0) - dot_size/2,
            match.center_Y - dot_size/2,
            dot_size,
            dot_size,
        )
    } */

// maybe draw higlighted 'axis' & connecting lines
    ctx.beginPath()
    ctx.strokeStyle = options.highlighted_connection_lines_color
    ctx.lineWidth = options.highlighted_connection_lines_width
    ctx.moveTo(this_round_scroll_X + this_round.width - (options.connection_lines_type === 'curve' ? 20 : 0), match.center_Y)
    ctx.lineTo(...connection_point)
    if (previous_round) {
        const parent_to_highlight = previous_round.matches
                .find(m => m.sides.find(s => s.id === team_to_highlight?.id))
        parent_to_highlight && draw_connecting_lines({
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