import * as sizes from './sizes.mjs'

// const drawLineToFirstParentPair = (matchData, ctx) => {
//     const parentY = matchData.positionY + sizes.MATCH_HEIGHT / 2
//     ctx.beginPath();
//     ctx.moveTo(
//         matchData.positionX + sizes.MATCH_HOR_MARGIN,
//         matchData.positionY + sizes.MATCH_HEIGHT / 2);
//     ctx.lineTo(matchData.positionX - sizes.MATCH_HOR_MARGIN,
//         parentY);
//     ctx.stroke();
// }

export const drawMatch = (matchData, ctx) => {

    ctx.rect(
        matchData.positionX + sizes.MATCH_HOR_MARGIN,
        matchData.positionY,
        sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2,
        sizes.MATCH_HEIGHT)
    ctx.stroke();

    ctx.fillText(
        matchData.firstPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        matchData.positionY + sizes.FONT_SIZE + sizes.MATCH_VERT_PADDING)
    ctx.fillText(
        matchData.secondPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        matchData.positionY + sizes.MATCH_HEIGHT - sizes.MATCH_VERT_PADDING - 2)

    // drawLineToFirstParentPair(matchData, ctx)
}