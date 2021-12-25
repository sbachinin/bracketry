import { update_button_visibility } from './update_button_visibility.mjs'

export const create_single_button = (
    side,
    onclick,
    get_invisible_rounds_count,
    options
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-rounds-button',
        `scroll-rounds-button-${side}`,
    ].join(' ')

    button.innerHTML = side === 'left'
            ? options.horizontal_scroll_buttons_icon_left
            : options.horizontal_scroll_buttons_icon_right

    button.querySelector('svg')?.setAttribute(
        'height',
        options.horizontal_scroll_buttons_size
    )

    button.querySelector('svg')?.setAttribute(
        'width',
        options.horizontal_scroll_buttons_size
    )

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