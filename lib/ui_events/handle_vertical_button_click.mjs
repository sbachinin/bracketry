export const handle_vertical_button_click = (html_shell, get_option, cb) => {
    const try_scroll_Y = (e) => {
        if (!e.target.classList.contains('vertical-scroll-button')) return
        const is_up = e.target.classList.contains('button-up')
        const delta = get_option('syntheticScrollAmount')
        cb(is_up ? -delta : delta)
    }

    html_shell.the_root_element.addEventListener('click', try_scroll_Y)

    const unhandle_vertical_button_click = () => {
        html_shell.the_root_element?.removeEventListener('click', try_scroll_Y)
    }

    return unhandle_vertical_button_click
}