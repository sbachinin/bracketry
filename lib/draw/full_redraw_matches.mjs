import { draw_lines } from './lines.mjs'

const create_round_el = (width) => {
    const el = document.createElement('div')
    el.style.height = '100%'
    el.style.width = width + 'px'
    el.style.display = 'flex'
    el.style.flexDirection = 'column'
    el.style.justifyContent = 'space-around'
    el.style.alignItems = 'center'
    return el
}

const create_match_el = (m, width) => {
    const el = document.createElement('div')
    el.style.width = width + 'px'
    el.style.height = '50px'
    el.style.border = '1px solid tomato'
    el.innerHTML = m.dev_match_title
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
        const round_el = create_round_el(all_data.width_per_round)
        // if (!is_round_visible_X(all_data.width_per_round, round.static_left_X)) return
        round.matches.forEach(m => {
            round_el.append(create_match_el(m, all_data.match_width))
        })

        // perhaps should append many at once, if it's more performant
        root_elements.match_bodies_positioner.append(round_el)
    })


    draw_lines(all_data, store.state, root_elements, options)
}