import { within_range } from '../utils.mjs'
import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'

export const adjust_offset = (scrollY_middle_ratio, html_shell, get_option, synthetic_scrollTop) => {
    const { matches_vertical_scroller: scroller, matches_positioner } = html_shell

    let offset

    if (get_option('resetScrollOnNavigation') === true) {
        offset = 0
    } else if (get_option('useClassicalLayout') === true) {
        offset = synthetic_scrollTop || scroller.scrollTop
    } else {
        const new_scroll_middle_px = matches_positioner.clientHeight * scrollY_middle_ratio
        offset = within_range(
            new_scroll_middle_px - scroller.clientHeight / 2,
            0,
            matches_positioner.clientHeight - scroller.clientHeight
        )
    }


    if (get_option('verticalScrollMode') === 'buttons' || get_option('fullscreen') === true) {
        // TODO good way to disable transition?
        const old_transition = matches_positioner.style.transition
        matches_positioner.style.transition = `none`
        matches_positioner.style.marginTop = -offset + 'px'
        setTimeout(() => {
            matches_positioner.style.transition = old_transition
        })
    } else {
        scroller.scrollTop = offset
    }

    scrollbar_functions.full_update(html_shell, get_option, offset)

    return offset
}
