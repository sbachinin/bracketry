export const CURSOR_EFFECT_NAME = 'cursor'
export const SCROLL_X_EFFECT_NAME = 'scroll_X'
export const ANCHOR_SCROLL_ROUND_EFFECT_NAME = 'anchor_scroll_round'
export const REDRAW_EFFECT_NAME = 'redraw'

const run_effects = (state, old_state, force_redraw, effects) => {
    if (state.cursor !== old_state.cursor) effects[CURSOR_EFFECT_NAME]?.()
    
    if (state.scroll_X !== old_state.scroll_X) effects[SCROLL_X_EFFECT_NAME]?.()

    if (state.scroll_X_anchor_round_index !== old_state.scroll_X_anchor_round_index) {
        effects[ANCHOR_SCROLL_ROUND_EFFECT_NAME]?.()
    }

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.expanded_match?.id !== old_state.expanded_match?.id
        || state.expanded_match_opacity !== old_state.expanded_match_opacity
        || state.highlighted_team_id !== old_state.highlighted_team_id
        || JSON.stringify(state.tooltip) !== JSON.stringify(old_state.tooltip)
        || force_redraw
    ) {
        effects[REDRAW_EFFECT_NAME]?.()
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