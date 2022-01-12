import { get_match_body_height } from '../utils/sizes.mjs'

export const get_hovered_match = (e, all_data, state, options) => {
    const hovered_round = all_data.rounds.find((r, i) => {
        return (
            (state.scroll_X + e.offsetX) > r.left_X
            && (state.scroll_X + e.offsetX) < (r.left_X + r.width)
        )
    })

    return hovered_round?.matches.find(m => {
        return Math.abs(e.offsetY - m.center_Y) <= get_match_body_height(options)
    })
}