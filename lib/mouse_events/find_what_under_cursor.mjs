import { get_match_body_height, get_match_center_scroll_Y } from '../utils/sizes.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

export const find_what_under_cursor = (e, rounds, scroll_X, scroll_Y, options) => {
    if (!e.target.classList.contains(CANVAS_CLASS_NAME)) {
        return {}
    }
    const hovered_round_index = rounds.findIndex((r, i) => {
        return (
            (scroll_X + e.offsetX) > r.left_X
            && (scroll_X + e.offsetX) < (r.left_X + r.width)
        )
    })

    const hovered_round = rounds[hovered_round_index]

    let hovered_match_center_scroll_Y = null

    const hovered_match_index = hovered_round?.matches.findIndex((m, m_i) => {
        const match_center_scroll_Y = get_match_center_scroll_Y(hovered_round, scroll_Y, m_i, options)
        if (Math.abs(e.offsetY - match_center_scroll_Y) <= get_match_body_height(options)/2) {
            hovered_match_center_scroll_Y = match_center_scroll_Y
            return true
        }
    })

    const hovered_match = hovered_round?.matches[hovered_match_index]

    let hovered_team = undefined
    if (hovered_match && e.offsetY < hovered_match_center_scroll_Y) {
        hovered_team = hovered_match.sides[0]
    }
    if (hovered_match && e.offsetY >= hovered_match_center_scroll_Y) {
        hovered_team = hovered_match.sides[1]
    }

    return {
        hovered_round,
        hovered_round_index,
        hovered_match,
        hovered_match_index,
        hovered_team
    }
}