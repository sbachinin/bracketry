import * as sizes from './sizes.mjs'

const drawLineToFirstParentPair = (positionX, centerY, ctx) => {
    const parentY = centerY
    ctx.beginPath();
    ctx.moveTo(
        positionX + sizes.MATCH_HOR_MARGIN,
        centerY);
    ctx.lineTo(positionX - sizes.MATCH_HOR_MARGIN,
        parentY);
    ctx.stroke();
}

const drawMatch = (matchData, freeHeightPerMatch, roundIndex, ctx) => {
    // const score = matchData.teams[1].score.map(score => score.game)
    const positionX = sizes.ROUND_WIDTH * roundIndex
    const positionY = sizes.ROUNDS_TITLE_HEIGHT + freeHeightPerMatch * (matchData.order - 1)

    const matchBodyWidth = sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN * 2
    const matchBodyHeight = Math.min(freeHeightPerMatch, sizes.MATCH_MAX_HEIGHT) * 0.8
    const centerY = positionY + freeHeightPerMatch / 2
    const matchBodyY = centerY - matchBodyHeight / 2

    ctx.fillStyle = '#feefe3'
    ctx.fillRect(
        positionX + sizes.MATCH_HOR_MARGIN,
        matchBodyY,
        matchBodyWidth,
        matchBodyHeight)

    ctx.fillStyle = 'black'
    ctx.fillText(
        matchData.teams[0].players[0].shortName,
        positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY - matchBodyHeight / 10)
    ctx.fillText(
        matchData.teams[1].players[0].shortName,
        positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
        centerY + sizes.FONT_SIZE + matchBodyHeight / 10)

    drawLineToFirstParentPair(positionX, centerY, ctx)
}

export const drawMatchesForRound = (roundData, roundIndex, canvasEl) => {
    const visibleHeightPerMatch = (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT) / roundData.matches.length
    const freeHeightPerMatch = Math.max(visibleHeightPerMatch, sizes.MATCH_MIN_HEIGHT)

    roundData.matches.forEach(
        match => drawMatch(match, freeHeightPerMatch, roundIndex, canvasEl.getContext('2d')))
        
}
