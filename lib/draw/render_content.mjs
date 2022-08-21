import { get_round_element } from './get_round_element.mjs'
import { get_round_titles_html } from './get_round_titles_html.mjs'

export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = get_round_titles_html(all_data.rounds)

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, get_option)
        )
    })
    shell.matches_positioner.append(...round_elements)
}
