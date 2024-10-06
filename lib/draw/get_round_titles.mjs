import { deep_clone_object } from '../utils.mjs'
import { try_get_custom_element } from './try_get_custom_element.mjs'

const get_default_round_name = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_round_titles = (all_data, renderableRoundsCount, get_option) => {
    return all_data.rounds.slice(0, renderableRoundsCount).map((r, i) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'round-title'

        const custom_el = try_get_custom_element(
            get_option('getRoundTitleElement'),
            [deep_clone_object(r), i],
            'getRoundTitleElement'
        )
        if (custom_el instanceof Element) {
            wrapper.append(custom_el)
        } else {
            wrapper.innerHTML = r.name || get_default_round_name(all_data.rounds.length, i)
        }
        return wrapper
    })
}
