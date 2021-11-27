import * as sizes from './sizes.mjs'

export const drawMatch = (matchData, canvas) => {

    canvas.rect(
        matchData.positionX + sizes.MATCH_HOR_MARGIN,
        matchData.positionY,
        sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2,
        sizes.MATCH_HEIGHT)
    canvas.stroke();

    canvas.fillText(
        matchData.firstPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        matchData.positionY + sizes.FONT_SIZE + sizes.MATCH_VERT_PADDING)
    canvas.fillText(
        matchData.secondPlayer.name,
        matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        matchData.positionY + sizes.MATCH_HEIGHT - sizes.MATCH_VERT_PADDING - 2)
}