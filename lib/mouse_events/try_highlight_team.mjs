import { debounce } from '../utils/utils.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { scroll_Y_to_round1_highlighted_match } from './scroll_Y_to_round1_highlighted_match.mjs'

export const try_highlight_team = debounce(
    (e, rounds, store, options, canvas_height) => {
        const highlighted_team_id = find_what_under_cursor(e, rounds, store.state.scroll_X, options).hovered_team?.id
        if (highlighted_team_id === store.state.highlighted_team_id) return

        scroll_Y_to_round1_highlighted_match(highlighted_team_id, rounds, store, options, canvas_height)

        store.update_state({ highlighted_team_id })
    },
    70
)