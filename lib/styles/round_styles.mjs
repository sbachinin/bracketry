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
        display: flex;
        align-items: center;
        position: relative;
        padding: ${options.match_root_font_size / 3 + options.min_vertical_distance_btw_matches / 2 }px 0;
    }

    #${root_id} .match-body {
        width: 100%;
        display: grid;
        grid-template-rows: minmax(0, 1fr) ${ options.connection_lines_width }px minmax(0, 1fr); /* two sides will always be of same height */
        color: ${ options.match_text_color };
    }




/* vertical part of connection lines (match-wrapper's right border) */
/* REGULAR LINE */
    #${root_id} .match-wrapper::before {
        position: absolute;
        content: '';
        right: 0;
        border-right: ${ options.connection_lines_width }px solid ${ options.connection_lines_color };
        width: 0;
        height: 50%;
    }
    #${root_id} .match-wrapper:nth-child(odd)::before {
        top: calc(50% - ${ options.connection_lines_width / 2 }px);
        padding-bottom: 1px;
    }
    #${root_id} .match-wrapper:nth-child(even)::before {
        bottom: calc(50% - ${ options.connection_lines_width / 2 }px);
    }

/* HIGHLIGHTED LINE */
    #${root_id} .match-wrapper::after {
        position: absolute;
        z-index: 1;
        content: '';
        right: -1px;
        border-right: 3px solid ${ options.highlight_color };
        width: 0;
        height: calc(50% - 3px);
        opacity: 0;
        padding: 1.5px 0;
        transition: opacity 0.15s ease-out;
    }
    #${root_id} .match-wrapper:nth-child(odd)::after {
        top: calc(50% - 1px);
    }
    #${root_id} .match-wrapper:nth-child(even)::after {
        bottom: calc(50% - 1px);
    }
    #${root_id} .match-wrapper.highlighted:not(.last-highlighted)::after {
        opacity: 0.5;
    }







    #${root_id} .match-axis-line {
        position: relative;
        background: ${ options.connection_lines_color };
    }

    #${root_id} .match-highlighted-axis {
        position: absolute;
        z-index: 1;
        left: -2px;
        top: -1px;
        width: calc(100% + 3px);
        background: ${ options.highlight_color };
        height: 3px;
        opacity: 0;
        transition: opacity 0.15s ease-out;
    }

    #${root_id} .match-wrapper.highlighted .match-highlighted-axis {
        opacity: 0.5;
    }

    #${root_id} .side-wrapper {
        display: flex;
        cursor: pointer;
        align-items: center;
        margin-right: ${ options.match_hor_margin }px;
        padding: ${ options.distance_from_match_axis }px ${options.match_root_font_size / 2}px;
    }

    #${root_id} .match-wrapper.live .side-wrapper {
        background: #f1fff1;
    }
    

    #${root_id} .round-wrapper:not(:first-of-type) .side-wrapper {
        margin-left: ${ options.match_hor_margin }px;
    }

    #${root_id} .side-wrapper.highlighted .players-info,
    #${root_id} .side-wrapper:hover .players-info {
        color: ${ options.highlight_color };
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