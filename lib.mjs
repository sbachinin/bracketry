import { getPlayerMeta } from './utils.mjs'

const ROUND_WIDTH = 150
const ROUNDS_TITLE_HEIGHT = 100
const MATCH_HEIGHT = 50

export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');

        // draw rounds
        ctx.font = '12px sans-serif';
        data.rounds.forEach((round, index) => {
            ctx.fillText(round.name, 150 * index, 50);
        })

        const drawMatch = (matchData) => {
            ctx.fillText(matchData.firstPlayer.name, matchData.positionX, matchData.positionY)
            ctx.fillText(matchData.secondPlayer.name, matchData.positionX, matchData.positionY + 20)
        }

        const getRoundHighestY = (roundIndex) => {
            const distanceFromFinal = data.rounds.length - roundIndex - 1
            const numberOfMatches = Math.pow(2, distanceFromFinal)
            const roundHeight = numberOfMatches * MATCH_HEIGHT
            
            // create an upper margin to center matches vertically in case they all fit the canvas
            const roundVerticalMargin = Math.max(0, (canvasEl.height - roundHeight) / 2)
            return ROUNDS_TITLE_HEIGHT + roundVerticalMargin
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
                    positionX: ROUND_WIDTH * roundIndex,
                    positionY: roundHighestY + MATCH_HEIGHT * (match.order - 1)
                }
            })
            .forEach(drawMatch)
    }
}