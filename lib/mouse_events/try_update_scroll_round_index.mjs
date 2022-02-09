import { within_range, get_main_canvas } from '../utils/utils.mjs'

const get_new_anchor_index = (
    change,
    rounds,
    width_deficit,
    options,
    store
) => {
    let max_leftmost_round_index = rounds.findIndex(
        r => (r.left_X - options.distance_between_rounds/2) > width_deficit)
    if (max_leftmost_round_index === -1) max_leftmost_round_index = rounds.length

    return within_range(
        store.state.scroll_X_anchor_round_index + change,
        0,
        max_leftmost_round_index
    )
}

export const try_update_scroll_round_index = (change, all_data, store, options) => {
    const width_deficit = all_data.all_content_width - get_main_canvas().width
    store.update_state({
        scroll_X_anchor_round_index: get_new_anchor_index(
            change, all_data.rounds, width_deficit, options, store)
        })
}