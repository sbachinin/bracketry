import { create_effects } from './effects_controller.mjs'
import { default_state } from './default_state.mjs'
import { deep_clone_object } from '../utils/utils.mjs'

export const create_store = () => {
    let effects_controller = create_effects()

    const state = deep_clone_object(default_state)

    const update_state = (update = {}) => {
        const old_state = deep_clone_object(state)
        Object.assign(state, update)
        effects_controller.run_all(state, old_state)
    }

    return {
        state,
        update_state,
        set_effects: effects => { effects_controller.set(effects) }
    }
}