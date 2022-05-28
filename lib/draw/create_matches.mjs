import { get_round_element } from './get_round_element.mjs'

export const create_matches = (all_data, matches_scrollable_area) => {
    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round.id, round_index)
        )
    })
    matches_scrollable_area.append(...round_elements)
}
