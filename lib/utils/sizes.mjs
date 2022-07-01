export const get_max_anchor_round_index = (
    stable_elements,
    all_data,
) => {
    if (stable_elements.the_root_element.classList.contains('mobile')) {
        return all_data.rounds.length - 1
    }
    const width_per_round = stable_elements.matches_vertical_scroller.scrollWidth / all_data.rounds.length
    const visible_width_in_rounds = stable_elements.content_horizontal_scroller.clientWidth / width_per_round
    return Math.ceil(all_data.rounds.length - visible_width_in_rounds)
}
