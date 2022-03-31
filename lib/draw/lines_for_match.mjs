import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import {
    get_round_scroll_X,
    get_min_height_per_match,
    get_match_center_Y
} from '../utils/sizes.mjs'
import { get_main_canvas } from '../utils/utils.mjs'
import { CURVE_LINE_OFFSET } from '../constants.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'

export const is_match_visible_Y = (center_scroll_Y, options) => {
    if (center_scroll_Y < -get_min_height_per_match(options) / 2) return false
    if ((center_scroll_Y - get_min_height_per_match(options) / 2) > get_main_canvas().height) return false
    return true
}

export const maybe_draw_lines_for_match = ({
    all_data,
    match_id,
    state = { scroll_X: 0, scroll_Y: 0},
    options,
    ctx,
}) => {
    const { round, round_index, match_index } = find_match_data_by_id(all_data, match_id)

    const center_scroll_Y = get_match_center_Y(
        all_data,
        round_index,
        match_index,
        state,
        options
    )

    if (
        !options.use_classical_layout
        && !is_match_visible_Y(center_scroll_Y, options)
    ) return

    const round_scroll_X = get_round_scroll_X(round, state, options)

// draw 'axis' of the match
    ctx.beginPath()
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(
        round_scroll_X + all_data.round_width
        - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : options.connection_lines_width),
        center_scroll_Y
    )
    const connection_point = [round_scroll_X, center_scroll_Y]
    ctx.lineTo(...connection_point)

    const previous_round = all_data.rounds[round_index - 1]
    if (!previous_round) {
        ctx.stroke()
        return
    }

    const upper_parent = {
        ...previous_round?.matches[match_index * 2],
        center_scroll_Y: get_match_center_Y(
            all_data,
            round_index - 1,
            match_index * 2,
            state,
            options
        ),
        is_highlighted: false
    }
    const lower_parent = {
        ...previous_round?.matches[match_index * 2 + 1],
        center_scroll_Y: get_match_center_Y(
            all_data,
            round_index - 1,
            match_index * 2 + 1,
            state,
            options
        ),
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

    ctx.stroke()
}