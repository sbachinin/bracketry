import { get_match_body_height } from '../utils/sizes.mjs'

export const get_rounds_styles = (root_id, options) => `
    #${root_id} .round-wrapper {
        height: 100%;
        display: flex;
        font-family: helvetica;
        font-size: ${options.match_font_size}px;
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
        height: ${get_match_body_height(options)}px;
    }

    #${root_id} .match-info-pair > div {
        height: 50%;
        display: flex;
        align-items: center;
    }

    #${root_id} .match-info-pair > div:not(.dummy) {
        padding-left: ${options.match_font_size / 4}px;
        padding-right: ${options.match_font_size / 4}px;
    }

    #${root_id} .round-column.result-mark svg.default-winner-mark {
        height: ${options.match_font_size}px;
    }

    #${root_id} .round-column.team-titles {
        flex: 1;
    }
    
    #${root_id} .round-column .team-title-item {
        color: ${options.team_title_text_color};
        margin-left: ${options.match_font_size / 2}px;
        margin-right: ${options.match_font_size}px;
        cursor: ${options.highlight_team_history_on_click ? 'pointer' : 'default'};
    }

    #${root_id} .round-column .team-title-item.highlighted,
    #${root_id} .round-column .team-title-item:hover {
        color: ${options.highlight_team_history_on_click ? options.highlight_color : options.team_title_text_color};
    }

    #${root_id} .round-column.entry-statuses, #${root_id} .round-column.nationalities {
        font-size: ${options.match_font_size * 0.8}px;
    }

    #${root_id} .round-column .match-scores {
        display: flex;
    }

    #${root_id} .round-column .match-scores .tie-break {
        font-size: ${Math.floor(options.match_font_size / 3 * 2)}px;
        display: inline-block;
        transform: translate(0, -${options.match_font_size / 2.7}px);
        margin-left: 1px;
        margin-right: -1px;
    }
    
`