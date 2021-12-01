import { startAnimation } from './utils.mjs'
import * as sizes from './sizes.mjs'

const scrolledToEndX = (state, canvasEl, roundsCount) => {
    const widthDeficit = roundsCount * sizes.ROUND_WIDTH - canvasEl.width
    return state.scrollX < -widthDeficit
}

const getNewScrollStepLength = (canvasEl, mouseEvent) => {
    const distanceFromRight = canvasEl.width - mouseEvent.offsetX
    return Math.min(
        canvasEl.width / 6.666 / (distanceFromRight || 1),
        20
    )
}

let animationInProgress = false
let scrollStepLength = 0

export const handleMouseMove = (allData, state, drawAll, canvasEl, e) => {

    if (e.offsetX > canvasEl.width / 100 * 85) { // mouse moved over rightmost 15% of the canvas
        scrollStepLength = getNewScrollStepLength(canvasEl, e)
        
        if (animationInProgress || scrolledToEndX(state, canvasEl, allData.rounds.length)) return

        animationInProgress = true
        
        startAnimation(
            () => {
                if (scrolledToEndX(state, canvasEl, allData.rounds.length)) {
                    animationInProgress = false
                    return
                }
                state.scrollX -= scrollStepLength;
                drawAll(allData, state, canvasEl)
            },
            () => animationInProgress
        )

    } else { // mouse moved over left 85%
        animationInProgress = false
    }
}
