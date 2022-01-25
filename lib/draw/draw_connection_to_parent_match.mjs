export const draw_connection_to_parent_match = (
    earlier_connection_point,
    later_connection_point,
    options,
    ctx
) => {
    if (options.connection_lines_type === 'curve') {
        ctx.bezierCurveTo(
            later_connection_point[0] - options.distance_between_rounds/4,
            later_connection_point[1],
            earlier_connection_point[0] - 20 + options.distance_between_rounds/3,
            earlier_connection_point[1],
            earlier_connection_point[0] - 20,
            earlier_connection_point[1]
        )
    } else {
        ctx.lineTo(...earlier_connection_point)
    }

}