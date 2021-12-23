import { drawConnectionToEarlierMatch } from './draw_connection_to_earlier_match.mjs'
import * as constants from './constants.mjs'

export const drawMatchesForRound = (roundIndex, allRounds, ctx, options) => {
    allRounds[roundIndex].matchesToDraw.forEach((matchData, matchIndex) => {
    
        ctx.fillStyle = '#feefe3'
        // ctx.fillRect(
        //     matchData.positionX + constants.MATCH_HOR_MARGIN,
        //     matchData.matchBodyY,
        //     matchData.matchBodyWidth,
        //     matchData.matchBodyHeight)
        
        ctx.fillStyle = 'black'
        ctx.fillText(
            matchData.firstTeamTitle,
            matchData.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            matchData.centerY - matchData.matchBodyHeight / 10)
        ctx.fillText(
            matchData.secondTeamTitle,
            matchData.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            matchData.centerY + constants.FONT_SIZE + matchData.matchBodyHeight / 10)

        ctx.beginPath();
        ctx.moveTo(
            matchData.positionX + constants.ROUND_WIDTH - constants.MATCH_HOR_MARGIN,
            matchData.centerY);
        const connectionPoint = [
            matchData.positionX + constants.MATCH_HOR_MARGIN,
            matchData.centerY
        ]
        ctx.lineTo(...connectionPoint)

        if (roundIndex > 0) {
            
            const getEarlierConnectionPoint = (parentMatchIndex) => {
                const previousRoundMatches = allRounds[roundIndex - 1].matchesToDraw
                return [
                    matchData.positionX - constants.MATCH_HOR_MARGIN,
                    previousRoundMatches[matchIndex * 2 + parentMatchIndex].centerY
                ]
            }

            drawConnectionToEarlierMatch(
                getEarlierConnectionPoint(0),
                connectionPoint,
                options,
                ctx
            )
            ctx.moveTo(
                matchData.positionX + constants.MATCH_HOR_MARGIN,
                matchData.centerY);
            drawConnectionToEarlierMatch(
                getEarlierConnectionPoint(1),
                connectionPoint,
                options,
                ctx)
        }

        ctx.stroke();
    })
}