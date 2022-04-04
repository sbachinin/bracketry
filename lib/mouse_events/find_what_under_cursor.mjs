import { get_match_body_height, get_match_center_Y } from '../utils/sizes.mjs'
import { find_mouse_position_within_element } from '../utils/utils.mjs'
import { MAIN_CANVAS_CLASS_NAME } from '../constants.mjs'

export const find_what_under_cursor = (e, all_data, state, options) => {
    if (!e.target.classList.contains(MAIN_CANVAS_CLASS_NAME)) {
        return {}
    }

    const cursor_position = find_mouse_position_within_element(e)
    
    const hovered_round_index = all_data.rounds.findIndex((r) => {
        return (
            cursor_position.x > r.static_left_X + options.match_hor_margin
            && cursor_position.x < (r.static_left_X + all_data.width_per_round - options.match_hor_margin)
        )
    })

    const hovered_round = all_data.rounds[hovered_round_index]

    let hovered_match_center_scroll_Y = null

    const hovered_match_index = hovered_round?.matches.findIndex((m, m_i) => {
        const match_center_scroll_Y = get_match_center_Y(all_data, hovered_round_index, m_i, state, options)
        if (Math.abs(cursor_position.y - match_center_scroll_Y) <= get_match_body_height(options)/2) {
            hovered_match_center_scroll_Y = match_center_scroll_Y
            return true
        }
    })

    const hovered_match = hovered_round?.matches[hovered_match_index]

    let hovered_team = undefined
    if (hovered_match && cursor_position.y < hovered_match_center_scroll_Y) {
        hovered_team = hovered_match.sides[0]
    }
    if (hovered_match && cursor_position.y >= hovered_match_center_scroll_Y) {
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