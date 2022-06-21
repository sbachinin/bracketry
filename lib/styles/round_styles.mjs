export const get_rounds_styles = (root_id, options) => `
    #${root_id} {
        font-family: ${options.root_font_family};
    }

    #${root_id} .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
        min-width: 200px;
    }

    #${root_id} .round-wrapper:first-of-type {
        margin-left: ${options.match_hor_margin}px; /* shrink the first round because he needs no left padding */
    }

    #${root_id} .match-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        min-height: 40px;
    }
    
    #${root_id} .match-body {
        width: 100%;
        margin-top: ${options.min_vertical_distance_btw_matches / 2}px;
        margin-bottom: ${options.min_vertical_distance_btw_matches / 2}px;
        transition: background-color 0.1s ease-out;
        display: flex;
    }

    #${root_id} .match-body .sides {
        flex: 1;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
        border: ${options.line_width}px solid transparent;
    }

    #${root_id} .match-body .match-status {
        font-size: ${Math.floor(options.match_root_font_size * 0.85)}px;
        background: ${options.background_color};
        z-index: 2;
        border: ${options.line_width}px solid ${options.connection_lines_color};
        padding: 2px 6px;
        align-self: center;
    }

    #${root_id} .match-wrapper.highlighted .match-body .match-status {
        border-color: ${options.highlight_color};
    }

    ${options.onMatchClick
        ? `
            #${root_id} .match-body {
                cursor: pointer;
            }
            #${root_id} .match-body * {
                pointer-events: none; /* handle click/hover only on whole body */
            }
            #${root_id} .match-body:hover {
                background-color: rgb(250, 250, 250);
            }
            #${root_id} .match-body:hover .player-title {
                color: ${options.highlight_color};
            }
        `
        : ''
    }


    #${root_id} .round-wrapper:not(:first-of-type) .match-body {
        padding-left: ${options.match_hor_margin}px;
    }
    #${root_id} .round-wrapper:not(:last-of-type) .match-body {
        padding-right: ${options.match_hor_margin}px;
    }
    #${root_id} .round-wrapper:last-of-type {
        margin-right: ${options.match_hor_margin}px;
    }




    #${root_id} .match-wrapper.missing-match-placeholder {
        pointer-events: none;
    }













    
    
/* LINES */

/* regular lines */
    #${root_id} .match-wrapper .match-lines-area {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        pointer-events: none;
        z-index: 1;
    }
    #${root_id} .match-wrapper .match-lines-area .line-wrapper {
        flex: 1; /* each of 2 empty guys takes 50% height */
        color: ${options.connection_lines_color}; /* for box-shadow color, not text */
        transition: all 0.1s ease-out;
    }


    #${root_id} .match-wrapper.highlighted .match-lines-area .line-wrapper {
        color: ${options.highlight_color}; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper:nth-child(even) .line-wrapper.upper {
        box-shadow: ${options.line_width}px 0px 0px 0px;
        border-bottom: ${options.line_width}px solid ${options.connection_lines_color};
    }
    #${root_id} .match-wrapper:nth-child(odd) .line-wrapper.lower {
        box-shadow: ${options.line_width}px 0px 0px 0px;
        border-top: ${options.line_width}px solid ${options.connection_lines_color};
    }
    #${root_id} .round-wrapper:last-of-type .line-wrapper {
        box-shadow: none !important;
    }
/* highlighted lines */
    #${root_id} .match-wrapper.highlighted .line-wrapper {
        border-color: ${options.highlight_color} !important;
    }
    #${root_id} .match-wrapper.last-highlighted .line-wrapper {
        color: ${options.connection_lines_color} !important;
    }


    #${root_id} .side-wrapper.highlighted .players-info,
    #${root_id} .side-wrapper:hover .player-title {
        color: ${options.highlight_color};
    }

    #${root_id} .side-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-top: ${options.distance_from_match_axis}px;
        padding-bottom: ${options.distance_from_match_axis}px;
        padding-right: ${Math.floor(options.match_root_font_size / 3 * 2)}px;
        padding-left: ${Math.floor(options.match_root_font_size / 2)}px;
        color: ${options.match_text_color}; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
    }

    #${root_id} .side-wrapper.empty-side {
        pointer-events: none;
    }

    #${root_id} .side-wrapper:last-of-type {
        margin-top: -${options.line_width}px;
        padding-top: ${options.distance_from_match_axis + options.line_width}px;
    }

    #${root_id} .match-wrapper.live .match-body .sides {
        border-color: ${options.live_match_border_color};
        background-color: ${options.live_match_background_color};
    }




    #${root_id} .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
        pointer-events: none; /* to capture clicks on .side-wrapper */
    }

    #${root_id} .side-info-item.entry-status {
        width: ${options.match_root_font_size * 1.5}px;
        font-size: ${options.match_root_font_size - 4}px;
        text-align: center;
    }

    #${root_id} .side-info-item.players-info {
        grid-row-gap: ${options.distance_btw_side_players}px;
        flex: 1;
        padding-left: ${options.match_root_font_size / 3 * 2}px;
    }

    #${root_id} .player-wrapper {
        display: flex;
        align-items: center;
    }

    #${root_id} .player-wrapper .nationality {
        width: ${options.match_root_font_size * 1.7}px;
        font-size: ${options.match_root_font_size - 4}px;
        text-align: center;
        margin-right: ${options.match_root_font_size / 2}px;
        display: flex;
        justify-content: center;
    }

    #${root_id} .player-wrapper .nationality > img {
        max-height: ${options.match_root_font_size}px;
    }

    #${root_id} .player-wrapper .player-title {
        flex: 1;
        padding-right: ${options.match_root_font_size * 1.5}px;
        font-family: ${options.player_title_font_family || options.root_font_family};
        transition: all 0.1s ease-out;
        white-space: nowrap;
    }

    #${root_id} .side-wrapper.looser:not(.highlighted) .player-title,
    #${root_id} .side-wrapper.looser .score {
        opacity: 0.54;
    }
    
    #${root_id} .side-info-item.winner-mark {
        padding-right: ${options.distance_between_scores}px;
    }

    #${root_id} .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
        width: ${options.match_root_font_size / 2.5}px;
        height: ${options.match_root_font_size / 2.5}px;
        margin-left: ${options.match_root_font_size / 2}px;
    }

    #${root_id} .side-info-item.serving-mark.transparent {
        background-color: transparent;
    }

    #${root_id} .side-info-item.score {
        grid-auto-flow: column;
        font-family: ${options.score_font_family || options.root_font_family};
        grid-column-gap: ${options.distance_between_scores}px;
    }
    #${root_id} .single-score {
        display: flex;
        overflow: visible;
        flex-direction: column;
        align-items: center;
    }

    #${root_id} .tie-break {
        font-size: ${Math.floor(options.match_root_font_size / 3 * 2)}px;
        padding-left: 1px;
        margin-top: -${Math.floor(options.match_root_font_size / 5)}px;
        margin-right: -${Math.floor(options.match_root_font_size / 5)}px;
    }

    #${root_id} .single-score .side-own-score {
        display: flex;
    }

    #${root_id} .single-score .other-side-score {
        display: flex;
        height: 1px;
        overflow: hidden;
    }

    #${root_id} .side-info-item.subscore {
        min-width: ${options.match_root_font_size * 2}px;
        text-align: center;
        border: 1px solid ${options.match_text_color};
        padding: 0 ${options.match_root_font_size / 4}px;
        margin-left: ${options.match_root_font_size / 2}px;
    }

    #${root_id} .match-wrapper.live .side-info-item.subscore {
        border-color: #c4c4c4;
    }

    #${root_id} svg.default-winner-svg {
        height: ${options.match_root_font_size}px;
        width: auto;
    }
`