export const create_single_button = (
    side
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-button-wrapper',
        `scroll-button-wrapper-${side}`,
        'hidden'
    ].join(' ')

    return button
}