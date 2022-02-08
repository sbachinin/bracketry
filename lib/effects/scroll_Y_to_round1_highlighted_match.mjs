import { animate_scroll } from '../utils/animate_scroll.mjs'
import { get_match_center_scroll_Y, get_height_deficit_for_round } from '../utils/sizes.mjs'

export const scroll_Y_to_round1_highlighted_match = (
    rounds,
    store,
    options,
    canvas_height
) => {
    if (store.state.highlighted_team_id === null) return

    const round0_highlighted_match_index = rounds[0].matches
        .findIndex(m => m.sides.find(s => s.id === store.state.highlighted_team_id))
    
    const match_center_scroll_Y = get_match_center_scroll_Y(
        rounds[0],
        store.state.scroll_Y,
        round0_highlighted_match_index,
        options
    )

    let destination_scroll_Y = store.state.destination_scroll_Y

    const round0_height_deficit = get_height_deficit_for_round(rounds[0].matches.length, options)

    if (match_center_scroll_Y < 0) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (match_center_scroll_Y - options.min_height_per_match/2) // invisibility depth in px
                / round0_height_deficit * 100
        )
    }

    if ((match_center_scroll_Y + options.min_height_per_match/2 + options.matches_padding_bottom) > canvas_height) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (match_center_scroll_Y + options.min_height_per_match/2 + options.matches_padding_bottom - canvas_height)
                / round0_height_deficit * 100
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