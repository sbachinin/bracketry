import { createCanvas } from './utils/createCanvas.mjs'
import { getMatchDrawingData } from './utils/getMatchDrawingData.mjs'
import * as sizes from './utils/sizes.mjs'

const drawMatchesForRound = (roundIndex, allRounds, ctx) => {
    allRounds[roundIndex].matchesToDraw.forEach((matchData, matchIndex) => {
    
        ctx.fillStyle = '#feefe3'
        // ctx.fillRect(
        //     matchData.positionX + sizes.MATCH_HOR_MARGIN,
        //     matchData.matchBodyY,
        //     matchData.matchBodyWidth,
        //     matchData.matchBodyHeight)
        
        ctx.fillStyle = 'black'
        ctx.fillText(
            matchData.firstTeamTitle,
            matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            matchData.centerY - matchData.matchBodyHeight / 10)
        ctx.fillText(
            matchData.secondTeamTitle,
            matchData.positionX + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            matchData.centerY + sizes.FONT_SIZE + matchData.matchBodyHeight / 10)

        ctx.beginPath();
        ctx.moveTo(
            matchData.positionX + sizes.ROUND_WIDTH - sizes.MATCH_HOR_MARGIN,
            matchData.centerY);
        ctx.lineTo(
            matchData.positionX + sizes.MATCH_HOR_MARGIN,
            matchData.centerY)

        if (roundIndex > 0) {
            const drawLineToParent = parentIndex => {
                const parentData = allRounds[roundIndex - 1].matchesToDraw[matchIndex * 2 + parentIndex]
                ctx.lineTo(matchData.positionX - sizes.MATCH_HOR_MARGIN,
                    parentData.centerY);
            }
            
            drawLineToParent(0)
            ctx.moveTo(
                matchData.positionX + sizes.MATCH_HOR_MARGIN,
                matchData.centerY);
            drawLineToParent(1)
        }

        ctx.stroke();
    })
}

const drawRounds = (allRounds, ctx) => {
    allRounds.forEach((roundData, roundIndex) => {
        ctx.font = sizes.HEADING_FONT_SIZE + 'px sans-serif';
        ctx.fillText(
            roundData.name,
            sizes.ROUND_WIDTH * roundIndex + sizes.MATCH_HOR_MARGIN + sizes.MATCH_HOR_PADDING,
            50);
    
        ctx.font = sizes.FONT_SIZE + 'px sans-serif';
        drawMatchesForRound(roundIndex, allRounds, ctx)
    })
}

const draw = (allData, canvasEl) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    const roundsWithDrawingData = allData.rounds.map((roundData, roundIndex) => {
        const visibleHeightPerMatch = (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT) / roundData.matches.length
        const freeHeightPerMatch = Math.max(visibleHeightPerMatch, sizes.MATCH_MIN_HEIGHT)

        return {
            ...roundData,
            matchesToDraw: roundData.matches.map(
                match => getMatchDrawingData(match, freeHeightPerMatch, roundIndex))
        }
    })

    drawRounds(roundsWithDrawingData, ctx)
}

export const createBrackets = (allData, canvasContainer) => {
    const canvasEl = createCanvas(
        canvasContainer,
        el => draw(allData, el)
    )

    draw(allData, canvasEl)
}