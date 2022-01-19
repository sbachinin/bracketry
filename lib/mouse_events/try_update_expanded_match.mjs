import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { debounce } from '../utils/utils.mjs'

const switch_expanded_match = (e, rounds, state, options, update_state) => {
    const expanded_match_id = find_what_under_cursor(e, rounds, state.scroll_X, options).hovered_match?.id
    if (expanded_match_id === state.expanded_match_id) return
    update_state({
        expanded_match_id,
        previous_expanded_match_id: state.expanded_match_id
    })
    animate_with_easing({
        type: 'fade_expanded_match',
        handle_new_value: easing_value => {
            update_state({ expanded_match_opacity: easing_value })
        },
        duration: 200
    })
}

export const try_update_expanded_match = debounce((
    e, rounds, state, options, update_state
) => {
    if (!options.reduce_match_until_hovered
        || state.canvas_scrolled_recently
    ) return

    switch_expanded_match(e, rounds, state, options, update_state)

}, 70)