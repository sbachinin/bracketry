export const get_max_scroll_round_index = (the_root_element, all_data) => {
    const fully_visible_rounds_count = Math.floor(the_root_element.clientWidth / all_data.width_per_round)
    return all_data.rounds.length - fully_visible_rounds_count
}