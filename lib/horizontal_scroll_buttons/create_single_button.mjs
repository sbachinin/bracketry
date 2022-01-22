export const create_single_button = (
    side,
    onclick,
) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-button-wrapper',
        `scroll-button-wrapper-${side}`,
        'hidden'
    ].join(' ')

    button.addEventListener('click', onclick)
    
    return button
}