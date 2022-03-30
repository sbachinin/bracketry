import { throttle_with_trailing, get_main_canvas } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_update_hovered_team = throttle_with_trailing((e, all_data, store, options) => {
    if (e.target !== get_main_canvas()) return
    if (!options.highlight_team_history_on_click) return

    const { hovered_team } = find_what_under_cursor(
        e, all_data, store.state.scroll_X, store.state.scroll_Y, options)
    store.update_state({
        hovered_team_id: hovered_team ? hovered_team.id : null,
    })
}, 50)