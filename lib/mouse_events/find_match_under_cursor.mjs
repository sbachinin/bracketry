import { get_match_body_height } from '../utils/sizes.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

export const find_match_under_cursor = (e, rounds, scroll_X, options) => {
    if (!e.target.classList.contains(CANVAS_CLASS_NAME)) {
        return
    }
    const hovered_round = rounds.find((r, i) => {
        return (
            (scroll_X + e.offsetX) > r.left_X
            && (scroll_X + e.offsetX) < (r.left_X + r.width)
        )
    })

    return hovered_round?.matches.find(m => {
        return Math.abs(e.offsetY - m.center_Y) <= get_match_body_height(options)
    })
}