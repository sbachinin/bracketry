const update_position = (shell, get_option, offsetY) => {
    if (get_option('showScrollbar') !== true) return
    shell.scrollbar.style.top = offsetY / shell.matches_positioner.clientHeight * 100 + '%'
}

const update_position_with_transition = (shell, get_option, offsetY) => {
    shell.scrollbar.classList.add('animated')
    update_position(shell, get_option, offsetY)
    const deanimate = () => {
        shell.scrollbar.classList.remove('animated')
        shell.scrollbar.removeEventListener('transitionend', deanimate)
    }
    shell.scrollbar.addEventListener('transitionend', deanimate)
}

const update_height = (shell) => {
    shell.scrollbar.style.height = shell.matches_scroller.clientHeight
        / shell.matches_positioner.clientHeight * 100 + '%'
}

const full_update = (shell, get_option, offsetY) => {
    if (get_option('showScrollbar') !== true) return
    const content_is_higher = shell.matches_positioner.clientHeight > shell.matches_scroller.clientHeight
    shell.scrollbar.style.visibility = content_is_higher ? 'visible' : 'hidden'
    update_position(shell, get_option, offsetY)
    update_height(shell)
}

export const scrollbar_functions = {
    update_position,
    update_position_with_transition,
    full_update
}