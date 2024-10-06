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

const tryExtendDataRounds = (all_data) => {
    if (!all_data.matches || !all_data.rounds) return

    // 1. If skippedLastRoundsCount is provided, need to add this number of items to all_data.rounds
    // (all_data.rounds.length therefore becomes not an actual number of rounds but an ideal number that provides the necessary "thickness" of a tree)

    if (all_data.skippedLastRoundsCount) {
        for (let i = 0; i < all_data.skippedLastRoundsCount; i++) {
            all_data.rounds.push({})
        }
    }

    // 2. Possibly increase the "thickness" to accomodate all matches of the 1st round
    // User can fail to provide data.rounds of appropriate length.
    // In such case bracket will be shorter and some matches can be left unrendered
    // To avoid confusion, I try to infer the number of rounds from 1st round matches

    const max_match_index = Math.max(
        ...all_data.matches
            .filter(m => m.roundIndex === 0)
            .map(m => m.order)
    )

    const rounds_count_infeffed_from_matches = Math.ceil(Math.log2(max_match_index * 2))
    const lacking_rounds_count = rounds_count_infeffed_from_matches - all_data.rounds.length

    for (let i = 0; i < lacking_rounds_count; i++) {
        all_data.rounds.push({})
    }
}



export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = ''

    tryExtendDataRounds(all_data, get_option)

    const renderableRoundsCount = all_data.rounds.length - (all_data.skippedLastRoundsCount || 0)

    shell.round_titles_wrapper.append(...get_round_titles(all_data, renderableRoundsCount, get_option))

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.slice(0, renderableRoundsCount).forEach((_, round_index) => {

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