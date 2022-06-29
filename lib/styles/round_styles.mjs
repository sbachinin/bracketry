export const get_rounds_styles = (root_id, options) => `
    #${root_id} {
        font-family: ${options.get_final_value('rootFontFamily')};
    }

    #${root_id} .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
        min-width: 200px;
    }

    #${root_id} .round-wrapper:first-of-type {
        margin-left: ${options.get_final_value('matchHorMargin')}px; /* shrink the first round because he needs no left padding */
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
        margin-top: ${options.get_final_value('matchMinVerticalGap') / 2}px;
        margin-bottom: ${options.get_final_value('matchMinVerticalGap') / 2}px;
        transition: background-color 0.1s ease-out;
        display: flex;
    }

    #${root_id} .match-body .sides {
        flex: 1;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
        border: ${options.get_final_value('connectionLinesWidth')}px solid transparent;
    }

    #${root_id} .match-body .match-status {
        font-size: ${Math.floor(options.get_final_value('matchFontSize') * 0.85)}px;
        background: ${options.get_final_value('rootBackgroundColor')};
        z-index: 2;
        border: ${options.get_final_value('connectionLinesWidth')}px solid ${options.get_final_value('connectionLinesColor')};
        padding: 2px 6px;
        align-self: center;
        margin-right: 2%;
    }

    #${root_id} .match-wrapper.highlighted .match-body .match-status {
        border-color: ${options.get_final_value('highlightedConnectionLinesColor')};
    }

    ${options.get_final_value('onMatchClick')
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
                color: ${options.get_final_value('highlightedPlayerTitleColor')};
            }
        `
        : ''
    }


    #${root_id} .round-wrapper:not(:first-of-type) .match-body {
        padding-left: ${options.get_final_value('matchHorMargin')}px;
    }
    #${root_id} .round-wrapper:not(:last-of-type) .match-body {
        padding-right: ${options.get_final_value('matchHorMargin')}px;
    }
    #${root_id} .round-wrapper:last-of-type {
        margin-right: ${options.get_final_value('matchHorMargin')}px;
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
        color: ${options.get_final_value('connectionLinesColor')}; /* for box-shadow color, not text */
        transition: all 0.1s ease-out;
    }


    #${root_id} .match-wrapper.highlighted .match-lines-area .line-wrapper {
        color: ${options.get_final_value('highlightedConnectionLinesColor')}; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper:nth-child(even) .line-wrapper.upper {
        box-shadow: ${options.get_final_value('connectionLinesWidth')}px 0px 0px 0px;
        border-bottom: ${options.get_final_value('connectionLinesWidth')}px solid ${options.get_final_value('connectionLinesColor')};
    }
    #${root_id} .match-wrapper:nth-child(odd) .line-wrapper.lower {
        box-shadow: ${options.get_final_value('connectionLinesWidth')}px 0px 0px 0px;
        border-top: ${options.get_final_value('connectionLinesWidth')}px solid ${options.get_final_value('connectionLinesColor')};
    }
    #${root_id} .round-wrapper:last-of-type .line-wrapper {
        box-shadow: none !important;
    }
/* highlighted lines */
    #${root_id} .match-wrapper.highlighted .line-wrapper {
        border-color: ${options.get_final_value('highlightedConnectionLinesColor')} !important;
    }
    #${root_id} .match-wrapper.last-highlighted .line-wrapper {
        color: ${options.get_final_value('connectionLinesColor')} !important;
    }


    #${root_id} .side-wrapper.highlighted .players-info,
    #${root_id} .side-wrapper:hover .player-title {
        color: ${options.get_final_value('highlightedPlayerTitleColor')};
    }

    #${root_id} .side-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-top: ${options.get_final_value('matchAxisMargin')}px;
        padding-bottom: ${options.get_final_value('matchAxisMargin')}px;
        padding-right: ${Math.floor(options.get_final_value('matchFontSize') / 3 * 2)}px;
        padding-left: ${Math.floor(options.get_final_value('matchFontSize') / 2)}px;
        color: ${options.get_final_value('matchTextColor')}; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
    }

    #${root_id} .side-wrapper.empty-side {
        pointer-events: none;
    }

    #${root_id} .side-wrapper:last-of-type {
        margin-top: -${options.get_final_value('connectionLinesWidth')}px;
        padding-top: ${options.get_final_value('matchAxisMargin') + options.get_final_value('connectionLinesWidth')}px;
    }

    #${root_id} .match-wrapper.live .match-body .sides {
        border-color: ${options.get_final_value('liveMatchBorderColor')};
        background-color: ${options.get_final_value('liveMatchBackgroundColor')};
    }




    #${root_id} .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
        pointer-events: none; /* to capture clicks on .side-wrapper */
    }

    #${root_id} .side-info-item.entry-status {
        width: ${options.get_final_value('matchFontSize') * 1.5}px;
        font-size: ${options.get_final_value('matchFontSize') - 4}px;
        text-align: center;
    }

    #${root_id} .side-info-item.players-info {
        grid-row-gap: ${options.get_final_value('oneSidePlayersGap')}px;
        flex: 1;
        padding-left: ${options.get_final_value('matchFontSize') / 3 * 2}px;
    }

    #${root_id} .player-wrapper {
        display: flex;
        align-items: center;
    }

    #${root_id} .player-wrapper .nationality {
        width: ${options.get_final_value('matchFontSize') * 1.7}px;
        font-size: ${options.get_final_value('matchFontSize') - 4}px;
        text-align: center;
        margin-right: ${options.get_final_value('matchFontSize') / 2}px;
        display: flex;
        justify-content: center;
    }

    #${root_id} .player-wrapper .nationality > img {
        max-height: ${options.get_final_value('matchFontSize')}px;
    }

    #${root_id} .player-wrapper .player-title {
        flex: 1;
        padding-right: ${options.get_final_value('matchFontSize') * 1.5}px;
        font-family: ${options.get_final_value('playerTitleFontFamily') || options.get_final_value('rootFontFamily')};
        transition: all 0.1s ease-out;
        white-space: nowrap;
    }

    #${root_id} .side-wrapper.looser:not(.highlighted) .player-title,
    #${root_id} .side-wrapper.looser .score {
        opacity: 0.54;
    }
    
    #${root_id} .side-info-item.winner-mark {
        padding-right: ${options.get_final_value('distanceBetweenScorePairs')}px;
    }

    #${root_id} .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
        width: ${options.get_final_value('matchFontSize') / 2.5}px;
        height: ${options.get_final_value('matchFontSize') / 2.5}px;
        margin-left: ${options.get_final_value('matchFontSize') / 2}px;
    }

    #${root_id} .side-info-item.serving-mark.transparent {
        background-color: transparent;
    }

    #${root_id} .side-info-item.score {
        grid-auto-flow: column;
        font-family: ${options.get_final_value('scoreFontFamily') || options.get_final_value('rootFontFamily')};
        grid-column-gap: ${options.get_final_value('distanceBetweenScorePairs')}px;
    }
    #${root_id} .single-score {
        display: flex;
        overflow: visible;
        flex-direction: column;
        align-items: center;
    }

    #${root_id} .tie-break {
        font-size: ${Math.floor(options.get_final_value('matchFontSize') / 3 * 2)}px;
        padding-left: 1px;
        margin-top: -${Math.floor(options.get_final_value('matchFontSize') / 5)}px;
        margin-right: -${Math.floor(options.get_final_value('matchFontSize') / 5)}px;
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
        min-width: ${options.get_final_value('matchFontSize') * 2}px;
        text-align: center;
        border: 1px solid ${options.get_final_value('matchTextColor')};
        padding: 0 ${options.get_final_value('matchFontSize') / 4}px;
        margin-left: ${options.get_final_value('matchFontSize') / 2}px;
    }

    #${root_id} .match-wrapper.live .side-info-item.subscore {
        border-color: #c4c4c4;
    }

    #${root_id} svg.default-winner-svg {
        height: ${options.get_final_value('matchFontSize')}px;
        width: auto;
    }
`