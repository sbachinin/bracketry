import { throttle_with_trailing } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_update_cursor = throttle_with_trailing((
    e, rounds, scroll_X, scroll_Y, options, handle_cursor_change
) => {
    const { hovered_match } = find_what_under_cursor(e, rounds, scroll_X, scroll_Y, options)

    let cursor = 'auto'

    if (options.horizontal_scroll_triggered_by === 'drag'
        || options.vertical_scroll_triggered_by === 'drag'
    ) {
        cursor = 'grab'
    }

    if ((options.reduce_match_until_clicked || options.highlight_team_history_on_click)
        && hovered_match
    ) {
        cursor = 'pointer'
    }

    handle_cursor_change(cursor)
}, 50)