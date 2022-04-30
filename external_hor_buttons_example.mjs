import { create_element_from_Html } from './lib/utils/utils.mjs'

export const create_external_buttons = (getScrollState, scrollLeft, scrollRight) => {
    const left_button = create_element_from_Html(`<div style="font-size: 50px; display: inline-block; user-select: none">&#x3c;</div>`)
    const right_button = create_element_from_Html(`<div style="font-size: 50px; display: inline-block; user-select: none">&#x3e;</div>`)

    const update_buttons = () => {
        const state = getScrollState()
        right_button.style.opacity = 1
        left_button.style.opacity = 1
        if (!state.contentIsWider) {
            left_button.style.display = 'none'
            right_button.style.display = 'none'
        }
        if (state.reachedRightEdge) {
            right_button.style.opacity = 0.2
        }
        if (state.reachedLeftEdge) {
            left_button.style.opacity = 0.2
        }
    }

    update_buttons()

    left_button.addEventListener('mouseup', () => {
        scrollLeft()
        update_buttons()
    })
    right_button.addEventListener('mouseup', () => {
        scrollRight()
        update_buttons()
    })

    document.body.insertBefore(left_button, document.querySelector('#canvas-container'))
    document.body.insertBefore(right_button, document.querySelector('#canvas-container'))
}

