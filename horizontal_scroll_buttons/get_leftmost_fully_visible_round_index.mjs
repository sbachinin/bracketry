import * as constants from '../utils/constants.mjs'

export const get_leftmost_fully_visible_round_index = scrollX => Math.ceil(Math.abs(scrollX / constants.ROUND_WIDTH))