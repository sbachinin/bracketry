import { draw_lines } from './lines.mjs'
import { get_match_el } from './match_template.mjs'
import { get_width_per_round } from '../utils/sizes.mjs'

const create_round_el = (options) => {
    const el = document.createElement('div')
    el.style.height = '100%'
    el.style.width = get_width_per_round(options) + 'px'
    el.style.display = 'flex'
    el.style.flexDirection = 'column'
    el.style.justifyContent = 'space-around'
    el.style.alignItems = 'flex-start'
    return el
}

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    root_elements.match_bodies_positioner.innerHTML = ''
    
    all_data.rounds.forEach((round) => {
        const round_el = create_round_el(options)
        round.matches.forEach(m => {
            round_el.append(get_match_el(all_data, m.id, options))
        })

        // perhaps should append many at once, if it's more performant
        root_elements.match_bodies_positioner.append(round_el)
    })


    draw_lines(all_data, store.state, root_elements, options)
}