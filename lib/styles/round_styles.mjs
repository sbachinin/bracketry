export const get_rounds_styles = (root_id, options) => `
    #${root_id} {
        font-family: ${options.root_font_family};
    }

    #${root_id} .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
    }

    #${root_id} .match-wrapper {
        width: 100%;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
    }

    #${root_id} .side-wrapper {
        display: flex;
        transition: all 0.1s ease-out;
        color: ${ options.connection_lines_color }; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper.highlighted .side-wrapper {
        color: ${ options.highlight_color }; /* for box-shadow color, not text */
    }

    #${root_id} .side-wrapper:first-of-type {
        padding-top: ${ options.min_vertical_distance_btw_matches / 2 }px;
        align-items: end;
    }
    #${root_id} .side-wrapper:last-of-type {
        padding-bottom: ${ options.min_vertical_distance_btw_matches / 2 }px;
        align-items: start;
    }



    

/* regular lines */

    #${root_id} .match-wrapper:nth-child(odd) .side-wrapper:last-of-type {
        box-shadow: 2px 0px 0px 0px;
        border-top: 2px solid ${ options.connection_lines_color };
    }
    #${root_id} .match-wrapper:nth-child(even) .side-wrapper:first-of-type {
        box-shadow: 2px 0px 0px 0px;
        border-bottom: 2px solid ${ options.connection_lines_color };
    }
    #${root_id} .round-wrapper:last-of-type .side-wrapper {
        box-shadow: none;
    }
/* highlighted lines */
    #${root_id} .match-wrapper.highlighted .side-wrapper {
        border-color: ${ options.highlight_color } !important;
    }
    #${root_id} .match-wrapper.last-highlighted .side-wrapper {
        color: ${ options.connection_lines_color } !important;
    }




    #${root_id} .match-wrapper.live .side-body {
        background: #f1fff1;
    }
    #${root_id} .side-wrapper.highlighted .players-info,
    #${root_id} .side-body:hover .players-info {
        color: ${ options.highlight_color };
    }

    #${root_id} .side-body {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-top: ${ options.distance_from_match_axis }px;
        padding-bottom: ${ options.distance_from_match_axis }px;
        padding-right: ${ options.match_hor_margin }px;
        color: ${ options.match_text_color }; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
    }

    #${root_id} .round-wrapper:not(:first-of-type) .side-body {
        padding-left: ${ options.match_hor_margin }px;
    }


    #${root_id} .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
        pointer-events: none; /* to capture clicks on .side-wrapper */
        transition: color 0.1s ease-out;
    }

    #${root_id} .side-info-item.entry-status {
        width: ${ options.match_root_font_size * 1.5 }px;
        font-size: ${options.match_root_font_size - 4}px;
        text-align: center;
    }

    #${root_id} .side-info-item.players-info {
        flex: 1;
        padding-left: ${ options.match_root_font_size / 3 * 2 }px;
    }

    #${root_id} .player-wrapper {
        display: flex;
        align-items: center;
    }

    #${root_id} .player-wrapper .nationality {
        min-width: ${ options.match_root_font_size * 2 }px;
        font-size: ${options.match_root_font_size - 4}px;
        text-align: center;
        margin-right: ${ options.match_root_font_size / 2 }px;
        display: flex;
        justify-content: center;
        padding-top: ${ options.match_root_font_size / 8 }px;
    }

    #${root_id} .player-wrapper .nationality > img {
        height: ${options.match_root_font_size * 0.8}px;
    }

    #${root_id} .player-wrapper .player-title {
        flex: 1;
        padding-right: ${ options.match_root_font_size * 2 }px;
        font-family: ${options.player_title_font_family || options.root_font_family};
    }

    
    #${root_id} .side-info-item.winner-mark {
        padding-right: ${ options.distance_between_scores }px;
    }

    #${root_id} .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
        width: ${ options.match_root_font_size / 2.5 }px;
        height: ${ options.match_root_font_size / 2.5 }px;
    }

    #${root_id} .side-info-item.serving-mark.transparent {
        background-color: transparent;
    }

    #${root_id} .side-info-item.score {
        grid-auto-flow: column;
        font-family: ${options.score_font_family || options.root_font_family};
        grid-column-gap: ${ options.distance_between_scores }px;
        padding-right: ${ options.match_root_font_size / 2 }px;
    }
    #${root_id} .single-score {
        display: flex;
        overflow: visible;
        justify-content: center;
    }
    #${root_id} .tie-break {
        font-size: ${Math.floor(options.match_root_font_size / 3 * 2)}px;
        display: inline-block;
        transform: translate(1px, -${options.match_root_font_size / 3.5}px);
        width: 0;
    }

    #${root_id} .side-info-item.subscore {
        min-width: ${ options.match_root_font_size * 2 }px;
        text-align: center;
        margin-right: ${ options.match_root_font_size / 2 }px;
        border: 1px solid ${ options.match_text_color };
        padding: 0 ${ options.match_root_font_size / 4 }px;
    }

    #${root_id} .match-wrapper.live .side-info-item.subscore {
        border-color: #c4c4c4;
    }

    #${root_id} svg.default-winner-mark {
        height: ${options.match_root_font_size}px;
    }
`