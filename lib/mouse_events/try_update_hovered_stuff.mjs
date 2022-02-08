import { throttle_with_trailing } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_update_hovered_stuff = throttle_with_trailing((e, rounds, store, options) => {
    if (
        !options.highlight_team_history_on_click
        && !options.reduce_match_until_clicked
    ) return

    const {
        hovered_team, hovered_match
    } = find_what_under_cursor(e, rounds, store.state.scroll_X, store.state.scroll_Y, options)
    
    store.update_state({
        hovered_team_id: hovered_team ? hovered_team.id : null,
        hovered_match_id: hovered_match ? hovered_match.id : null
    })
}, 50)