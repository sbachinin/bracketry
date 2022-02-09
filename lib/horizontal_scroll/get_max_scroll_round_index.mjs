import { get_main_canvas } from '../utils/utils.mjs'

export const get_max_scroll_round_index = (all_data, options) => {
    const width_deficit = all_data.all_content_width - get_main_canvas().width

    let max_leftmost_round_index = all_data.rounds.findIndex(
        r => (r.left_X - options.distance_between_rounds/2) > width_deficit)
    
    if (max_leftmost_round_index === -1) max_leftmost_round_index = all_data.rounds.length
    
    return max_leftmost_round_index
}