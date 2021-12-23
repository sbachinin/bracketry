import { update_button_visibility } from './update_button_visibility.mjs'

const arrowLeft = `<svg width="32" height="32" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>`
const arrowRight = `<svg width="32" height="32" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>`

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
        side === 'left' ? arrowLeft : arrowRight
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