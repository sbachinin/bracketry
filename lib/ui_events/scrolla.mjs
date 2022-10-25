import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { within_range } from '../utils.mjs'
import { disable_matches_scroll_on_window_scroll } from './disable_matches_scroll_on_window_scroll.mjs'
import { disable_scroll, enable_scroll } from './disable_scroll_on_element.mjs'


export const handle_vertical_button_click = (html_shell, cb) => {
    const try_scroll_Y = (e) => {
        if (!e.target.classList.contains('vertical-scroll-button')) return
        const is_up = e.target.classList.contains('button-up')
        const delta = is_up ? -200 : 200
        cb(delta)
    }

    html_shell.the_root_element.addEventListener('click', try_scroll_Y)

    const unhandle_vertical_button_click = () => {
        html_shell.the_root_element?.removeEventListener('click', try_scroll_Y)
    }

    return unhandle_vertical_button_click
}



export const create_scrolla = (html_shell, get_option) => {
    let synthetic_scrollTop = 0

    const { matches_vertical_scroller: scroller, matches_positioner } = html_shell

    const handle_native_scroll = () => {
        scrollbar_functions.update_position(html_shell, get_option, scroller.scrollTop)
    }
    scroller.addEventListener('scroll', handle_native_scroll)

    const forget_window_onscroll = disable_matches_scroll_on_window_scroll(scroller)

    get_option('fullscreen') === true && disable_scroll(window)

    const make_scroll_jump = (deltaY) => {
        const translateY_max = matches_positioner.clientHeight - matches_positioner.parentElement.clientHeight
        synthetic_scrollTop = within_range(synthetic_scrollTop + deltaY, 0, translateY_max)
        matches_positioner.style.marginTop = -synthetic_scrollTop + 'px'
        scrollbar_functions.update_position(html_shell, get_option, synthetic_scrollTop)
    }

    const unhandle_vertical_button_click = handle_vertical_button_click(html_shell, make_scroll_jump)


    const get_scrollY_ratio = () => {
        if (get_option('resetScrollOnNavigation') === true) {
            return scroller.clientHeight / 2
        }
        const current_offset = scroller.scrollTop || synthetic_scrollTop
        const scrollY_middle_px = current_offset + scroller.clientHeight / 2
        return scrollY_middle_px / matches_positioner.clientHeight
    }


    const adjust_offset = (scrollY_middle_ratio) => {

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
    }

    const uninstall = () => {
        scroller?.removeEventListener('scroll', handle_native_scroll)
        forget_window_onscroll()
        unhandle_vertical_button_click()
        enable_scroll(window)
        enable_scroll(html_shell.the_root_element)
    }

    return {
        get_scrollY_ratio,
        adjust_offset,
        uninstall
    }
}