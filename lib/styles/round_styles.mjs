export const get_rounds_styles = (root_id, get_option) => `
    #${root_id} {
        font-family: ${get_option('rootFontFamily')};
    }

    #${root_id} .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
        min-width: 100px;
        max-width: 100%;
    }

    #${root_id} .round-wrapper.hidden {
        display: none;
    }




    #${root_id} .round-fake-padding {
        position: absolute;
        z-index: 2;
        top: 0;
        bottom: 0;
        width: ${get_option('matchHorMargin')};
        background: ${get_option('rootBackgroundColor')};
    }
    #${root_id} .round-fake-padding.left {
        left: 0;
    }
    #${root_id} .round-fake-padding.right {
        right: 0;
    }





    #${root_id} .match-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        min-height: 40px;
        padding-top: ${get_option('matchMinVerticalGap') / 2}px;
        padding-bottom: ${get_option('matchMinVerticalGap') / 2}px;
        padding-left: ${get_option('matchHorMargin')};
        padding-right: ${get_option('matchHorMargin')};
        box-sizing: border-box;
    }
    


    #${root_id} .round-wrapper .match-body {
        width: 100%;
        transition: background-color 0.1s ease-out;
        display: flex;
        max-width: ${get_option('matchMaxWidth')}px;
    }

    #${root_id} .match-body .sides {
        flex: 1;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
        grid-template-columns: minmax(0, 1fr);
        border: ${get_option('connectionLinesWidth')}px solid transparent;
    }

    #${root_id} .match-body .match-status {
        font-size: ${Math.floor(get_option('matchFontSize') * 0.85)}px;
        background: ${get_option('rootBackgroundColor')};
        z-index: 2;
        border: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
        padding: 2px 6px;
        align-self: center;
        margin-right: 2%;
    }

    #${root_id} .match-wrapper.highlighted .match-body .match-status {
        border-color: ${get_option('highlightedConnectionLinesColor')};
    }

    ${get_option('onMatchClick')
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
                color: ${get_option('highlightedPlayerTitleColor')};
            }
        `
        : ''
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
        color: ${get_option('connectionLinesColor')}; /* for box-shadow color, not text */
        transition: color 0.1s ease-out, border-color 0.1s ease-out;
    }


    #${root_id} .match-wrapper.highlighted .match-lines-area .line-wrapper {
        color: ${get_option('highlightedConnectionLinesColor')}; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper:nth-child(even) .line-wrapper.upper {
        box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
        border-bottom: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
    }
    #${root_id} .match-wrapper:nth-child(odd) .line-wrapper.lower {
        box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
        border-top: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
    }
    #${root_id} .round-wrapper:last-of-type .line-wrapper {
        box-shadow: none !important;
    }
/* highlighted lines */
    #${root_id} .match-wrapper.highlighted .line-wrapper {
        border-color: ${get_option('highlightedConnectionLinesColor')} !important;
    }
    #${root_id} .match-wrapper.last-highlighted .line-wrapper {
        color: ${get_option('connectionLinesColor')} !important;
    }


    #${root_id} .side-wrapper.highlighted .players-info,
    #${root_id} .side-wrapper:hover .player-title {
        color: ${get_option('highlightedPlayerTitleColor')};
    }

    #${root_id} .side-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-top: ${get_option('matchAxisMargin')}px;
        padding-bottom: ${get_option('matchAxisMargin')}px;
        padding-right: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
        padding-left: ${Math.floor(get_option('matchFontSize') / 2)}px;
        color: ${get_option('matchTextColor')}; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
    }

    #${root_id} .side-wrapper.empty-side {
        pointer-events: none;
    }

    #${root_id} .side-wrapper:last-of-type {
        margin-top: -${get_option('connectionLinesWidth')}px;
        padding-top: ${get_option('matchAxisMargin') + get_option('connectionLinesWidth')}px;
    }

    #${root_id} .match-wrapper.live .match-body .sides {
        border-color: ${get_option('liveMatchBorderColor')};
        background-color: ${get_option('liveMatchBackgroundColor')};
    }




    #${root_id} .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
        pointer-events: none; /* to capture clicks on .side-wrapper */
    }

    #${root_id} .side-info-item.entry-status {
        width: ${get_option('matchFontSize') * 1.5}px;
        font-size: ${get_option('matchFontSize') - 4}px;
        text-align: center;
    }

    #${root_id} .side-info-item.players-info {
        grid-row-gap: ${get_option('oneSidePlayersGap')}px;
        flex: 1;
        padding-left: ${get_option('matchFontSize') / 3 * 2}px;
        min-width: 0;
    }

    #${root_id} .player-wrapper {
        display: flex;
        align-items: center;
        min-width: 0;
    }

    #${root_id} .player-wrapper .nationality {
        width: ${get_option('matchFontSize') * 1.7}px;
        font-size: ${get_option('matchFontSize') - 4}px;
        text-align: center;
        margin-right: ${get_option('matchFontSize') / 2}px;
        display: flex;
        justify-content: center;
        flex-shrink: 0;
    }

    #${root_id} .player-wrapper .nationality > img {
        max-height: ${get_option('matchFontSize')}px;
    }

    #${root_id} .player-wrapper .player-title {
        flex: 1;
        padding-right: ${get_option('matchFontSize') * 1.5}px;
        font-family: ${get_option('playerTitleFontFamily') || get_option('rootFontFamily')};
        transition: color 0.1s ease-out, opacity 0.1s ease-out;
        white-space: nowrap;
        min-width: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
    }

    #${root_id} .side-wrapper.looser:not(.highlighted) .player-title,
    #${root_id} .side-wrapper .single-score:not(.winner) {
        opacity: 0.54;
    }
    
    #${root_id} .side-info-item.winner-mark {
        padding-right: ${get_option('distanceBetweenScorePairs')}px;
    }

    #${root_id} .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
        width: ${get_option('matchFontSize') / 2.5}px;
        height: ${get_option('matchFontSize') / 2.5}px;
        margin-left: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .side-info-item.serving-mark.transparent {
        background-color: transparent;
    }

    #${root_id} .side-info-item.score {
        grid-auto-flow: column;
        font-family: ${get_option('scoreFontFamily') || get_option('rootFontFamily')};
        grid-column-gap: ${get_option('distanceBetweenScorePairs')}px;
    }
    #${root_id} .single-score {
        display: flex;
        overflow: visible;
        flex-direction: column;
        align-items: center;
    }

    #${root_id} .tie-break {
        font-size: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
        padding-left: 1px;
        margin-top: -${Math.floor(get_option('matchFontSize') / 5)}px;
        margin-right: -${Math.floor(get_option('matchFontSize') / 5)}px;
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
        min-width: ${get_option('matchFontSize') * 2}px;
        text-align: center;
        border: 1px solid ${get_option('matchTextColor')};
        padding: 0 ${get_option('matchFontSize') / 4}px;
        margin-left: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .match-wrapper.live .side-info-item.subscore {
        border-color: #c4c4c4;
    }

    #${root_id} svg.default-winner-svg {
        height: ${get_option('matchFontSize')}px;
        width: auto;
    }
`