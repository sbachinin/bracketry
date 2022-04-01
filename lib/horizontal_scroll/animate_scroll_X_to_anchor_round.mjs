import { animate_scroll } from '../utils/animate_scroll.mjs'

export const animate_scroll_X_to_anchor_round = (all_data, store, main_canvas_el, options) => {
    const destination_scroll_X = store.state.scroll_X_anchor_round_index > 0
        ? Math.min(
            all_data.width_per_round * all_data.rounds.length - main_canvas_el.width,
            all_data.rounds[store.state.scroll_X_anchor_round_index].static_left_X
        )
        : 0

    animate_scroll({
        store,
        destination_scroll_X,
        duration: options.horizontal_scroll_duration
    })
}