import { within_range } from '../utils/utils.mjs'

// scroll to the final round or,
// if tournament is unfinished, to the last contentful round
export const get_initial_anchor_index = (all_data, stable_elements) => {
    const first_sideless_round_index = all_data.rounds.findIndex(
        r => !Array.isArray(r.matches) || !r.matches.find(
            m => Array.isArray(m.sides) && m.sides.find(s => s !== undefined)
        )
    )

    const round_width = stable_elements.rounds_elements_wrapper.clientWidth / all_data.rounds.length
    const visible_rounds_count = stable_elements.content_horizontal_scroller.clientWidth / round_width

    // tournament is complete (all rounds have matches with sides):
    if (first_sideless_round_index === -1) {
        // scroll to max possible index
        return all_data.rounds.length - visible_rounds_count
    }

    // tournament didn't start
    if (first_sideless_round_index === 0) {
        // show first round
        return 0
    }

    // tournament is in progress
    // - scroll to last contentful round
    return within_range(
        first_sideless_round_index - visible_rounds_count,
        0,
        all_data.rounds.length - 1
    )
}
