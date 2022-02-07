import { throttle, debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const set_new_expanded_match = (e, rounds, store, options) => {
    const {
        hovered_round_index,
        hovered_match,
        hovered_match_index
    } = find_what_under_cursor(
        e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

    if (hovered_match?.id === store.state.expanded_match?.id) return

    store.update_state({
        expanded_match: !hovered_match ? null : {
            ...hovered_match,
            index: hovered_match_index,
            round_index: hovered_round_index
        },
        expanded_match_opacity: options.animate_match_expand ? 0 : 1
    })
}

const debounced_set_new_expanded_match = debounce(set_new_expanded_match, 70)

const unset_expanded_match = throttle(
    (e, rounds, store, options) => {
        const { hovered_match } = find_what_under_cursor(
            e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

        if (hovered_match?.id !== store.state.expanded_match?.id) {
            store.state.expanded_match !== null && store.update_state({ expanded_match: null })
        }
    },
    500
)

export const update_expanded_match_on_mousemove = (
    e, rounds, store, options
) => {
    if (store.state.canvas_scrolled_recently) return
    unset_expanded_match(e, rounds, store, options)
    debounced_set_new_expanded_match(e, rounds, store, options)
}
