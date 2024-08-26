import { within_range } from '../utils.mjs'
import { scrollbar_functions } from './scrollbar_functions.mjs'
import { apply_translateY } from './apply_translateY.mjs'

export const adjust_offset = (scrollY_middle_ratio, html_shell, get_option, synthetic_scrollTop) => {
    const { matches_scroller: scroller, matches_positioner } = html_shell

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

    if (get_option('verticalScrollMode') === 'native') {
        scroller.scrollTop = offset
    } else {
        apply_translateY(matches_positioner, offset)
        matches_positioner.offsetHeight // trigger reflow: https://stackoverflow.com/a/16575811
    }

    scrollbar_functions.full_update(html_shell, get_option, offset)

    return offset
}
