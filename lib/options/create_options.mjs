import { update_actual_options } from './update_actual_options.mjs'
import { get_default_options } from './get_default_options.mjs'

export const create_options = () => {
    const actual_options = { ...get_default_options() }
    return {
        actual_options,
        update_options: (user_options, data_summary) => update_actual_options(actual_options, user_options, data_summary)
    }
}