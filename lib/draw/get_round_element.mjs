import { create_element_from_Html, get_n_things } from '../utils/utils.mjs'
import { add_flags_listeners } from './flags.mjs'
import { get_match_element } from './get_match_element.mjs'


export const get_round_element = (all_data, round_id, round_index) => {
    const match_count = Math.pow(2, all_data.rounds.length - 1 - round_index)

    const round_el = create_element_from_Html(`
        <div class="round-wrapper">
            ${
                get_n_things(
                    match_count,
                    (_, match_index) => get_match_element(
                        all_data.matches.find(m => m.round_id === round_id && m.order === match_index),
                        all_data
                    )
                ).join('')
            }
        </div>
    `)

    add_flags_listeners(round_el)

    return round_el
}
