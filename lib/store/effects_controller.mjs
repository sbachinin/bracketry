import { UPDATE_CURSOR, SCROLL, SCROLL_X, HANDLE_NEW_ANCHOR_ROUND,
    REDRAW_ROUNDS, REDRAW_EXPANDED_MATCHES, ANIMATE_EXPANDED_MATCH_CHANGE,
    SCROLL_ON_HIGHLIGHT, REDRAW_HIGHLIGHT
} from '../effects/names.mjs'

const run_effects = (state, old_state, force_redraw, all_effects) => {
    if (state.hovered_team_id !== old_state.hovered_team_id
        || state.hovered_match_id !== old_state.hovered_match_id
        || state.dragging !== old_state.dragging
        || state.expanded_match?.id !== old_state.expanded_match?.id
    ) {
        all_effects[UPDATE_CURSOR]?.()
    } 
    
    if (state.scroll_X !== old_state.scroll_X) all_effects[SCROLL_X]?.()

    if (state.scroll_X_anchor_round_index !== old_state.scroll_X_anchor_round_index) {
        all_effects[HANDLE_NEW_ANCHOR_ROUND]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
    ) {
        all_effects[SCROLL]?.()
    }

    if (state.highlighted_team_id !== old_state.highlighted_team_id) {
        all_effects[SCROLL_ON_HIGHLIGHT]?.()
    }
    
    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.expanded_match?.id !== old_state.expanded_match?.id
        || state.expanded_match_opacity !== old_state.expanded_match_opacity
        || state.highlighted_team_id !== old_state.highlighted_team_id
    ) {
        all_effects[REDRAW_EXPANDED_MATCHES]?.()
    }

    if (state.expanded_match?.id !== old_state.expanded_match?.id) {
        all_effects[ANIMATE_EXPANDED_MATCH_CHANGE]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.highlighted_team_id !== old_state.highlighted_team_id
        || state.hovered_team_id !== old_state.hovered_team_id
        || state.hovered_match_id !== old_state.hovered_match_id
    ) {
        all_effects[REDRAW_HIGHLIGHT]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || JSON.stringify(state.tooltip) !== JSON.stringify(old_state.tooltip)
        || force_redraw
    ) {
        all_effects[REDRAW_ROUNDS]?.()
    }
}

export const create_effects = () => {
    const all_effects = {}

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all: (state, old_state, force_redraw) => {
            run_effects(state, old_state, force_redraw, all_effects)
        }
    }
}