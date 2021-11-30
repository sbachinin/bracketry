import * as sizes from './sizes.mjs'

const startAnimation = (fn, shouldContinue) => {
    const step = () => {
        if (shouldContinue()) {
            fn()
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

const scrolledToEndX = (state, canvasEl, roundsCount) => {
    const widthDeficit = roundsCount * sizes.ROUND_WIDTH - canvasEl.width
    return state.scrollX < -widthDeficit
}

let animationInProgress = false

export const installMouseEvents = (allData, state, drawAll, canvasEl) => {
    canvasEl.addEventListener('mousemove', e => {

        if (e.offsetX > canvasEl.width / 100 * 90) { // mouse moved over rightmost 10% of the canvas
            if (animationInProgress || scrolledToEndX(state, canvasEl, allData.rounds.length)) return

            animationInProgress = true
            startAnimation(
                () => {
                    if (scrolledToEndX(state, canvasEl, allData.rounds.length)) {
                        animationInProgress = false
                        return
                    }
                    state.scrollX--;
                    drawAll(allData, state, canvasEl)
                },
                () => animationInProgress
            )

        } else { // mouse moved over left 90%
            animationInProgress = false
        }
    })
}
