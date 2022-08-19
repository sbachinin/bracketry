import { get_round_element } from './get_round_element.mjs'
import { get_round_titles_html } from './get_round_titles_html.mjs'

export const render_content = (all_data, els, get_option) => {
    els.round_titles_wrapper.innerHTML = get_round_titles_html(all_data.rounds)

    els.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, get_option)
        )
    })
    els.matches_positioner.append(...round_elements)
}
