import { startAnimation } from './utils.mjs'
import * as sizes from './sizes.mjs'

let scrollInitialized = false
let scrollForce = 0

const getScrollForce = (canvasEl, mouseEvent) => {
    const percentFromLeft = mouseEvent.offsetX / canvasEl.width * 100
    if (percentFromLeft < sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percentFromLeft
    }
    if (percentFromLeft > (100 - sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return (100 - sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percentFromLeft
    } else {
        return 0
    }
}

const getScrollXWithConstraints = (state, scrollForce, contentWidth, canvasEl) => {
    const widthDeficit = contentWidth - canvasEl.width
    let newScrollX = state.scrollX + scrollForce
    if (newScrollX < -widthDeficit) {
        return -widthDeficit // prevent right overscrolling
    } else {
        return Math.min(state.scrollX + scrollForce, 0) // prevent left
    }
}

export const tryScrollX = (allData, state, drawAll, canvasEl, e) => {
    const contentWidth = allData.rounds.length * sizes.ROUND_WIDTH

    if (contentWidth - canvasEl.width <= 0) return

    scrollForce = getScrollForce(canvasEl, e)

    if (scrollInitialized) return

    scrollInitialized = true
    
    startAnimation(() => {
        const newScrollX = getScrollXWithConstraints(state, scrollForce, contentWidth, canvasEl);
        if (newScrollX !== state.scrollX) {
            state.scrollX = newScrollX
            drawAll(allData, state, canvasEl)
        }
    })
}
