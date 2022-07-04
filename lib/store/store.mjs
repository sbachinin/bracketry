import { default_state } from './default_state.mjs'
import { deep_clone_object } from '../utils/utils.mjs'

export const create_store = () => {

    const state = deep_clone_object(default_state)

    const update_state = (update = {}) => {
        Object.assign(state, update)
    }

    return {
        state,
        update_state,
    }
}