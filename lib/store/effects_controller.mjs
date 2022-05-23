import {
    UPDATE_CANVAS_SCROLLABILITY,
    HANDLE_ROUND_INDEX,
    HIGHLIGHT_SIDE_TITLES,
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_all = (state, old_state) => {
        if (state.anchor_round_index !== old_state.anchor_round_index) {
            all_effects[HANDLE_ROUND_INDEX]()
        }

        if (state.highlighted_contestant_id !== old_state.highlighted_contestant_id) {
            all_effects[HIGHLIGHT_SIDE_TITLES]()
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