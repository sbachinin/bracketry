import * as sizes from '../utils/sizes.mjs'

export const get_leftmost_index = scrollX => Math.abs(Math.floor(scrollX / sizes.ROUND_WIDTH))