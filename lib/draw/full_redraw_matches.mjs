import { draw_lines } from './lines.mjs'
import { get_round_element } from './get_round_element.mjs'

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    root_elements.match_bodies_positioner.innerHTML = ''

    all_data.rounds.forEach((round) => {
        const round_el = get_round_element(round)
        // perhaps should append many at once, if it's more performant
        root_elements.match_bodies_positioner.append(round_el)
    })


    draw_lines(all_data, store.state, root_elements, options)
}