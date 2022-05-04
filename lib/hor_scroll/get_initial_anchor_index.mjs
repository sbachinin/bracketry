import { within_range } from '../utils/utils.mjs'

// scroll to the final round or,
// if tournament is unfinished, to the last contentful round
export const get_initial_anchor_index = (all_data, root_elements, first_round_width) => {
    const first_sideless_round_index = all_data.rounds.findIndex(
        r => !Array.isArray(r.matches) || !r.matches.find(
            m => Array.isArray(m.sides) && m.sides.find(s => s !== undefined)
        )
    )

    const visible_rounds_count = root_elements.content_horizontal_scroller.clientWidth / first_round_width

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
