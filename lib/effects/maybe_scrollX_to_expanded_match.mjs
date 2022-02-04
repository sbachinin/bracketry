import { get_expanded_match_props } from '../draw/draw_expanded_match.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'

export const maybe_scrollX_to_expanded_match = (rounds, options, store, canvas_width) => {
    // scroll if expanded match isn't fully visible
    // dont' scroll when trying to expand on HOVER
    if (options.reduce_match_until_clicked && store.state.expanded_match !== null) {
        const round = rounds[store.state.expanded_match.round_index]
        const {
            expanded_width, expanded_left_X
        } = get_expanded_match_props(round, store.state.expanded_match, store.state, options)
        const left_deficit = -(expanded_left_X - 10)
        const right_deficit = expanded_left_X + expanded_width + 10 - canvas_width
        if (left_deficit > 0 || right_deficit > 0) {
            animate_scroll({
                store,
                destination_scroll_X: left_deficit > 0
                    ? store.state.scroll_X - left_deficit
                    : store.state.scroll_X + right_deficit,
                duration: options.horizontal_scroll_duration
            })
        }
    }

}