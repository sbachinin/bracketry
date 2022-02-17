import { get_expanded_match_props } from '../draw/draw_expanded_match.mjs'

// scroll if expanded match isn't fully visible
export const maybe_scrollX_to_expanded_match = (rounds, options, store, canvas_width) => {
    if (!options.reduce_match_until_clicked) return
    if (options.horizontal_scroll_triggered_by !== 'buttons') return
    if (store.state.expanded_match === null) return
    
    const round = rounds[store.state.expanded_match.round_index]
    const {
        expanded_width, expanded_left_X
    } = get_expanded_match_props(round, store.state.expanded_match, store.state, options)
    const left_deficit = -(expanded_left_X)
    const right_deficit = expanded_left_X + expanded_width - canvas_width
    if (left_deficit > 20) {
        store.update_state({
            scroll_X_anchor_round_index: store.state.scroll_X_anchor_round_index - 1
        })
    }
    if (right_deficit > 20) {
        store.update_state({
            scroll_X_anchor_round_index: store.state.scroll_X_anchor_round_index + 1
        })
    }
}