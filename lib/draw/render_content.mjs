import { get_round_element } from './get_round_element.mjs'
import { get_round_titles } from './get_round_titles.mjs'

export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = ''
    shell.round_titles_wrapper.append(...get_round_titles(all_data, get_option))

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, get_option)
        )
    })
    shell.matches_positioner.append(...round_elements)
}