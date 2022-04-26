import { create_effects } from './effects_controller.mjs'
import { get_adjusted_update } from './adjust_update.mjs'
import { default_state } from './default_state.mjs'
import { deep_clone_object } from '../utils/utils.mjs'


// must find the latest contentful round (with defined matches and teams)
// and adjust anchor index to push l.c.round to the right edge of visible area
const get_initial_anchor_index = (all_data) => {
    const first_sideless_round_index = all_data.rounds.findIndex(
        r => !Array.isArray(r.matches) || !r.matches.find(
            m => Array.isArray(m.sides) && m.sides.find(s => s !== undefined)
        )
    )

    if (first_sideless_round_index === -1) {
        return 0
    }

    return all_data.rounds.length - first_sideless_round_index
}


export const create_store = (options, all_data) => {
    let effects_controller = create_effects()

    const state = {
        ...deep_clone_object(default_state),
        anchor_round_last_index: get_initial_anchor_index(all_data)
    }

    const update_state = (update = {}) => {
        const old_state = deep_clone_object(state)
        Object.assign(state, get_adjusted_update(old_state, update, options))
        effects_controller.run_all(state, old_state)
    }

    const update_some_props = options => {
        if (!options.highlight_team_history_on_click) { state.highlighted_team_id = null}
    }

    return {
        state,
        update_state,
        update_some_props,
        set_effects: effects => { effects_controller.set(effects) }
    }
}