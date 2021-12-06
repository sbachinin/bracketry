import * as sizes from '../utils/sizes.mjs'

export const get_leftmost_fully_visible_round_index = scrollX => Math.ceil(Math.abs(scrollX / sizes.ROUND_WIDTH))