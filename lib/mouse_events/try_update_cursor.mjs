import { throttle } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_update_cursor = throttle((
    e, rounds, scroll_X, options, handle_cursor_pointer_change
) => {
    const { hovered_match, hovered_team } = find_what_under_cursor(e, rounds, scroll_X, options)
    if (options.reduce_match_until_clicked) {
        if (hovered_match) {
            handle_cursor_pointer_change(true)
        } else {
            handle_cursor_pointer_change(false)
        }
    }
    /* if (options.highlight_match_on_click) {

    } */
}, 50)