export const drawConnectionToEarlierMatch = (
    earlierConnectionPoint,
    laterConnectionPoint,
    connectionType = 'diagonal', // 'curve' | 'diagonal' | '? path of straight lines'
    ctx
) => {
   
    if (connectionType === 'curve') {
        // ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    } else if (connectionType === 'diagonal') {
        ctx.lineTo(...earlierConnectionPoint);
    }
}