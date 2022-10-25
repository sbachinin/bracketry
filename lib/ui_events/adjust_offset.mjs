import { within_range } from '../utils.mjs'
import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'

export const adjust_offset = (scrollY_middle_ratio, html_shell, get_option, synthetic_scrollTop) => {

    const { matches_vertical_scroller: scroller, matches_positioner } = html_shell

    if (get_option('resetScrollOnNavigation')) {
        // TODO remove this check
        matches_positioner.style.marginTop = 0
        scroller.scrollTop = 0
    } else if (!get_option('useClassicalLayout')) {
        const new_scroll_middle_px = matches_positioner.clientHeight * scrollY_middle_ratio
        const new_offset = within_range(
            new_scroll_middle_px - scroller.clientHeight / 2,
            0,
            matches_positioner.clientHeight - scroller.clientHeight
        )
        if (get_option('verticalScrollMode') === 'buttons' || get_option('fullscreen') === true) {
            synthetic_scrollTop = new_offset
            // TODO good way to disable transition?
            const old_transition = matches_positioner.style.transition
            matches_positioner.style.transition = `none`
            matches_positioner.style.marginTop = -new_offset + 'px'
            setTimeout(() => {
                matches_positioner.style.transition = old_transition
            })
        } else {
            scroller.scrollTop = new_offset
        }
        scrollbar_functions.full_update(html_shell, get_option, new_offset)
    }

    return synthetic_scrollTop
}
