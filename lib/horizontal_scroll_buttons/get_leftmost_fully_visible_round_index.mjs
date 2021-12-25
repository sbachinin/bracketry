import * as constants from '../utils/constants.mjs'

export const get_leftmost_fully_visible_round_index = scrollX => {
    const outscrolled_rounds_count = Math.abs(scrollX / constants.ROUND_WIDTH)
    // if the leftmost round is hidden by less then 10%, consider it fully visible
    if (outscrolled_rounds_count % 1 < 0.1) {
        return Math.floor(Math.abs(scrollX / constants.ROUND_WIDTH))
    }
    return Math.ceil(Math.abs(scrollX / constants.ROUND_WIDTH))
}