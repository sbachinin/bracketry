import { throttle_with_trailing } from '../utils.mjs'

const update_position = throttle_with_trailing(
    (shell, get_option, offsetY_from_buttons) => {
        if (get_option('showScrollbar') !== true) return

        const style = getComputedStyle(shell.scrollbar)
        if (style.display === 'none' || style.visibility === 'hidden') return

        const offsetY = offsetY_from_buttons || shell.matches_vertical_scroller.scrollTop

        shell.scrollbar.style.top = offsetY / shell.matches_vertical_scroller.scrollHeight * 100 + '%'
    },
    15
)

const update_height = (shell) => {
    shell.scrollbar.style.height = shell.matches_vertical_scroller.clientHeight
        / shell.matches_vertical_scroller.scrollHeight * 100 + '%'
}

const full_update = (shell, get_option) => {
    if (get_option('showScrollbar') !== true) return
    const content_is_higher = shell.matches_vertical_scroller.scrollHeight > shell.matches_vertical_scroller.clientHeight
    shell.scrollbar.style.visibility = content_is_higher ? 'visible' : 'hidden'
    update_position(shell, get_option)
    update_height(shell)
}

export const scrollbar_functions = {
    update_position,
    full_update
}