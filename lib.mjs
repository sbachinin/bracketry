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

        data.matches
            .map(match => {
                const roundIndex = data.rounds.findIndex(r => r.uuid.match(match.round_id))

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
                    positionY: ROUNDS_TITLE_HEIGHT + MATCH_HEIGHT * match.order
                }
            })
            .forEach(drawMatch)
    }
}