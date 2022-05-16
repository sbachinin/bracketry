import { get_round_element } from './get_round_element.mjs'

export const create_matches = (all_data, matches_scrollable_area, options) => {
    const round_elements = []
    all_data.rounds.forEach((_, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, options)
        )
    })
    matches_scrollable_area.append(...round_elements)
}
