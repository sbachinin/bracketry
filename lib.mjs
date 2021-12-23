import { debounce, create_unique_id } from './utils/utils.mjs'
import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'
import * as constants from './utils/constants.mjs'

// if element gets WIDER on resize, right gap may appear
// This free space may be used to scroll back to show more rounds on the left
const try_adjust_scrollX_on_resize = (scrollX, roundsCount, root_container_width) => {
    const maximum_visible_width = (roundsCount * constants.ROUND_WIDTH) + scrollX
    const right_gap_width = root_container_width - maximum_visible_width
    if (right_gap_width <= 0) return scrollX
    return Math.min(0, scrollX + right_gap_width)
}

export const createBrackets = (
    allData,
    rootContainer,
    user_options
) => {
    const actual_options = { ...constants.DEFAULT_OPTIONS, ...user_options}

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

    const canvasEl = createCanvas(root_bracket_container, actual_options)

    const handle_new_scrollX = new_scrollX => {
        state.scrollX = new_scrollX
        drawAll(allData, state, canvasEl, actual_options)
    }

    create_horizontal_scroll_buttons(
        root_bracket_container,
        actual_options,
        allData.rounds.length,
        state,
        handle_new_scrollX,
        root_id
    )

    new ResizeObserver(
        debounce(resizeEntry => {
            const root_container_width = resizeEntry[0].contentRect.width
            const root_container_height = resizeEntry[0].contentRect.height

            canvasEl.width = root_container_width
            canvasEl.height = root_container_height
            
            state.scrollX = try_adjust_scrollX_on_resize(
                state.scrollX,
                allData.rounds.length,
                root_container_width)
            
            drawAll(allData, state, canvasEl, actual_options)
        })
    ).observe(rootContainer)

    drawAll(allData, state, canvasEl, actual_options)

    installMouseEvents(allData, actual_options, state, handle_new_scrollX, canvasEl)
}
