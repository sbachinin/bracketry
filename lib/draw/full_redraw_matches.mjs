import { draw_lines } from './lines.mjs'
import { get_round_element } from './get_round_element.mjs'
import { maybe_draw_round_titles } from './round_titles.mjs'

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    root_elements.rounds_elements_wrapper.innerHTML = ''

    const round_elements = []

    all_data.rounds.forEach((round) => {
        round_elements.push(get_round_element(round))
    })

    root_elements.rounds_elements_wrapper.append(...round_elements)

    const widest_round_width = Math.max(
        ...round_elements.map(r => Math.ceil(r.getBoundingClientRect().width))
    )

    round_elements.forEach(el => el.style.flexBasis = widest_round_width + 'px')

    root_elements.main_canvas_el.width = widest_round_width * all_data.rounds.length
    draw_lines(all_data, store.state, root_elements, options)

    root_elements.round_titles_canvas_el.width = widest_round_width * all_data.rounds.length
    maybe_draw_round_titles(all_data, options, root_elements)

    root_elements.hor_buttons?.update_visibility(all_data, options, store.state.anchor_round_index, root_elements)
}