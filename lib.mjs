import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './utils/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'
import * as sizes from './utils/sizes.mjs'

export const createBrackets = (allData, canvasContainer, options) => {
    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const change_round_index = new_leftmost_round_index => {
        state.scrollX = -new_leftmost_round_index * sizes.ROUND_WIDTH
        drawAll(allData, state, canvasEl)
    }

    options.horizontalScrollTriggeredBy === 'buttons'
        && create_horizontal_scroll_buttons(
            canvasContainer,
            options.backgroundColor,
            allData.rounds.length,
            state,
            change_round_index)

    const canvasEl = createCanvas(
        canvasContainer,
        options,
        el => drawAll(allData, state, el)
    )

    drawAll(allData, state, canvasEl)

    installMouseEvents(allData, options, state, drawAll, canvasEl)
}
