import { animate_scroll } from './animate_scroll.mjs'

export const scroll_Y_to_round1_highlighted_match = (
    highlighted_team_id,
    rounds,
    store,
    options,
    canvas_height
) => {
    if (highlighted_team_id === undefined) return

    const round1_highlighted_match = rounds[0].matches.find(m => m.sides.find(s => s.id === highlighted_team_id))

    let destination_scroll_Y = store.state.destination_scroll_Y

    if (round1_highlighted_match.center_Y < 0) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (round1_highlighted_match.center_Y - options.min_height_per_match/2) // invisibility depth in px
                / rounds[0].height_deficit * 100
        )
    }

    if ((round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom) > canvas_height) {
        destination_scroll_Y = (
            store.state.scroll_Y
            + (round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom - canvas_height)
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