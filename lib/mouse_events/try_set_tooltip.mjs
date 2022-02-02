import { throttle, debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

const try_set_new_tooltip = debounce(
    (hovered_match, hovered_team, state, update_state) => {
        if (hovered_team
            && hovered_team.short_title !== hovered_team.title_to_display
        ) {
            // (mouse stopped at a team with collapsed title)
            update_state({ tooltip: {
                match_id: hovered_match.id,
                side_index: hovered_match.sides.findIndex(s => s.id === hovered_team.id)
            }})
        } else {
            state.tooltip !== null && update_state({ tooltip: null })
        }
    },
    70
)

const try_unset_tooltip = throttle(
    (hovered_team, state, update_state) => {
        if (
            !hovered_team
            || hovered_team.short_title === hovered_team.title_to_display
        ) {
            // (mouse moves over a no-team or a team with fully shown title)
            state.tooltip !== null && update_state({ tooltip: null })
        }
    },
    500
)

export const try_set_tooltip = (
    e, rounds, state, options, update_state
) => {
    if (state.canvas_scrolled_recently) return

    const {
        hovered_team, hovered_match
    } = find_what_under_cursor(e, rounds, state.scroll_X, state.scroll_Y, options)

    try_unset_tooltip(hovered_team, state, update_state)
    
    try_set_new_tooltip(hovered_match, hovered_team, state, update_state)
}