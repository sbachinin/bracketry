import * as constants from './constants.mjs'

export const draw_connection_to_parent_match = (
    earlier_connection_point,
    later_connection_point,
    options,
    ctx
) => {
   
    if (options.connection_lines_type === 'curve') {
        ctx.bezierCurveTo(
            later_connection_point[0] - constants.MATCH_HOR_MARGIN * 1.5,
            later_connection_point[1],
            earlier_connection_point[0] + constants.MATCH_HOR_MARGIN * 1.5,
            earlier_connection_point[1],
            earlier_connection_point[0],
            earlier_connection_point[1]
        );
    } else if (options.connection_lines_type === 'bended-2') {
        
    } else { // case for 'diagonal' and 'bended-1'
        ctx.lineTo(...earlier_connection_point)
    }
}