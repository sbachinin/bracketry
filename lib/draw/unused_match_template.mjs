import { create_element_from_Html } from '../utils/utils.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'

const get_side_el = (side_meta, side_result) => {
    /*
        {
            entry_status: "1"
            flag_url: "https://purecatamphetamine.github.io/country-flag-icons/3x2/RS.svg"
            nationality_code: "RS"
            title: "N. Djokovic"
        }

        {
            "score": [
                {
                    "main_score": 3,
                    "main_score_width": 5.5615234375
                }
            ],
            "isWinner": false
        }
    */

    return `
        <div class="side-wrapper"
            style="
                display: flex;
                justify-content: space-between;
                padding: 3px 6px;
            "
        >
            ${side_meta.entry_status !== undefined ? `<span>${side_meta.entry_status}</span>` : ''}
            <span>${side_meta.nationality_code}</span>
            <span>${side_meta.title}</span>
            <span>${side_result.score.map(s => s.main_score).join(' ')}
        </div>
    `
}

export const get_match_el = (all_data, match_id, options) => {
    // el.style.width = width + 'px'
    // el.style.height = '50px'
    // el.style.border = '1px solid tomato'
    const { match } = find_match_data_by_id(all_data, match_id)
    return create_element_from_Html(`
        <div style="
            invalid-width: ${options.match_width}px;
            margin: 0 ${options.match_hor_margin}px;
            font-family: helvetica;
            font-size: 16px;
            white-space: nowrap;
            border: 1px solid;
        ">
            ${get_side_el(all_data.teams[match.sides[0].id], match.sides[0])}
            ${get_side_el(all_data.teams[match.sides[1].id], match.sides[1])}
        </div>
    `)
}