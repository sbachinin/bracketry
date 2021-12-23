import { update_button_visibility } from './update_button_visibility.mjs'

const makeButton = (side, size) => {
    const pathLeft = `<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>`
    const pathRight = `<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>`
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24">
        ${side === 'left' ? pathLeft : pathRight}
    </svg>`
}


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

    // button-icon perhaps may be removed without damage
    button.innerHTML = `<div class="button-icon">
        ${
            side === 'left'
            ? options.horizontal_scroll_buttons_icon_left
            : options.horizontal_scroll_buttons_icon_right
        }
    </div>`
    
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