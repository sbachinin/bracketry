import { UPDATE_CURSOR, SCROLL_X, HANDLE_NEW_ANCHOR_ROUND,
    REDRAW_ROUNDS, SCROLL_ON_HIGHLIGHT, REDRAW_HIGHLIGHT,
    REDRAW_HIGHLIGHTED_TITLES, UPDATE_VERT_BUTTONS_DISABLED_STATE,
    SCHEDULE_FORGET_SCROLL_Y
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_some = (...names) => names.forEach(name => all_effects[name]?.())

    const run_all = (state, old_state, force_redraw) => {
        if (state.hovered_team_id !== old_state.hovered_team_id
            || state.hovered_match_id !== old_state.hovered_match_id
        ) run_some(
            UPDATE_CURSOR
        )
    
        if (state.dragging !== old_state.dragging) run_some(
            UPDATE_CURSOR
        )
        
        if (state.scroll_X !== old_state.scroll_X) run_some(
            SCROLL_X,
            REDRAW_HIGHLIGHT,
            REDRAW_ROUNDS
        )
    
        if (state.scroll_Y !== old_state.scroll_Y) run_some(
            REDRAW_HIGHLIGHT,
            REDRAW_ROUNDS,
            SCHEDULE_FORGET_SCROLL_Y
        )
        
        if (state.destination_scroll_Y !== old_state.destination_scroll_Y) run_some(
            UPDATE_VERT_BUTTONS_DISABLED_STATE
        )
    
        if (state.scroll_X_anchor_round_index !== old_state.scroll_X_anchor_round_index) run_some(
            HANDLE_NEW_ANCHOR_ROUND
        )
    
        if (state.highlighted_team_id !== old_state.highlighted_team_id) run_some(
            REDRAW_HIGHLIGHT,
            SCROLL_ON_HIGHLIGHT,
            REDRAW_HIGHLIGHTED_TITLES
        )

        if (force_redraw) run_some(
            REDRAW_ROUNDS
        )
    }

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all
    }
}