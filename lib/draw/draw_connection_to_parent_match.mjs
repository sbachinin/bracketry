import { CURVE_LINE_OFFSET } from '../constants.mjs'

export const draw_connection_to_parent_match = (
    earlier_connection_point,
    later_connection_point,
    options,
    ctx
) => {
    if (options.connection_lines_type === 'curve') {
        ctx.bezierCurveTo(
            later_connection_point[0] - options.match_hor_margin / 2,
            later_connection_point[1],
            earlier_connection_point[0] - CURVE_LINE_OFFSET + options.match_hor_margin / 1.5,
            earlier_connection_point[1],
            earlier_connection_point[0] - CURVE_LINE_OFFSET,
            earlier_connection_point[1]
        )
    } else {
        ctx.lineTo(...earlier_connection_point)
    }

}