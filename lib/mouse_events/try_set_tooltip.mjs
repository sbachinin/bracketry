import { throttle, debounce } from '../utils/utils.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

const try_set_new_tooltip = debounce(
    (e, all_data, state, options, update_state) => {
        const {
            hovered_team, hovered_match
        } = find_what_under_cursor(e, all_data, state.scroll_X, state.scroll_Y, options)

        if (hovered_team
            && hovered_team.title !== hovered_team.title_to_display
        ) {
            // (mouse stopped at a team with collapsed title)
            update_state({ tooltip: {
                match_id: hovered_match.id,
                side_index: hovered_match.sides.findIndex(s => s.id === hovered_team.id),
                text: hovered_team.title
            }})
        } else {
            state.tooltip !== null && update_state({ tooltip: null })
        }
    },
    70
)

const try_unset_tooltip = throttle(
    (e, all_data, state, options, update_state) => {
        const { hovered_team } = find_what_under_cursor(e, all_data, state.scroll_X, state.scroll_Y, options)

        if (
            !hovered_team
            || hovered_team.title === hovered_team.title_to_display
        ) {
            // (mouse moves over a no-team or a team with fully shown title)
            state.tooltip !== null && update_state({ tooltip: null })
        }
    },
    500
)

export const try_set_tooltip = (
    e, all_data, state, options, update_state
) => {
    if (state.canvas_scrolled_recently) return
    if (!options.show_full_title_tooltip) return

    try_unset_tooltip(e, all_data, state, options, update_state)
    
    try_set_new_tooltip(e, all_data, state, options, update_state)
}