import { debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { get_expanded_match_props } from '../draw/draw_expanded_match.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'

const switch_expanded_match = (e, rounds, store, options, canvas_width) => {
    const {
        hovered_round,
        hovered_round_index,
        hovered_match,
        hovered_match_index
    } = find_what_under_cursor(e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

    if (hovered_match?.id === store.state.expanded_match?.id) return
    
// scroll if expanded match isn't fully visible
    if (e.type === 'mouseup' && hovered_match) { // dont' scroll when trying to expand on HOVER
        const {
            expanded_width, expanded_left_X
        } = get_expanded_match_props(hovered_round, hovered_match, store.state, options)
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

    store.update_state({
        expanded_match: !hovered_match ? null : {
            ...hovered_match,
            index: hovered_match_index,
            round_index: hovered_round_index
        },
        expanded_match_opacity: 0
    })
}

export const try_update_expanded_match = debounce((
    e, rounds, store, options, canvas_width
) => {
    if (e.type === 'mousemove' && store.state.canvas_scrolled_recently) return
    switch_expanded_match(e, rounds, store, options, canvas_width)
}, 70)
