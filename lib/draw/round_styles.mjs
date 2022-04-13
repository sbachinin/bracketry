import { MATCH_FONT_SIZE } from '../constants.mjs'

export const get_rounds_styles = (root_id, options) => `
    #${root_id} .round-wrapper {
        height: 100%;
        display: flex;
        font-family: helvetica;
        font-size: ${MATCH_FONT_SIZE}px;
        margin: 0 ${options.match_hor_margin}px;
    }

    #${root_id} .round-column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    #${root_id} .match-info-pair > div {
        padding: ${MATCH_FONT_SIZE / 4}px;
    }

    #${root_id} .round-column.team-titles .match-info-pair > div {
        padding: ${MATCH_FONT_SIZE / 4}px ${MATCH_FONT_SIZE / 2}px;
    }
    
    #${root_id} .round-column.entry-statuses, #${root_id} .round-column.nationalities {
        font-size: ${MATCH_FONT_SIZE * 0.8}px
    }
`