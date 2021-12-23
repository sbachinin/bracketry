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

export const tryScrollX = (allData, state, handle_new_scrollX, canvasEl, e) => {
    const contentWidth = allData.rounds.length * constants.ROUND_WIDTH

    if (contentWidth - canvasEl.width <= 0) return

    scrollForce = getScrollForce(canvasEl, e)

    makeScrollStep = () => {
        const new_scrollX = getScrollXWithConstraints(state, contentWidth, canvasEl);
        if (new_scrollX !== state.scrollX) {
            handle_new_scrollX(new_scrollX)
        }
    }

    startAnimation(makeScrollStep)
}
