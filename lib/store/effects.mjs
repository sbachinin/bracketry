export const CURSOR = 'cursor'
export const SCROLL = 'scroll'
export const SCROLL_X = 'scroll_X'
export const SCROLL_TO_NEW_ANCHOR_ROUND = 'anchor_scroll_round'
export const REDRAW_ALL = 'redraw_all'
export const REDRAW_EXPANDED_MATCHES = 'redraw_expanded_matches'
export const ANIMATE_EXPANDED_MATCH_CHANGE = 'animate_expanded_match_change'

const run_effects = (state, old_state, force_redraw, effects) => {
    if (state.cursor !== old_state.cursor) effects[CURSOR]?.()
    
    if (state.scroll_X !== old_state.scroll_X) effects[SCROLL_X]?.()

    if (state.scroll_X_anchor_round_index !== old_state.scroll_X_anchor_round_index) {
        effects[SCROLL_TO_NEW_ANCHOR_ROUND]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
    ) {
        effects[SCROLL]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.expanded_match?.id !== old_state.expanded_match?.id
        || state.expanded_match_opacity !== old_state.expanded_match_opacity
        || state.highlighted_team_id !== old_state.highlighted_team_id
    ) {
        effects[REDRAW_EXPANDED_MATCHES]?.()
    }

    if (state.expanded_match?.id !== old_state.expanded_match?.id) {
        effects[ANIMATE_EXPANDED_MATCH_CHANGE]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.highlighted_team_id !== old_state.highlighted_team_id
        || JSON.stringify(state.tooltip) !== JSON.stringify(old_state.tooltip)
        || force_redraw
    ) {
        effects[REDRAW_ALL]?.()
    }
}

export const create_effects = () => {
    const effects = {}

    return {
        set_effect: (name, cb) => effects[name] = cb,
        run_all: (state, old_state, force_redraw) => {
            run_effects(state, old_state, force_redraw, effects)
        }
    }
}