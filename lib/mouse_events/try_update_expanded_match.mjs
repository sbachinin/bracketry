import { debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const try_update_expanded_match = debounce((
    e, rounds, store, options
) => {
    if (e.type === 'mousemove' && store.state.canvas_scrolled_recently) return

    const {
        hovered_round_index,
        hovered_match,
        hovered_match_index
    } = find_what_under_cursor(e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

    if (hovered_match?.id === store.state.expanded_match?.id) return

    store.update_state({
        expanded_match: !hovered_match ? null : {
            ...hovered_match,
            index: hovered_match_index,
            round_index: hovered_round_index
        },
        expanded_match_opacity: 0
    })
}, 70)
