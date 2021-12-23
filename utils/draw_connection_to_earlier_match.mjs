import * as constants from './constants.mjs'

export const drawConnectionToEarlierMatch = (
    earlierConnectionPoint,
    laterConnectionPoint,
    { connection_lines_type },
    ctx
) => {
   
    if (connection_lines_type === 'curve') {
        ctx.bezierCurveTo(
            laterConnectionPoint[0] - constants.MATCH_HOR_MARGIN * 1.5,
            laterConnectionPoint[1],
            earlierConnectionPoint[0] + constants.MATCH_HOR_MARGIN * 1.5,
            earlierConnectionPoint[1],
            earlierConnectionPoint[0],
            earlierConnectionPoint[1]
        );
    } else if (connection_lines_type === 'diagonal') {
        ctx.lineTo(...earlierConnectionPoint);
    }
}