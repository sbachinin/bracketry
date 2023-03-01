import { get_round_element } from './get_round_element.mjs'
import { get_round_titles } from './get_round_titles.mjs'
import { create_element_from_Html } from '../utils.mjs'


const get_bronze_round_wrapper = (all_data, round_index, get_option) => {

    const el = create_element_from_Html(`<div class="bronze-round-wrapper"></div>`)

    el.append(
        create_element_from_Html(`<div class="pseudo-round-wrapper">
            <div class="match-wrapper even">
                <div class="match-lines-area">
                    <div class="line-wrapper upper"></div>
                    <div class="line-wrapper lower"></div>
                </div>
            </div>
        </div>`)
    )

    el.append(get_round_element(all_data, round_index, get_option))

    return el
}


export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = ''
    shell.round_titles_wrapper.append(...get_round_titles(all_data, get_option))

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((_, round_index) => {

        let round_el = null

        if (
            round_index === all_data.rounds.length - 1
            && all_data.matches.find(m => m.isBronze === true)
        ) {
            round_el = get_bronze_round_wrapper(all_data, round_index, get_option)
        } else {
            round_el = get_round_element(all_data, round_index, get_option)
        }

        round_elements.push(round_el)
    })
    shell.matches_positioner.append(...round_elements)
}