import { create_effects } from './effects_controller.mjs'
import { get_adjusted_update } from './adjust_update.mjs'
import { default_state } from './default_state.mjs'

export const create_store = (options) => {
    let effects_controller = create_effects()

    const state = JSON.parse(JSON.stringify(default_state))

    const update_state = (update = {}, force_redraw = false) => {
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, get_adjusted_update(old_state, update, options))
        effects_controller.run_all(state, old_state, force_redraw)
    }

    return {
        state,
        update_state,
        update_some_props: () => {},
        set_effects: effects => { effects_controller.set(effects) }
    }
}