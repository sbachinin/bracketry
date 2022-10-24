import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { within_range } from '../utils.mjs'
import { disable_matches_scroll_on_window_scroll } from './disable_matches_scroll_on_window_scroll.mjs'
import { disable_scroll, enable_scroll } from './disable_scroll_on_element.mjs'


export const handle_vertical_button_click = (html_shell, get_option) => {
    let destination_scroll_Y = 0

    const try_scroll_Y = (e) => {

        if (!e.target.classList.contains('vertical-scroll-button')) return

        const is_up = e.target.classList.contains('button-up')

        const delta = is_up ? 200 : -200
        destination_scroll_Y = within_range(
            destination_scroll_Y + delta,
            html_shell.matches_positioner.parentElement.clientHeight - html_shell.matches_positioner.clientHeight,
            0
        )
        html_shell.matches_positioner.style.transform = `translateY(${destination_scroll_Y}px)`
        scrollbar_functions.update_position(html_shell, get_option, -destination_scroll_Y)
    }

    html_shell.the_root_element.addEventListener('click', try_scroll_Y)

    const unhandle_vertical_button_click = () => {
        html_shell.the_root_element?.removeEventListener('click', try_scroll_Y)
    }

    return unhandle_vertical_button_click
}



export const create_scrolla = (html_shell, get_option) => {

    const { matches_vertical_scroller } = html_shell

    const handle_matches_scroll = () => scrollbar_functions.update_position(html_shell, get_option)
    matches_vertical_scroller.addEventListener('scroll', handle_matches_scroll)

    const forget_window_onscroll = disable_matches_scroll_on_window_scroll(matches_vertical_scroller)

    get_option('fullscreen') === true && disable_scroll(window)

    const unhandle_vertical_button_click = handle_vertical_button_click(html_shell, get_option)

    const uninstall = () => {
        matches_vertical_scroller?.removeEventListener('scroll', handle_matches_scroll)
        forget_window_onscroll()
        unhandle_vertical_button_click()
        enable_scroll(window)
        enable_scroll(the_root_element)
    }

    return { uninstall }
}