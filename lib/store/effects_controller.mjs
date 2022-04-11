import {
    UPDATE_CURSOR, UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW_MATCHES, UPDATE_VERT_BUTTONS_DISABLED_STATE,
    HANDLE_ANCHOR_ROUND
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_all = (state, old_state) => {
        if (state.hovered_team_id !== old_state.hovered_team_id) {
            all_effects[UPDATE_CURSOR]()
        }

        if (state.destination_scroll_Y !== old_state.destination_scroll_Y) {
            all_effects[UPDATE_VERT_BUTTONS_DISABLED_STATE]()
        }

        if (state.anchor_round_index !== old_state.anchor_round_index) {
            all_effects[HANDLE_ANCHOR_ROUND](state, old_state)
        }

        if (state.highlighted_team_id !== old_state.highlighted_team_id) {
            all_effects[FULL_REDRAW_MATCHES]()
        }

        if (state.window_recently_scrolled !== old_state.window_recently_scrolled) {
            all_effects[UPDATE_CANVAS_SCROLLABILITY]()
        }
    }

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all
    }
}