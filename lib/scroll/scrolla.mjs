import { scrollbar_functions } from './scrollbar_functions.mjs'
import { within_range } from '../utils.mjs'
import { disable_matches_scroll_on_window_scroll } from './disable_matches_scroll_on_window_scroll.mjs'
import { restrict_native_scroll } from './restrict_native_scroll.mjs'
import { handle_vertical_button_click } from './handle_vertical_button_click.mjs'
import { adjust_offset } from './adjust_offset.mjs'


const get_scrollY_ratio = (html_shell, synthetic_scrollTop) => {
    const { matches_scroller: scroller, matches_positioner } = html_shell
    const current_offset = scroller.scrollTop || synthetic_scrollTop
    const scrollY_middle_px = current_offset + scroller.clientHeight / 2
    return scrollY_middle_px / matches_positioner.clientHeight
}

const update_scroll_buttons = (synthetic_scrollTop, html_shell) => {
    const max_scrollTop = html_shell.matches_positioner.clientHeight - html_shell.matches_scroller.clientHeight
    const has_reached_end = Math.ceil(synthetic_scrollTop) >= Math.floor(max_scrollTop)
    const button_down = html_shell.the_root_element.querySelector('.button-down')
    const button_up = html_shell.the_root_element.querySelector('.button-up')

    if (has_reached_end) {
        button_down.classList.remove('active')
    } else {
        button_down.classList.add('active')
    }

    if (Math.floor(synthetic_scrollTop) <= 0) {
        button_up.classList.remove('active')
    } else {
        button_up.classList.add('active')
    }
}



export const create_scrolla = (html_shell, get_option) => {
    let synthetic_scrollTop = 0

    const { matches_scroller: scroller, matches_positioner } = html_shell

    const handle_native_scroll = () => {
        scrollbar_functions.update_position(html_shell, get_option, scroller.scrollTop)
    }

    const forget_window_onscroll = disable_matches_scroll_on_window_scroll(scroller, get_option)

    const make_scroll_jump = (deltaY) => {
        const translateY_max = matches_positioner.clientHeight - matches_positioner.parentElement.clientHeight
        synthetic_scrollTop = within_range(synthetic_scrollTop + deltaY, 0, translateY_max)
        matches_positioner.style.transform = `translateY(-${Math.floor(synthetic_scrollTop)}px)`
        scrollbar_functions.update_position_with_transition(html_shell, get_option, synthetic_scrollTop)
        update_scroll_buttons(synthetic_scrollTop, html_shell)
    }


    let release_native_scroll_on_window = () => void 0
    let release_native_scroll_on_matches = () => void 0

    if (get_option('fullscreen') === true) {
        release_native_scroll_on_window = restrict_native_scroll(window, make_scroll_jump)
    } else if (get_option('verticalScrollMode') === 'mixed') {
        release_native_scroll_on_matches = restrict_native_scroll(scroller, make_scroll_jump)
    } else if (get_option('verticalScrollMode') === 'native') {
        scroller.classList.add('scroll-y-enabled')
        scroller.addEventListener('scroll', handle_native_scroll)
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
            if (get_option('verticalScrollMode') !== 'native') {
                synthetic_scrollTop = new_offset
            }
            update_scroll_buttons(synthetic_scrollTop, html_shell)
        },

        uninstall: () => {
            scroller?.removeEventListener('scroll', handle_native_scroll)
            forget_window_onscroll()
            unhandle_vertical_button_click()
            release_native_scroll_on_window()
            release_native_scroll_on_matches()
        }
    }
}