import { debounce } from '../utils/utils.mjs'
import { SCROLL_EFFECT_NAME, create_effects } from './effects.mjs'
import { get_adjusted_update } from './adjust_update.mjs'

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
})

export const create_store = () => {

    let effects = create_effects()

    const props_to_reset_on_full_update = {
        expanded_match: null,
        previous_expanded_match: null,
        expanded_match_opacity: 0,
        canvas_scrolled_recently: false,
        cursor: 'auto',
        highlighted_team_id: undefined,
        tooltip: null,

        dragging: false, drag_start_scroll_coords: [], drag_start_mouse_coords: []
    }

    const state = {
        scroll_Y: 0,
        destination_scroll_Y: undefined,
        scroll_X: 0,
        scroll_X_anchor_round_index: 0,
        destination_scroll_X: undefined,
        ...props_to_reset_on_full_update
    }

    const update_state = (update = {}, force_redraw = false) => {
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, get_adjusted_update(old_state, update))
        effects.run_all(state, old_state, force_redraw)
    }

    effects.set_effect(SCROLL_EFFECT_NAME, () => schedule_forget_scroll(update_state))

    return {
        state,
        update_state,
        reset_some_props: () => Object.assign(state, props_to_reset_on_full_update),
        on_update: (type, cb) => { effects.set_effect(type, cb) }
    }
}