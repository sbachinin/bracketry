import { debounce } from './utils/utils.mjs'
import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './utils/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'
import * as sizes from './utils/sizes.mjs'

export const createBrackets = (allData, rootContainer, options) => {
    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const change_round_index = new_leftmost_round_index => {
        state.scrollX = -new_leftmost_round_index * sizes.ROUND_WIDTH
        drawAll(allData, state, canvasEl)
    }

    const { update_buttons_on_resize } = create_horizontal_scroll_buttons(
        rootContainer,
        options,
        allData.rounds.length,
        state,
        change_round_index)

    const canvasEl = createCanvas(rootContainer, options)

    new ResizeObserver(
        debounce(([{ contentRect: { width, height }}]) => {
            canvasEl.width = width
            canvasEl.height = height
            drawAll(allData, state, canvasEl)
            update_buttons_on_resize()
        })
    ).observe(rootContainer)

    drawAll(allData, state, canvasEl)

    installMouseEvents(allData, options, state, drawAll, canvasEl)
}
