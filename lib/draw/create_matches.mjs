import { get_round_element } from './get_round_element.mjs'

export const create_matches = (all_data, els, get_option) => {
    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, get_option)
        )
    })
    els.matches_positioner.append(...round_elements)
}
