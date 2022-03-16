import { get_round_left_X } from '../utils/sizes.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'

export const animate_scroll_X_to_anchor_round = (all_data, store, main_canvas_el, options) => {
    const destination_scroll_X = store.state.scroll_X_anchor_round_index > 0
        ? Math.min(
            all_data.all_content_width - main_canvas_el.width,
            get_round_left_X(
                options,
                store.state.scroll_X_anchor_round_index,
                all_data.round_width,
            ) - options.distance_between_rounds/2
        )
        : 0

    animate_scroll({
        store,
        destination_scroll_X,
        duration: options.horizontal_scroll_duration
    })
}