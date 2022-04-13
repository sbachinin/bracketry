import { create_element_from_Html } from '../utils/utils.mjs'

export const get_round_element = (round) => {
    const el = create_element_from_Html(`
        <div class="round-wrapper">
            <div class="round-column entry-statuses" style="align-items: center;">
                ${round.matches.map(m => `
                    <div class="match-info-pair" style="background: pink; text-align: center;">
                        <div>${m.sides[0].entry_status === undefined ? '&#8203;' : m.sides[0].entry_status}</div>
                        <div>${m.sides[1].entry_status === undefined ? '&#8203;' : m.sides[1].entry_status}</div>
                    </div>
                `).join('')}
            </div>
            <div class="round-column nationalities" style="align-items: center;">
                ${round.matches.map(m => `
                    <div class="match-info-pair" style="background: yellow; text-align: center;">
                        <div>${m.sides[0].nationality_code === undefined ? '&#8203;' : m.sides[0].nationality_code}</div>
                        <div>${m.sides[1].nationality_code === undefined ? '&#8203;' : m.sides[1].nationality_code}</div>
                    </div>
                `).join('')}
            </div>
            <div class="round-column team-titles" style="align-items: flex-start;">
                ${round.matches.map(m => `
                    <div class="match-info-pair">
                        <div>${m.sides[0].title === undefined ? '' : m.sides[0].title}</div>
                        <div>${m.sides[1].title === undefined ? '' : m.sides[1].title}</div>
                    </div>
                `).join('')}
            </div>
            <div class="round-column scores" style="align-items: flex-start;">
                ${round.matches.map(m => `
                    <div class="match-info-pair">
                        <div>${m.sides[0].score.map(s => s.main_score).join(' ')}</div>
                        <div>${m.sides[1].score.map(s => s.main_score).join(' ')}</div>
                    </div>
                `).join('')}
            </div>
        </div>

    `)
    return el
}