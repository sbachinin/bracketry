import { get_leftmost_index } from './get_leftmost_index.mjs'

export const create_single_button = (state, side, handle_new_round_index) => {
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
            get_leftmost_index(state.scrollX)
            + (side === 'left' ? -1 : 1)
        )
    })
    return button
}