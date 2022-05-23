export const get_max_scroll_round_index = (
    { matches_vertical_scroller, content_horizontal_scroller },
    all_data
) => {
    const width_per_round = matches_vertical_scroller.scrollWidth / all_data.rounds.length
    const visible_width_in_rounds = content_horizontal_scroller.clientWidth / width_per_round
    return all_data.rounds.length - visible_width_in_rounds
}
