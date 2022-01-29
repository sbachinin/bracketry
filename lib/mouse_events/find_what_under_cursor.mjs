import { get_match_body_height } from '../utils/sizes.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

export const find_what_under_cursor = (e, rounds, scroll_X, options) => {
    if (!e.target.classList.contains(CANVAS_CLASS_NAME)) {
        return {}
    }
    const hovered_round = rounds.find((r, i) => {
        return (
            (scroll_X + e.offsetX) > r.left_X
            && (scroll_X + e.offsetX) < (r.left_X + r.width)
        )
    })

    const hovered_match = hovered_round?.matches.find(m => {
        return Math.abs(e.offsetY - m.center_Y) <= get_match_body_height(options)/1.3
    })

    let hovered_team = undefined
    if (hovered_match && e.offsetY < hovered_match.center_Y) {
        hovered_team = hovered_match.sides[0]
    }
    if (hovered_match && e.offsetY >= hovered_match.center_Y) {
        hovered_team = hovered_match.sides[1]
    }

    return {
        hovered_round,
        hovered_match,
        hovered_team
    }
}