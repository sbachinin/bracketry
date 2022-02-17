import { UPDATE_CURSOR, SCROLL, SCROLL_X, HANDLE_NEW_ANCHOR_ROUND,
    REDRAW_ROUNDS, REDRAW_EXPANDED_MATCHES, ANIMATE_EXPANDED_MATCH_CHANGE,
    SCROLL_ON_HIGHLIGHT, REDRAW_HIGHLIGHT, UPDATE_VERT_BUTTONS_DISABLED_STATE
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_some = (...names) => names.forEach(name => all_effects[name]?.())

    const run_all = (state, old_state, force_redraw) => {
        if (state.hovered_team_id !== old_state.hovered_team_id
            || state.hovered_match_id !== old_state.hovered_match_id
        ) run_some(
            UPDATE_CURSOR,
            REDRAW_HIGHLIGHT
        )
    
        if (state.dragging !== old_state.dragging) run_some(
            UPDATE_CURSOR
        )
    
        if (state.expanded_match?.id !== old_state.expanded_match?.id) run_some(
            UPDATE_CURSOR,
            REDRAW_EXPANDED_MATCHES,
            ANIMATE_EXPANDED_MATCH_CHANGE,
        )
        
        if (state.scroll_X !== old_state.scroll_X) run_some(
            SCROLL,
            SCROLL_X,
            REDRAW_EXPANDED_MATCHES,
            REDRAW_HIGHLIGHT,
            REDRAW_ROUNDS
        )
    
        if (state.scroll_Y !== old_state.scroll_Y) run_some(
            SCROLL,
            REDRAW_EXPANDED_MATCHES,
            REDRAW_HIGHLIGHT,
            REDRAW_ROUNDS
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
            REDRAW_EXPANDED_MATCHES
        )
        
        if (state.expanded_match_opacity !== old_state.expanded_match_opacity) run_some(
            REDRAW_EXPANDED_MATCHES
        )
    
        if (JSON.stringify(state.tooltip) !== JSON.stringify(old_state.tooltip)) run_some(
            REDRAW_ROUNDS
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