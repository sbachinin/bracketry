import {
    UPDATE_HIGHLIGHT,
} from '../effects/names.mjs'

export const create_effects = () => {
    const all_effects = {}

    const run_all = (state, old_state) => {
        if (state.highlighted_contestant_id !== old_state.highlighted_contestant_id) {
            all_effects[UPDATE_HIGHLIGHT]()
        }
    }

    return {
        set: effects => Object.assign(all_effects, effects),
        run_all
    }
}