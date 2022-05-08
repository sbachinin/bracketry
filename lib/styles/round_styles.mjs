import { get_match_body_height } from '../utils/sizes.mjs'

export const get_rounds_styles = (root_id, options) => `
    #${root_id} {
        font-family: ${options.root_font_family};
    }

    #${root_id} .rounds-elements-wrapper {
        overflow: hidden;
        padding: ${
            options.main_vertical_padding || 0
        }px ${
            options.match_hor_margin || 0
        }px;
        grid-column-gap: ${options.match_hor_margin * 2}px;
        font-size: ${options.match_root_font_size}px;
        min-height: 100%;
        width: max-content;
    }

    #${root_id} .round-wrapper {
        display: grid;
        grid-template-columns: auto auto 1fr auto auto;
        grid-auto-rows: minmax(0, 1fr);
        padding: 0 ${options.match_root_font_size / 2}px;
        box-sizing: border-box;
        position: relative;
        align-items: center;
    }

    #${root_id} .round-wrapper * {
        white-space: nowrap;
    }

    #${root_id} .match-info-pair {
        display: grid;
        grid-row-gap: ${options.vertical_distance_between_teams}px;
        padding: ${options.match_root_font_size / 3}px 0;
        margin: ${options.min_vertical_distance_btw_matches / 2}px 0;
    }

    #${root_id} .match-info-pair > div {
        height: ${ options.match_root_font_size * 1.5 }px;
        /* line-height: ${ options.match_root_font_size * 1.5 }px; */
        display: flex;
        align-items: center;
    }

    #${root_id} .match-info-pair.nationalities img {
        width: 100%;
        max-height: ${options.match_root_font_size * 0.9}px;
    }

    #${root_id} .match-info-pair.nationalities > div:not(.dummy) {
        width: ${ options.match_root_font_size * 2 }px;
    }

    #${root_id} .match-info-pair.entry-statuses {
        justify-items: center;
    }
    #${root_id} .match-info-pair.entry-statuses, #${root_id} .match-info-pair.nationalities {
        font-size: ${options.match_root_font_size - 4}px;
    }


    #${root_id} .match-info-pair.team-titles {
        font-family: ${options.team_title_font_family || options.root_font_family};
        color: ${options.team_title_text_color};
        margin-left: ${options.match_root_font_size / 2}px;
        margin-right: ${options.match_root_font_size}px;
    }
    #${root_id} .team-title-item {
        cursor: pointer;
    }
    #${root_id} .team-title-item.winner {
        font-weight: ${ options.winner_is_bold ? '700' : '400' }
    }
    #${root_id} .match-info-pair.highlighted .team-title-item,
    #${root_id} .team-title-item.highlighted,
    #${root_id} .team-title-item:hover {
        color: ${ options.highlight_color };
    }

    #${root_id} .match-scores {
        justify-self: start;
        display: inline-grid;
        grid-auto-flow: column;
        font-family: ${options.score_font_family || options.root_font_family};
    }

    #${root_id} .match-scores .single-score {
        display: flex;
        min-width: ${ options.match_root_font_size * 1.5 }px;
        overflow: visible;
        justify-content: center;
    }

    #${root_id} .match-scores .tie-break {
        font-size: ${Math.floor(options.match_root_font_size / 3 * 2)}px;
        display: inline-block;
        transform: translate(1px, -${options.match_root_font_size / 2.7}px);
        width: 0;
    }

    #${root_id} svg.default-winner-mark {
        height: ${options.match_root_font_size}px;
    }

    #${root_id} .match-info-pair > div:not(.dummy) {
        padding-left: ${options.match_root_font_size / 4}px;
        padding-right: ${options.match_root_font_size / 4}px;
    }













/* 

    #${root_id} .round-wrapper .round-column.matches-clickable-areas {
        position: absolute;
        z-index: 1;
        top: 0;
        left: ${options.match_hor_margin}px;
        width: calc(100% - ${options.match_hor_margin * 2}px);
        height: 100%;
    }

    #${root_id} .round-wrapper .match-clickable-area {
        height: ${get_match_body_height(options)}px;
        width: 100%;
        transform: scale(1, 1.1); /* a bit taller */
        cursor: pointer;
    }



    */
    
`