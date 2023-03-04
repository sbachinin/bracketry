import { get_round_element } from './get_round_element.mjs'
import { get_round_titles } from './get_round_titles.mjs'
import { create_element_from_Html } from '../utils.mjs'

const bronze_markup = `
    <div class="bronze-round-wrapper">
        <div class="pseudo-round-wrapper">
            <div class="match-wrapper even">
                <div class="match-lines-area">
                    <div class="line-wrapper upper"></div>
                    <div class="line-wrapper lower"></div>
                </div>
            </div>
        </div>
    </div>
`

export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = ''
    shell.round_titles_wrapper.append(...get_round_titles(all_data, get_option))

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((_, round_index) => {

        const round_el = get_round_element(all_data, round_index, get_option)

        if (
            round_index === all_data.rounds.length - 1
            && all_data.matches?.find(m => {
                return m.isBronzeMatch === true && m.roundIndex === (all_data.rounds.length - 1) && m.order === 1
            })
        ) {
            const bronze_wrapper = create_element_from_Html(bronze_markup)
            bronze_wrapper.append(round_el)
            round_elements.push(bronze_wrapper)
        } else {
            round_elements.push(round_el)
        }

    })
    shell.matches_positioner.append(...round_elements)
}