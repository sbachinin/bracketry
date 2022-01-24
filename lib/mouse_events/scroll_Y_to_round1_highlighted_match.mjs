import { get_round_title_height } from '../utils/sizes.mjs'
import { animate_scroll_Y } from './animate_scroll_Y.mjs'

export const scroll_Y_to_round1_highlighted_match = (
    highlighted_team_id,
    rounds,
    scroll_Y,
    options,
    update_state,
    canvas_height
) => {
    if (highlighted_team_id === undefined) return

    const round1_highlighted_match = rounds[0].matches.find(m => m.sides.find(s => s.id === highlighted_team_id))
    
    let destination_scroll_Y = null

    if (round1_highlighted_match.center_Y < get_round_title_height(options)) {
        destination_scroll_Y = (
            scroll_Y
            + (round1_highlighted_match.center_Y - get_round_title_height(options) - options.min_height_per_match/2) // invisibility depth in px
                / rounds[0].height_deficit * 100
        )
    }

    if ((round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom) > canvas_height) {
        destination_scroll_Y = (
            scroll_Y
            + (round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom - canvas_height)
                / rounds[0].height_deficit * 100
        )
    }

    destination_scroll_Y !== null && animate_scroll_Y(
        scroll_Y,
        destination_scroll_Y,
        options, update_state
    )
}