import * as sizes from './sizes.mjs'

export const drawMatch = (matchData, ctx) => {
    const matchBodyHeight = Math.min(matchData.availableHeight, sizes.MATCH_MAX_HEIGHT)
    const centerY = matchData.positionY + matchData.availableHeight / 2

    ctx.rect(
        matchData.positionX + sizes.MATCH_HOR_MARGIN,
        centerY - matchBodyHeight / 2,
        sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2,
        matchBodyHeight)
    ctx.stroke();

    ctx.fillText(
        matchData.firstPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY)
    ctx.fillText(
        matchData.secondPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY + sizes.FONT_SIZE)
}