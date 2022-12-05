import { update_highlight } from './highlight.mjs'


const get_match_data_for_element = (el, all_data) => {
    const round_index = +el.closest('.round-wrapper')?.getAttribute('round-index')
    const match_order = +el.closest('.match-wrapper')?.getAttribute('match-order')
    return all_data.matches?.find(m => {
        return m.roundIndex === round_index && m.order === match_order
    }) || { roundIndex: +round_index, order: +match_order }
}


export const install_ui_events = (
    all_data,
    get_option,
    html_shell,
    navigation,
    uninstall_playoffs
) => {

    const { the_root_element, fullscreen_wrapper, matches_positioner } = html_shell


    const exit_fullscreen = () => {
        fullscreen_wrapper && (fullscreen_wrapper.style.opacity = 0)
        setTimeout(uninstall_playoffs, 150)
    }

    const handle_fullscreen_click = (e) => {
        if (!e.target.closest('.playoffs-root')) {
            exit_fullscreen()
        }
    }

    const handle_root_click = e => {
        if (e.button !== 0) return

        if (e.target.closest('.navigation-button')) {
            navigation.handle_click(e.target.closest('.navigation-button'))
            return
        }

    // on match click
        if (get_option('onMatchClick') !== null) {
            if (e.target.classList.contains('match-body')) {
                const match_data = get_match_data_for_element(e.target, all_data)
                get_option('onMatchClick')(match_data)
            }
            return
        }

    // on side click
        if (get_option('onMatchSideClick') !== null) {
            const side_wrapper = e.target.closest('.side-wrapper')
            if (side_wrapper) {
                const match_data = get_match_data_for_element(e.target, all_data)
                let side_index = 1
                if (side_wrapper === e.target.closest('.side-wrapper:first-child')) {
                    side_index = 0
                }
                get_option('onMatchSideClick')(match_data, side_index)
            }
            return
        }

    // default: highlight team history
        if (e.target.closest('.matches-positioner')) {
            if (
                get_option('disableHighlight') !== true
                && e.target.closest('.side-wrapper[contestant-id]')
            ) {
                update_highlight(
                    matches_positioner,
                    e.target.closest('.side-wrapper').getAttribute('contestant-id')
                )
            } else {
                update_highlight(matches_positioner, null)
            }
        }
    }






    const exit_fullscreen_on_esc = (e) => {
        if (get_option('fullscreen') === true && e.key === 'Escape') {
            exit_fullscreen()
        }
    }

    fullscreen_wrapper?.addEventListener('click', handle_fullscreen_click)    
    the_root_element.addEventListener('click', handle_root_click)
    window.addEventListener('keydown', exit_fullscreen_on_esc)


    const uninstall = () => {
        fullscreen_wrapper?.removeEventListener('click', handle_fullscreen_click)    
        the_root_element?.removeEventListener('click', handle_root_click)
        window.removeEventListener('keydown', exit_fullscreen_on_esc)
    }

    return { uninstall }
}
