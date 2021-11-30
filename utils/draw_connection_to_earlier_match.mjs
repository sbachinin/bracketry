import * as sizes from './sizes.mjs'

export const drawConnectionToEarlierMatch = (
    earlierConnectionPoint,
    laterConnectionPoint,
    connectionType = 'diagonal', // 'curve' | 'diagonal' | '? path of straight lines'
    ctx
) => {
   
    if (connectionType === 'curve') {
        ctx.bezierCurveTo(
            laterConnectionPoint[0] - sizes.MATCH_HOR_MARGIN * 1.5,
            laterConnectionPoint[1],
            earlierConnectionPoint[0] + sizes.MATCH_HOR_MARGIN * 1.5,
            earlierConnectionPoint[1],
            earlierConnectionPoint[0],
            earlierConnectionPoint[1]
        );
    } else if (connectionType === 'diagonal') {
        ctx.lineTo(...earlierConnectionPoint);
    }
}