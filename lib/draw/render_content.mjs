import { get_round_element } from './get_round_element.mjs'
import { get_round_titles } from './get_round_titles.mjs'
import { create_element_from_Html } from '../utils.mjs'


const get_last_round_element = (all_data, round_index, get_option) => {

    const el = create_element_from_Html(`<div class="last-round-wrapper-wrapper"></div>`)

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

        if (round_index === all_data.rounds.length - 1 && /* there is bronze match */true) {
            round_el = get_last_round_element(all_data, round_index, get_option)
        } else {
            round_el = get_round_element(all_data, round_index, get_option)
        }

        round_elements.push(round_el)
    })
    shell.matches_positioner.append(...round_elements)
}