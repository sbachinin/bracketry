export const get_rounds_styles = (root_id, options) => `
    #${root_id} {
        font-family: ${options.root_font_family};
    }

    #${root_id} .round-wrapper {
        position: relative;
        grid-template-columns: auto auto 1fr auto auto;
        padding: 0 ${options.match_root_font_size / 2}px;
    }

    #${root_id} .round-wrapper.zero-height {
        height: 0;
    }

    #${root_id} .round-wrapper,
    #${root_id} .round-wrapper .whole-matches-overlay {
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        box-sizing: border-box;
        align-items: center;
    }

    #${root_id} .round-wrapper .whole-matches-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: ${ options.onMatchClick ? 'auto' : 'none' };
    }

    #${root_id} .round-wrapper .whole-match {
        height: ${ options.vertical_distance_between_teams + options.match_root_font_size * 3 }px;
        cursor: ${ options.onMatchClick ? 'pointer' : 'default' };
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

    #${root_id} .match-info-pair.nationalities > div {
        justify-content: center;
    }


    #${root_id} .match-info-pair.highlighted,
    #${root_id} .match-scores.highlighted {
        color: ${ options.highlight_color };
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
        color: ${ options.score_text_color };
        grid-column-gap: ${ options.distance_between_scores + options.match_root_font_size / 2 }px;
    }

    #${root_id} .match-scores .single-score {
        display: flex;
        overflow: visible;
        justify-content: center;
    }

    #${root_id} .match-scores .tie-break {
        font-size: ${Math.floor(options.match_root_font_size / 3 * 2)}px;
        display: inline-block;
        transform: translate(1px, -${options.match_root_font_size / 2.7}px);
        width: 0;
    }

    #${root_id} .match-info-pair .winner-mark-wrapper {
        display: ${ options.show_winner_mark ? 'flex' : 'none'};
    }

    #${root_id} svg.default-winner-mark {
        height: ${options.match_root_font_size}px;
    }

    #${root_id} .match-info-pair > div:not(.dummy):not(.single-score) {
        padding-left: ${options.match_root_font_size / 4}px;
        padding-right: ${options.match_root_font_size / 4}px;
    }
`