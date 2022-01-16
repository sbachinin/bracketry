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
            later_connection_point[0] - width/1.5,
            later_connection_point[1],
            earlier_connection_point[0] + width/1.5,
            earlier_connection_point[1],
            earlier_connection_point[0],
            earlier_connection_point[1]
        )
    } else {
        ctx.lineTo(...earlier_connection_point)
    }

}