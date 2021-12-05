import { debounce, create_unique_id } from './utils/utils.mjs'
import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './utils/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'
import * as sizes from './utils/sizes.mjs'

export const createBrackets = (allData, rootContainer, options) => {
    const root_id = create_unique_id()
    const root_bracket_container = document.createElement('div')
    root_bracket_container.className = root_id + ' root_bracket_container'
    root_bracket_container.style.overflow = 'hidden'
    root_bracket_container.style.width = '100%'
    root_bracket_container.style.height = '100%'
    root_bracket_container.style.position = 'relative'

    rootContainer.append(root_bracket_container)

    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const canvasEl = createCanvas(root_bracket_container, options)

    const change_round_index = new_leftmost_round_index => {
        const width_deficit = allData.rounds.length * sizes.ROUND_WIDTH - canvasEl.width
        state.scrollX = -Math.min(width_deficit, new_leftmost_round_index * sizes.ROUND_WIDTH)
        drawAll(allData, state, canvasEl)
    }

    const { update_buttons_on_resize } = create_horizontal_scroll_buttons(
        root_bracket_container,
        options,
        allData.rounds.length,
        state,
        change_round_index,
        root_id
    )

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
