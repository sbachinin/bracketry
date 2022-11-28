export const handle_vertical_button_click = (html_shell, get_option, cb) => {

    if (get_option('verticalScrollMode') === 'native') {
        return () => void 0
    }

    const try_scroll_Y = (e) => {
        const button_wrapper = e.target.closest('.scroll-button')
        if (!button_wrapper) return
        const is_up = button_wrapper.classList.contains('button-up')
        const delta = get_option('syntheticScrollAmount')
        cb(is_up ? -delta : delta)
    }

    html_shell.the_root_element.addEventListener('click', try_scroll_Y)

    return () => {
        html_shell.the_root_element?.removeEventListener('click', try_scroll_Y)
    }
}