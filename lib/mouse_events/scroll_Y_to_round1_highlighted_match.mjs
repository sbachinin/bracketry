import { animate_scroll } from '../utils/animate_scroll.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'

export const scroll_Y_to_round1_highlighted_match = (
    highlighted_team_id,
    rounds,
    store,
    options,
    canvas_height
) => {
    if (highlighted_team_id === undefined) return

    const round1_highlighted_match = rounds[0].matches.find(m => m.sides.find(s => s.id === highlighted_team_id))
    const match_center_scroll_Y = get_match_center_scroll_Y(rounds[0], store.state.scroll_Y, round1_highlighted_match.order-1)

    let destination_scroll_Y = store.state.destination_scroll_Y

    if (match_center_scroll_Y < 0) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (match_center_scroll_Y - options.min_height_per_match/2) // invisibility depth in px
                / rounds[0].height_deficit * 100
        )
    }

    if ((match_center_scroll_Y + options.min_height_per_match/2 + options.padding_bottom) > canvas_height) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (match_center_scroll_Y + options.min_height_per_match/2 + options.padding_bottom - canvas_height)
                / rounds[0].height_deficit * 100
        )
    }

    if (destination_scroll_Y !== store.state.destination_scroll_Y) {
        animate_scroll({
            store,
            destination_scroll_Y,
            duration: options.vertical_scroll_animation_duration
        })
    }
}