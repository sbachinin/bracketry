import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import { get_match_middle_Y } from '../utils/sizes.mjs'
import { CURVE_LINE_OFFSET } from '../constants.mjs'

export const maybe_draw_lines_for_match = ({
    round_index,
    match_index,
    all_data,
    state = { scroll_X: 0, scroll_Y: 0},
    options,
    root_elements,
}) => {
    const match_middle_Y = get_match_middle_Y(
        all_data,
        round_index,
        match_index,
        state,
        options
    )

    const ctx = root_elements.main_canvas_el.getContext('2d')

// draw 'axis' of the match
    ctx.beginPath()
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color

    const round_left_X = root_elements.rounds_elements_wrapper.firstChild.clientWidth * round_index
    ctx.moveTo(
        round_left_X
            + root_elements.rounds_elements_wrapper.firstChild.clientWidth
            - options.match_hor_margin
            - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : options.connection_lines_width),
        match_middle_Y
    )
    const connection_point = [round_left_X + options.match_hor_margin, match_middle_Y]
    ctx.lineTo(...connection_point)

    const previous_round = all_data.rounds[round_index - 1]
    if (!previous_round) {
        ctx.stroke()
        return
    }

    const upper_parent = {
        ...previous_round?.matches[match_index * 2],
        match_middle_Y: get_match_middle_Y(
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
        match_middle_Y: get_match_middle_Y(
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