import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'
import { CURVE_LINE_OFFSET } from '../constants.mjs'

export const draw_lines_for_match = ({
    this_round,
    this_round_scroll_X,
    previous_round,
    round_width,
    match,
    state,
    options,
    ctx,
}) => {
    const match_index = this_round.matches.findIndex(m => m.id === match.id)
    
    ctx.beginPath()

// draw 'axis' of the match
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(
        this_round_scroll_X + round_width
            - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : options.connection_lines_width),
        match.center_scroll_Y
    )
    const connection_point = [this_round_scroll_X, match.center_scroll_Y]
    ctx.lineTo(...connection_point)

    let upper_parent = null
    let lower_parent = null
    if (previous_round) {
        upper_parent = {
            ...previous_round?.matches[match_index*2],
            center_scroll_Y: get_match_center_scroll_Y(previous_round, state.scroll_Y, match_index*2, options),
            is_highlighted: false
        }
        lower_parent = {
            ...previous_round?.matches[match_index*2 + 1],
            center_scroll_Y: get_match_center_scroll_Y(previous_round, state.scroll_Y, match_index*2 + 1, options),
            is_highlighted: false
        }

// draw regular connecting lines
        draw_connecting_lines({
            later_connection_point: connection_point,
            upper_parent,
            lower_parent,
            options,
            ctx
        })
    }

    ctx.stroke();
}