import {
    UPDATE_CURSOR, UPDATE_CANVAS_SCROLLABILITY,
    FULL_REDRAW_MATCHES, UPDATE_VERT_BUTTONS_DISABLED_STATE,
    SCROLL_LEFT, SCROLL_RIGHT
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_some = (...names) => names.forEach(name => all_effects[name]?.())

    const run_all = (state, old_state) => {
        if (state.hovered_team_id !== old_state.hovered_team_id) run_some(
            UPDATE_CURSOR
        )

        if (state.destination_scroll_Y !== old_state.destination_scroll_Y) run_some(
            UPDATE_VERT_BUTTONS_DISABLED_STATE
        )

        if (state.scroll_X_anchor_round_index > old_state.scroll_X_anchor_round_index) run_some(
            SCROLL_RIGHT
        )

        if (state.scroll_X_anchor_round_index < old_state.scroll_X_anchor_round_index) run_some(
            SCROLL_LEFT
        )

        if (state.highlighted_team_id !== old_state.highlighted_team_id) run_some(
            FULL_REDRAW_MATCHES
        )

        if (state.window_recently_scrolled !== old_state.window_recently_scrolled) run_some(
            UPDATE_CANVAS_SCROLLABILITY
        )
    }

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all
    }
}