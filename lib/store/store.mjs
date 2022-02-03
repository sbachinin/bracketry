import { debounce } from '../utils/utils.mjs'
import { SCROLL, create_effects } from './effects.mjs'
import { get_adjusted_update } from './adjust_update.mjs'
import { props_to_reset_on_full_update, default_state } from './default_state.mjs'

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
})

export const create_store = (options) => {
    let effects = create_effects()

    const state = JSON.parse(JSON.stringify(default_state))

    const update_state = (update = {}, force_redraw = false) => {
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, get_adjusted_update(old_state, update, options))
        effects.run_all(state, old_state, force_redraw)
    }

    effects.set_effect(SCROLL, () => schedule_forget_scroll(update_state))

    return {
        state,
        update_state,
        reset_some_props: () => Object.assign(state, props_to_reset_on_full_update),
        on_update: (type, cb) => { effects.set_effect(type, cb) }
    }
}