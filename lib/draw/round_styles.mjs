import { MATCH_FONT_SIZE } from '../constants.mjs'

export const get_rounds_styles = (root_id, options) => `
    #${root_id} .round-wrapper {
        height: 100%;
        display: flex;
        font-family: helvetica;
        font-size: ${MATCH_FONT_SIZE}px;
        padding: 0 ${options.match_hor_margin}px;
        box-sizing: border-box;
    }

    #${root_id} .round-column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    #${root_id} .round-column * {
        white-space: nowrap;
    }

    #${root_id} .match-info-pair {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: ${MATCH_FONT_SIZE * 3.2 * options.teams_vertical_density / 10}px;
    }

    #${root_id} .match-info-pair > div {
        height: 50%;
        display: flex;
        align-items: center;
    }

    #${root_id} .match-info-pair > div:not(.dummy) {
        padding-left: ${MATCH_FONT_SIZE / 4}px;
        padding-right: ${MATCH_FONT_SIZE / 4}px;
    }

    #${root_id} .round-column.result-mark svg.default-winner-mark {
        height: ${MATCH_FONT_SIZE}px;
    }

    #${root_id} .round-column.team-titles {
        flex: 1;
    }
    
    #${root_id} .round-column .team-title-item {
        color: ${options.team_title_text_color};
        margin-left: ${MATCH_FONT_SIZE / 2}px;
        margin-right: ${MATCH_FONT_SIZE}px;
        cursor: ${options.highlight_team_history_on_click ? 'pointer' : 'default'};
    }

    #${root_id} .round-column .team-title-item.highlighted,
    #${root_id} .round-column .team-title-item:hover {
        color: ${options.highlight_team_history_on_click ? options.highlight_color : options.team_title_text_color};
    }

    #${root_id} .round-column.entry-statuses, #${root_id} .round-column.nationalities {
        font-size: ${MATCH_FONT_SIZE * 0.8}px;
    }

    #${root_id} .round-column .match-scores {
        display: flex;
    }

    #${root_id} .round-column .match-scores .tie-break {
        font-size: ${Math.floor(MATCH_FONT_SIZE / 3 * 2)}px;
        display: inline-block;
        transform: translate(0, -${MATCH_FONT_SIZE / 2.7}px);
        margin-left: 1px;
        margin-right: -1px;
    }
    
`