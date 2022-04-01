import { get_main_canvas } from '../utils/utils.mjs'

export const get_max_scroll_round_index = (all_data, options) => {
    const width_deficit = all_data.width_per_round * all_data.rounds.length - get_main_canvas().width

    let max_leftmost_round_index = all_data.rounds.findIndex(
        r => (r.static_left_X - options.match_hor_margin) > width_deficit)
    
    if (max_leftmost_round_index === -1) max_leftmost_round_index = all_data.rounds.length
    
    return max_leftmost_round_index
}