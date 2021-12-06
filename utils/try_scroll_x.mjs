import { startAnimation } from './animate.mjs'
import * as constants from './constants.mjs'

let makeScrollStep = () => {}
let scrollForce = 0

const getScrollForce = (canvasEl, mouseEvent) => {
    const percentFromLeft = mouseEvent.offsetX / canvasEl.width * 100
    if (percentFromLeft < constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percentFromLeft
    }
    if (percentFromLeft > (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percentFromLeft
    } else {
        return 0
    }
}

const getScrollXWithConstraints = (state, contentWidth, canvasEl) => {
    const widthDeficit = contentWidth - canvasEl.width
    let newScrollX = state.scrollX + scrollForce
    if (newScrollX < -widthDeficit) {
        return -widthDeficit // prevent right overscrolling
    } else {
        return Math.min(state.scrollX + scrollForce, 0) // prevent left
    }
}

export const tryScrollX = (allData, state, drawAll, canvasEl, e) => {
    const contentWidth = allData.rounds.length * constants.ROUND_WIDTH

    if (contentWidth - canvasEl.width <= 0) return

    scrollForce = getScrollForce(canvasEl, e)

    makeScrollStep = () => {
        const newScrollX = getScrollXWithConstraints(state, contentWidth, canvasEl);
        if (newScrollX !== state.scrollX) {
            state.scrollX = newScrollX
            drawAll(allData, state, canvasEl)
        }
    }

    startAnimation(makeScrollStep)
}
