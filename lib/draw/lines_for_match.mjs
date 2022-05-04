import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import { get_match_middle_Y } from '../utils/sizes.mjs'
import { CURVE_LINE_OFFSET } from '../constants.mjs'

export const maybe_draw_lines_for_match = ({
    round_index,
    match_index,
    rounds_count,
    options,
    first_round_width,
    canvas
}) => {
    const match_middle_Y = get_match_middle_Y(
        rounds_count,
        round_index,
        match_index,
        canvas.height
    )

    const ctx = canvas.getContext('2d')

// draw 'axis' of the match
    ctx.beginPath()
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color

    const round_left_X = first_round_width * round_index
    ctx.moveTo(
        round_left_X
            + first_round_width
            - options.match_hor_margin
            - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : options.connection_lines_width),
        match_middle_Y
    )
    const connection_point = [round_left_X + options.match_hor_margin, match_middle_Y]
    ctx.lineTo(...connection_point)

    if (round_index === 0) {
        ctx.stroke()
        return
    }

    const upper_parent = {
        match_middle_Y: get_match_middle_Y(
            rounds_count,
            round_index - 1,
            match_index * 2,
            canvas.height
        ),
        is_highlighted: false
    }
    const lower_parent = {
        match_middle_Y: get_match_middle_Y(
            rounds_count,
            round_index - 1,
            match_index * 2 + 1,
            canvas.height
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