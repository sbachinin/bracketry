import { drawRounds } from './draw_rounds.mjs'
import { get_match_drawing_data } from './get_match_drawing_data.mjs'
import * as constants from './constants.mjs'

export const drawAll = (allData, state, canvasEl, options) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const roundsWithDrawingData = allData.rounds.map((roundData, roundIndex) => {
        const visibleHeightPerMatch = (
            (canvasEl.height - constants.ROUNDS_TITLE_HEIGHT)
            / roundData.matches.length
        )
        const freeHeightPerMatch = Math.max(
            visibleHeightPerMatch,
            constants.MATCH_MIN_HEIGHT
        )

        return {
            ...roundData,
            matchesToDraw: roundData.matches.map(
                match => get_match_drawing_data(match, freeHeightPerMatch, roundIndex, state))
        }
    })

    drawRounds(roundsWithDrawingData, state, ctx, options)
}