import * as sizes from './sizes.mjs'

export const drawMatch = (matchData, ctx) => {
    const matchBodyWidth = sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2
    const matchBodyHeight = Math.min(matchData.availableHeight, sizes.MATCH_MAX_HEIGHT) * 0.8
    const centerY = matchData.positionY + matchData.availableHeight / 2
    const matchBodyY = centerY - matchBodyHeight / 2

    ctx.fillStyle = '#feefe3'
    ctx.fillRect(
        matchData.positionX + sizes.MATCH_HOR_MARGIN,
        matchBodyY,
        matchBodyWidth,
        matchBodyHeight)

    ctx.fillStyle = 'black'
    ctx.fillText(
        matchData.firstPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY - matchBodyHeight / 10)
    ctx.fillText(
        matchData.secondPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY + sizes.FONT_SIZE + matchBodyHeight / 10)
}