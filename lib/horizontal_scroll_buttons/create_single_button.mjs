export const create_single_button = (
    side,
    onclick,
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
    
    return button
}