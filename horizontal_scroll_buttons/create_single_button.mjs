import { get_leftmost_fully_visible_round_index } from './get_leftmost_fully_visible_round_index.mjs'
import { update_button_visibility } from './update_button_visibility.mjs'
import * as constants from '../utils/constants.mjs'

const get_invisible_rounds_count = (root_bracket_container, rounds_count) => {
    const fully_visible_rounds_count = Math.floor(root_bracket_container.clientWidth / constants.ROUND_WIDTH)
    return rounds_count - fully_visible_rounds_count
}

export const create_single_button = (
    state,
    side,
    handle_new_round_index,
    root_bracket_container,
    rounds_count
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-rounds-button',
        `scroll-rounds-button-${side}`,
    ].join(' ')

    button.innerHTML = `<div class="button-icon">${
        side === 'left' ? '&#60;' : '&#62;'
    }</div>`

    button.addEventListener('click', () => {
        handle_new_round_index(
            get_leftmost_fully_visible_round_index(state.scrollX)
            + (side === 'left' ? -1 : 1)
        )
    })
    
    return {
        element: button,
        update_visibility: leftmost_index => update_button_visibility(
            button,
            leftmost_index,
            get_invisible_rounds_count(root_bracket_container, rounds_count)
        )
    }
}