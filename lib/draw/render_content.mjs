import { is_object } from '../utils.mjs'
import { get_round_element } from './get_round_element.mjs'
import { get_round_titles_html } from './get_round_titles_html.mjs'

export const render_content = (all_data, shell, get_option) => {
    shell.round_titles_wrapper.innerHTML = get_round_titles_html(all_data.rounds)

    if (Array.isArray(all_data.matches) && is_object(all_data.contestants)) {
        const all_sides = all_data.matches.flatMap(m => m.sides ?? [])
        const contestant_ids = all_sides.flatMap(s => s.contestant_id).filter(id => typeof id === 'string')
        const unique_contestant_ids = [...new Set(contestant_ids)]
        unique_contestant_ids.forEach(id => {
            if (
                typeof all_data.contestants[id]?.entry_status === 'string'
                && !shell.matches_positioner.classList.contains('with-entry-statuses')
            ) { shell.matches_positioner.classList.add('with-entry-statuses') }
            
            all_data.contestants[id]?.players.forEach(p => {
                if (
                    (typeof p.flag_url === 'string' || typeof p.nationality_code === 'string')
                    && !shell.matches_positioner.classList.contains('with-nationalities')
                ) { shell.matches_positioner.classList.add('with-nationalities') }
            })
        })
    }

    shell.matches_positioner.innerHTML = ''

    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, get_option)
        )
    })
    shell.matches_positioner.append(...round_elements)

    
// equalize_nationality_codes
/* 
    const nc_elements = [...shell.matches_positioner.querySelectorAll('.nationality-code')]
    if (nc_elements.length) {
        console.time('f')
        let max_width = 0
        nc_elements.forEach(nc => {
            max_width = Math.max(max_width, nc.clientWidth)
        })
        update_styles(
            shell.the_root_element.id,
            'nationality-code-width',
            `#${shell.the_root_element.id} .player-wrapper .nationality-code {
                width: ${max_width + 2}px;
            }`
        )
        // nc_elements.forEach(nc => {
        //     nc.style.width = max_width + 2 + 'px' // 2 is double border width
        // })
        console.timeEnd('f')
    }
    */
}