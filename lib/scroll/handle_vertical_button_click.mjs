export const handle_vertical_button_click = (html_shell, get_option, cb) => {

    // TODO: so it's called even if verticalScrollMode === native?
    const try_scroll_Y = (e) => {
        const button_wrapper = e.target.closest('.vertical-scroll-button')
        if (!button_wrapper) return
        const is_up = button_wrapper.classList.contains('button-up')
        const delta = get_option('syntheticScrollAmount')
        cb(is_up ? -delta : delta)
    }

    html_shell.the_root_element.addEventListener('click', try_scroll_Y)

    const unhandle_vertical_button_click = () => {
        html_shell.the_root_element?.removeEventListener('click', try_scroll_Y)
    }

    return unhandle_vertical_button_click
}