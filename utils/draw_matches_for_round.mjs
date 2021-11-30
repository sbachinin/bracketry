import { drawConnectionToEarlierMatch } from './draw_connection_to_earlier_match.mjs'
import * as sizes from './sizes.mjs'

export const drawMatchesForRound = (roundIndex, allRounds, ctx) => {
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
        const connectionPoint = [
            matchData.positionX + sizes.MATCH_HOR_MARGIN,
            matchData.centerY
        ]
        ctx.lineTo(...connectionPoint)

        if (roundIndex > 0) {
            
            const getEarlierConnectionPoint = (parentMatchIndex) => {
                const previousRoundMatches = allRounds[roundIndex - 1].matchesToDraw
                return [
                    matchData.positionX - sizes.MATCH_HOR_MARGIN,
                    previousRoundMatches[matchIndex * 2 + parentMatchIndex].centerY
                ]
            }

            drawConnectionToEarlierMatch(
                getEarlierConnectionPoint(0),
                connectionPoint,
                'curve',
                ctx
            )
            ctx.moveTo(
                matchData.positionX + sizes.MATCH_HOR_MARGIN,
                matchData.centerY);
            drawConnectionToEarlierMatch(
                getEarlierConnectionPoint(1),
                connectionPoint,
                'curve',
                ctx)
        }

        ctx.stroke();
    })
}