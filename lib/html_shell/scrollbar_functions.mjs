import { throttle_with_trailing } from '../utils.mjs'

const update_position = throttle_with_trailing(
    (shell, get_option) => {
        if (get_option('showScrollbar') !== true) return

        const style = getComputedStyle(shell.scrollbar)
        if (style.display === 'none' || style.visibility === 'hidden') return

        const scroller_height = shell.matches_vertical_scroller.scrollHeight
        shell.scrollbar.style.top = shell.matches_vertical_scroller.scrollTop
            / scroller_height * 100 + '%'
        shell.scrollbar.style.height = shell.matches_vertical_scroller.clientHeight
            / scroller_height * 100 + '%'
    },
    15
)

const full_update = (shell, get_option) => {
    if (get_option('showScrollbar') !== true) return
    const content_is_higher = shell.matches_vertical_scroller.scrollHeight > shell.matches_vertical_scroller.clientHeight
    shell.scrollbar.style.visibility = content_is_higher ? 'visible' : 'hidden'
    update_position(shell, get_option)
}

export const scrollbar_functions = {
    update_position,
    full_update
}