import { update_button_visibility } from './update_button_visibility.mjs'

export const create_single_button = (
    side,
    onclick,
    get_invisible_rounds_count
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-rounds-button',
        `scroll-rounds-button-${side}`,
    ].join(' ')

    button.innerHTML = `<div class="button-icon">${
        side === 'left' ? '&#60;' : '&#62;'
    }</div>`

    button.addEventListener('click', onclick)
    
    return {
        element: button,
        update_visibility: leftmost_round_index => update_button_visibility(
            button,
            leftmost_round_index,
            get_invisible_rounds_count()
        )
    }
}