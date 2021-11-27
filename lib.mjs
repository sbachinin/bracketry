import { getPlayerMeta } from './utils.mjs'
import * as sizes from './sizes.mjs'

export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');

        // draw rounds
        ctx.font = sizes.FONT_SIZE + 'px sans-serif';
        data.rounds.forEach((round, index) => {
            ctx.fillText(round.name, 150 * index, 50);
        })

        const drawMatch = (matchData) => {

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
        }

        const getRoundHighestY = (roundIndex) => {
            const distanceFromFinal = data.rounds.length - roundIndex - 1
            const numberOfMatches = Math.pow(2, distanceFromFinal)
            const roundHeight = numberOfMatches * sizes.MATCH_HEIGHT

            // create an upper margin to center matches vertically in case they all fit the canvas
            const roundVerticalMargin = Math.max(0, (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT - roundHeight) / 2)
            return sizes.ROUNDS_TITLE_HEIGHT + roundVerticalMargin
        }

        data.matches
            .map(match => {
                const roundIndex = data.rounds.findIndex(r => r.uuid.match(match.round_id))

                const roundHighestY = getRoundHighestY(roundIndex)

                return {
                    firstPlayer: {
                        name: getPlayerMeta(match, 0, data).short_name,
                        score: match.teams[0].score.map(score => score.game)
                    },
                    secondPlayer: {
                        name: getPlayerMeta(match, 1, data).short_name,
                        score: match.teams[1].score.map(score => score.game)
                    },
                    positionX: sizes.ROUND_WIDTH * roundIndex,
                    positionY: roundHighestY + (sizes.MATCH_HEIGHT + sizes.MATCH_VERT_MARGIN) * (match.order - 1)
                }
            })
            .forEach(drawMatch)
    }
}