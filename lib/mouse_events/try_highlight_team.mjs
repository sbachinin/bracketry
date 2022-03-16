import { debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_highlight_team = debounce(
    (e, all_data, store, options) => {
        const { hovered_team } = find_what_under_cursor(
            e, all_data, store.state.scroll_X, store.state.scroll_Y, options
        )
        store.update_state({
            highlighted_team_id: hovered_team ? hovered_team.id : null
        })
    },
    70
)