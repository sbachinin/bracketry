export const draw_connection_to_parent_match = (
    earlier_connection_point,
    later_connection_point,
    { // options:
        distance_between_rounds: width,
        connection_lines_type: type
    },
    ctx
) => {
    if (type === 'curve') {
        ctx.bezierCurveTo(
            later_connection_point[0] - width,
            later_connection_point[1],
            earlier_connection_point[0] + width,
            earlier_connection_point[1],
            earlier_connection_point[0],
            earlier_connection_point[1]
        )
        return
    }

    if (type === 'bended-2') {
        ctx.lineTo(
            later_connection_point[0],
            earlier_connection_point[1]
        )
    }

    ctx.lineTo(...earlier_connection_point)
}