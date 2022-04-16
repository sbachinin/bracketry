import { create_element_from_Html } from '../utils/utils.mjs'

const get_scores_el = (match) => `
    <div class="match-scores">${match.sides[0].score.length
        ? (
            match.sides[0].score.map((upper_single_score, score_index) => {
                const lower_single_score = match.sides[1].score[score_index]
                return `
                        <div class="single-scores-pair">
                            <div>${upper_single_score.main_score
                    }${upper_single_score.tie_break ? `<span class="tie-break">${upper_single_score.tie_break}</span>` : ''
                    }
                            </div>
                            <div>${lower_single_score.main_score
                    }${lower_single_score.tie_break ? `<span class="tie-break">${lower_single_score.tie_break}</span>` : ''
                    }
                            </div>
                        </div>
                    `
            }).join('')
        ) : '<div class="single-scores-pair"><div>&#8203;</div><div>&#8203;</div></div>' // dummy el with proper height
    }</div>
`

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
                        <div>${m.sides[0].title === undefined ? '&#8203;' : m.sides[0].title}</div>
                        <div>${m.sides[1].title === undefined ? '&#8203;' : m.sides[1].title}</div>
                    </div>
                `).join('')}
            </div>
            <div class="round-column scores" style="align-items: flex-start;">
                ${round.matches.map(m => get_scores_el(m)).join('')}
            </div>
        </div>

    `)
    return el
}