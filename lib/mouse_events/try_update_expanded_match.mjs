import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { debounce } from '../utils/utils.mjs'

const switch_expanded_match = (e, rounds, store, options) => {
    const {
        hovered_round,
        hovered_round_index,
        hovered_match,
        hovered_match_index
    } = find_what_under_cursor(e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

    if (hovered_match.id === store.state.expanded_match?.id) return
    
    const update = {
        expanded_match: {
            ...hovered_match,
            index: hovered_match_index,
            round_left_X: hovered_round.left_X,
            round_index: hovered_round_index
        },
        previous_expanded_match: store.state.expanded_match,
        expanded_match_opacity: 0
    }

// expand with or without animation, depending on 'history click' option
    if (options.highlight_team_history_on_click) {
        update.expanded_match_opacity = 1
    } else {
        animate_with_easing({
            type: 'fade_expanded_match',
            handle_new_value: easing_value => {
                store.update_state({ expanded_match_opacity: easing_value })
            },
            duration: 200
        })
    }

    store.update_state(update)
}

export const try_update_expanded_match = debounce((
    e, rounds, store, options
) => {
    if (store.state.canvas_scrolled_recently) return
    switch_expanded_match(e, rounds, store, options)
}, 70)
