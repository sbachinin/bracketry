export const create_single_button = (
    side,
    onclick,
    options
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-button-wrapper',
        `scroll-button-wrapper-${side}`,
        `${side === 'left' ? 'hidden' : ''}`
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
    
    return button
}