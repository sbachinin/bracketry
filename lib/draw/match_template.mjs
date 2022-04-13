import { create_element_from_Html } from '../utils/utils.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'

export const get_match_el = (all_data, match_id, options) => {
    // el.style.width = width + 'px'
    // el.style.height = '50px'
    // el.style.border = '1px solid tomato'
    const { match }  = find_match_data_by_id(all_data, match_id)
    return create_element_from_Html(`
        <div style="
            width: ${ options.match_width };
            margin: 0 ${ options.match_hor_margin }px;
            font-family: helvetica;
            font-size: 16px;
            white-space: nowrap;
        ">
            <div>${ all_data.teams[match.sides[0].id].title }</div>
            <div>${ all_data.teams[match.sides[1].id].title }</div>
        </div>
    `)
}