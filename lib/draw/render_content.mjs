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

// User can fail to provide data.rounds of appropriate length.
// In such case bracket will be shorter and some matches can be left unrendered
// To avoid confusion, I try to infer the number of rounds from 1st round matches
const tryAddRounds = (all_data) => {
    if (!all_data.matches || !all_data.rounds) return
    const first_round_matches_count = all_data.matches.filter(m => m.roundIndex === 0 && !m.isBronzeMatch).length
    const rounds_count_infeffed_from_matches = Math.ceil(Math.log2(first_round_matches_count * 2))
    const lacking_rounds_count = rounds_count_infeffed_from_matches - all_data.rounds.length

    for (let i = 0; i < lacking_rounds_count; i++) {
        all_data.rounds.push({})
    }
}



export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = ''

    tryAddRounds(all_data)

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