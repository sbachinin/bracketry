import { create_element_from_Html, get_n_things } from '../utils.mjs'
import { get_match_element } from './get_match_element.mjs'


export const get_round_element = (all_data, round_index, get_option) => {
    const round_element = create_element_from_Html(`<div class="round-wrapper"></div>`)

    round_element.setAttribute('round-index', round_index)

    const last_rnd_index = all_data.rounds.length - 1

    const match_count = Math.pow(2, last_rnd_index - round_index)

    const matches_elements = get_n_things(
        match_count,
        (match_order) => get_match_element(round_index, match_order, all_data, get_option)
    )

    round_element.append(...matches_elements)

    if (round_index === last_rnd_index && all_data.matches?.find(m => m.isBronzeMatch === true)) {
        round_element.append(
            get_match_element(last_rnd_index, 1, all_data, get_option)
        )
    }

    return round_element
}
