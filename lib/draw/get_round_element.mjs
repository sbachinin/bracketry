import { create_element_from_Html, get_n_things } from '../utils.mjs'
import { get_match_element } from './get_match_element.mjs'


export const get_round_element = (all_data, round_index, get_option) => {
    const round_element = create_element_from_Html(`<div class="round-wrapper"></div>`)

    if (round_index === 0) {
        round_element.innerHTML += `<div class="round-fake-padding left"></div>`
    }
    if (round_index === (all_data.rounds.length - 1)) {
        round_element.innerHTML += `<div class="round-fake-padding right"></div>`
    }

    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)

    const matches_elements = get_n_things(
        match_count,
        (_, match_order) => get_match_element(round_index, match_order, all_data, get_option)
    )

    round_element.append(...matches_elements)

    return round_element
}
