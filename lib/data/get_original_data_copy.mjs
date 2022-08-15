import { deep_clone_object } from '../utils.mjs'

export const get_original_data_copy = (all_data) => {
    const data_clone = deep_clone_object(all_data)
    const result = { rounds: data_clone.rounds }
    if (data_clone.matches) {
        result.matches = data_clone.matches
    }
    if (data_clone.contestants) {
        result.contestants = data_clone.contestants
    }
    return result
}