import { get_round_element } from './get_round_element.mjs'

export const measure_first_round = (all_data, root_elements, options) => {
    const el = get_round_element(
        all_data,
        0,
        {
            highlighted_team_id: null,
            anchor_round_index: 0
        },
        options
    )
    el.style.visibility = 'hidden'
    root_elements.rounds_elements_wrapper.append(el)
    const width = el.clientWidth
    el.remove()
    return width
}