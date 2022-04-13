import { create_element_from_Html } from '../utils/utils.mjs'

const shared_column_style = `
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const get_round_element = (round) => {
    const el = create_element_from_Html(`
        <div class="ROUND" style="
            height: 100%;
            display: flex;
        ">
            <div class="ROUND_STATUSES" style="
                ${shared_column_style}
                align-items: center;
            ">
                ${round.matches.map(m => `
                    <div class="MATCH_STATUSES-${m.order}" style="background: pink; text-align: center;">
                        <div>${m.sides[0].entry_status === undefined ? '&nbsp;' : m.sides[0].entry_status}</div>
                        <div>${m.sides[1].entry_status === undefined ? '&nbsp;' : m.sides[1].entry_status}</div>
                    </div>
                `).join('')}
            </div>
            <div class="ROUND_NATIONALITIES" style="
                ${shared_column_style}
                align-items: center;
            ">
                ${round.matches.map(m => `
                    <div class="MATCH_NATIONALITIES">
                        <div>${m.sides[0].nationality_code === undefined ? '' : m.sides[0].nationality_code}</div>
                        <div>${m.sides[1].nationality_code === undefined ? '' : m.sides[1].nationality_code}</div>
                    </div>
                `).join('')}
            </div>
            <div class="ROUND_TITLES" style="
                ${shared_column_style}
                align-items: flex-start;
            ">
                ${round.matches.map(m => `
                    <div class="MATCH_TITLES">
                        <div>${m.sides[0].title === undefined ? '' : m.sides[0].title}</div>
                        <div>${m.sides[1].title === undefined ? '' : m.sides[1].title}</div>
                    </div>
                `).join('')}
            </div>
            <div class="ROUND_SCORES" style="
                ${shared_column_style}
                align-items: flex-start;
            ">
                ${round.matches.map(m => `
                    <div class="MATCH_TITLES">
                        <div>${m.sides[0].score.map(s => s.main_score).join(' ')}</div>
                        <div>${m.sides[1].score.map(s => s.main_score).join(' ')}</div>
                    </div>
                `).join('')}
            </div>
        </div>

    `)
    return el
}