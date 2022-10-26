import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { within_range } from '../utils.mjs'
import { disable_matches_scroll_on_window_scroll } from './disable_matches_scroll_on_window_scroll.mjs'
import { disable_scroll, enable_scroll } from './disable_scroll_on_element.mjs'
import { handle_vertical_button_click } from './handle_vertical_button_click.mjs'
import { adjust_offset } from './adjust_offset.mjs'


const get_scrollY_ratio = (html_shell, synthetic_scrollTop) => {
    const { matches_vertical_scroller: scroller, matches_positioner } = html_shell
    const current_offset = scroller.scrollTop || synthetic_scrollTop
    const scrollY_middle_px = current_offset + scroller.clientHeight / 2
    return scrollY_middle_px / matches_positioner.clientHeight
}



export const create_scrolla = (html_shell, get_option) => {
    let synthetic_scrollTop = 0

    const { matches_vertical_scroller: scroller, matches_positioner } = html_shell

    const handle_native_scroll = () => {
        scrollbar_functions.update_position(html_shell, get_option, scroller.scrollTop)
    }
    scroller.addEventListener('scroll', handle_native_scroll)

    const forget_window_onscroll = disable_matches_scroll_on_window_scroll(scroller)

    if (get_option('fullscreen') === true) {
        disable_scroll(window)
    } else if (get_option('verticalScrollMode') === 'buttons') {
        disable_scroll(html_shell.the_root_element)
    }

    const make_scroll_jump = (deltaY) => {
        const translateY_max = matches_positioner.clientHeight - matches_positioner.parentElement.clientHeight
        synthetic_scrollTop = within_range(synthetic_scrollTop + deltaY, 0, translateY_max)
        matches_positioner.style.marginTop = -synthetic_scrollTop + 'px'
        scrollbar_functions.update_position(html_shell, get_option, synthetic_scrollTop)
    }

    const unhandle_vertical_button_click = handle_vertical_button_click(
        html_shell,
        get_option,
        make_scroll_jump
    )









    return {
        get_scrollY_ratio: () => get_scrollY_ratio(html_shell, synthetic_scrollTop),

        adjust_offset: (scrollY_middle_ratio) => {
            const new_offset = adjust_offset(scrollY_middle_ratio, html_shell, get_option, synthetic_scrollTop)
            if (get_option('verticalScrollMode') === 'buttons') {
                synthetic_scrollTop = new_offset
            }
        },

        uninstall: () => {
            scroller?.removeEventListener('scroll', handle_native_scroll)
            forget_window_onscroll()
            unhandle_vertical_button_click()
            enable_scroll(window)
            enable_scroll(html_shell.the_root_element)
        }
    }
}