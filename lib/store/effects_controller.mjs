import {
    UPDATE_MATCHES_SCROLLABILITY,
    handle_navigation,
    UPDATE_HIGHLIGHT,
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_all = (state, old_state) => {
        if (state.highlighted_contestant_id !== old_state.highlighted_contestant_id) {
            all_effects[UPDATE_HIGHLIGHT]()
        }

        if (state.window_recently_scrolled !== old_state.window_recently_scrolled) {
            all_effects[UPDATE_MATCHES_SCROLLABILITY]()
        }
    }

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all
    }
}