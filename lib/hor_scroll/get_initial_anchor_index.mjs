import { within_range } from '../utils/utils.mjs'
import { get_max_scroll_round_index } from '../utils/sizes.mjs'

// scroll to the final round or,
// if tournament is unfinished, to the last contentful round
export const get_initial_anchor_index = (all_data, stable_elements, options) => {
    let last_contentful_round_index = 0
    all_data.rounds.forEach(
        (r, r_i) => {
            const has_sides = !!all_data.matches.find(m => {
                return m.round_id === r.id && m.sides.length
            })
            if (has_sides) last_contentful_round_index = r_i
        }
    )

    if (options.use_mobile_layout) {
        return last_contentful_round_index
    }

    const width_per_round = stable_elements.matches_vertical_scroller.scrollWidth / all_data.rounds.length
    const visible_rounds_count = stable_elements.content_horizontal_scroller.clientWidth / width_per_round

    return within_range(
        last_contentful_round_index + 1.05 - visible_rounds_count,
        0,
        get_max_scroll_round_index(stable_elements, all_data, options)
    )
}
