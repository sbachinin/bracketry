import { get_match_center_scroll_Y } from '../utils/sizes.mjs'
import { draw_connecting_lines } from './draw_connecting_lines.mjs'

const draw_highlighted_line_for_match = ({
    rounds,
    round_index,
    match,
    state,
    options,
    highlight_ctx
}) => {
    const round = rounds[round_index]
    const round_scroll_X = round.left_X - state.scroll_X

    const connection_point = [ round_scroll_X, match.center_scroll_Y ]
    highlight_ctx.lineTo(...connection_point)
    
    if (round_index > 0) {
        const prev_round = rounds[round_index-1]

        const upper_parent_index = prev_round.matches.findIndex(m => m.sides.find(s => s.id === match.sides[0].id))
        const upper_parent = {
            ...prev_round.matches[upper_parent_index],
            center_scroll_Y: get_match_center_scroll_Y(prev_round, state.scroll_Y, upper_parent_index, options),
            is_highlighted: !!prev_round.matches[upper_parent_index].sides.find(s => s.id === state.highlighted_team_id)
        }
        
        const lower_parent = {
            ...prev_round.matches[upper_parent_index + 1],
            center_scroll_Y: get_match_center_scroll_Y(prev_round, state.scroll_Y, upper_parent_index + 1, options),
            is_highlighted: !!prev_round.matches[upper_parent_index + 1].sides.find(s => s.id === state.highlighted_team_id)
        }

        draw_connecting_lines({
            later_connection_point: connection_point,
            upper_parent,
            lower_parent,
            options,
            ctx: highlight_ctx,
        })

        draw_highlighted_line_for_match({
            rounds,
            round_index: round_index-1,
            match: [upper_parent, lower_parent].find(p => p.is_highlighted),
            state,
            options,
            highlight_ctx
        })
    }
}




const find_rightmost_visible_highlighted_match = ({
    rounds, state, options, canvas_width
}) => {
    let match = null
    let round = null
    let round_index = null
    let match_index = null
    let side = null
    rounds.find((_, r_i) => {
        const inverted_round_index = rounds.length - 1 - r_i
        const r = rounds[inverted_round_index]
        if (r.left_X - options.distance_between_rounds - state.scroll_X > canvas_width) return false
        return r.matches.find((m, m_i) => {
            return m.sides.find(s => {
                if (s.id === state.highlighted_team_id) {
                    round = r
                    round_index = inverted_round_index
                    match = m
                    match_index = m_i
                    side = s
                    return true
                }
            })
        })
    })
    return { round, round_index, match, match_index, side }
}




export const draw_highlighted_line = ({
    all_data,
    state,
    options,
    highlight_ctx,
}) => {
    highlight_ctx.beginPath()
    highlight_ctx.strokeStyle = options.highlighted_connection_lines_color
    highlight_ctx.fillStyle = options.highlighted_connection_lines_color
    highlight_ctx.lineWidth = options.highlighted_connection_lines_width
    highlight_ctx.lineJoin = 'round'

    if (options.highlighted_connection_lines_are_dashed) {
        highlight_ctx.setLineDash([
            options.highlighted_connection_lines_width * 2,
            options.highlighted_connection_lines_width * 2.5
        ])
    }

    const last_highlighted = find_rightmost_visible_highlighted_match({
        rounds: all_data.rounds,
        state,
        options,
        canvas_width: highlight_ctx.canvas.height
    })

    Object.assign(last_highlighted.match,
        {center_scroll_Y: get_match_center_scroll_Y(
            last_highlighted.round, state.scroll_Y, last_highlighted.match_index, options
        )}
    )
    
    highlight_ctx.moveTo(
        last_highlighted.round.left_X - state.scroll_X + all_data.round_width
            - (options.connection_lines_type === 'curve' ? 20 : options.connection_lines_width),
        last_highlighted.match.center_scroll_Y
    )

// maybe draw an 'end of team history' rect, if loss
    if (last_highlighted.side.isWinner === false) {
        const dot_size = Math.max(8, options.highlighted_connection_lines_width * 2)
        highlight_ctx.fillRect(
            last_highlighted.round.left_X
                - state.scroll_X
                + all_data.round_width
                - (options.connection_lines_type === 'curve' ? 20 : 0)
                - dot_size/2,
            last_highlighted.match.center_scroll_Y - dot_size/2,
            dot_size,
            dot_size,
        )
    }

    draw_highlighted_line_for_match({
        rounds: all_data.rounds,
        round_index: last_highlighted.round_index,
        match: last_highlighted.match,
        state,
        options,
        highlight_ctx
    })

    highlight_ctx.stroke();
}