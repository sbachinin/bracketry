export const get_rounds_styles = (root_id, get_option) => `
    #${root_id} {
        font-family: ${get_option('rootFontFamily')};
    }




    #${root_id} .round-fake-padding {
        width: ${get_option('matchHorMargin')}px;
        background: ${get_option('rootBackgroundColor')};
    }



    #${root_id} .match-wrapper {
        padding-top: ${get_option('matchMinVerticalGap') / 2}px;
        padding-bottom: ${get_option('matchMinVerticalGap') / 2}px;
        padding-left: ${get_option('matchHorMargin')}px;
        padding-right: ${get_option('matchHorMargin')}px;
    }



    #${root_id} .round-wrapper .match-body {
        max-width: ${get_option('matchMaxWidth')}px;
    }

    #${root_id} .match-body .sides {
        border: ${get_option('connectionLinesWidth')}px solid transparent;
    }

    #${root_id} .match-body .match-status {
        font-size: ${Math.floor(get_option('matchFontSize') * 0.85)}px;
        background: ${get_option('rootBackgroundColor')};
        border: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
    }

    #${root_id} .match-wrapper.highlighted .match-body .match-status {
        border-color: ${get_option('highlightedConnectionLinesColor')};
    }

    ${get_option('onMatchClick')
        ? `
            #${root_id} .match-body {
                pointer-events: auto;
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












    
    
/* LINES */

/* regular lines */
    #${root_id} .match-wrapper .match-lines-area .line-wrapper {
        color: ${get_option('connectionLinesColor')}; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper.highlighted .match-lines-area .line-wrapper {
        color: ${get_option('highlightedConnectionLinesColor')}; /* for box-shadow color, not text */
    }

    #${root_id} .match-wrapper.odd .line-wrapper.upper {
        box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
        border-bottom: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
    }
    #${root_id} .match-wrapper.even .line-wrapper.lower {
        box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
        border-top: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
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
        padding-top: ${get_option('matchAxisMargin')}px;
        padding-bottom: ${get_option('matchAxisMargin')}px;
        padding-right: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
        padding-left: ${Math.floor(get_option('matchFontSize') / 2)}px;
        color: ${get_option('matchTextColor')}; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
    }

    #${root_id} .side-wrapper:last-of-type {
        margin-top: -${get_option('connectionLinesWidth')}px;
        padding-top: ${get_option('matchAxisMargin') + get_option('connectionLinesWidth')}px;
    }

    #${root_id} .match-wrapper.live .match-body .sides {
        border-color: ${get_option('liveMatchBorderColor')};
        background-color: ${get_option('liveMatchBackgroundColor')};
    }



    #${root_id} .side-info-item.entry-status {
        width: ${get_option('matchFontSize') * 1.5}px;
        font-size: ${get_option('matchFontSize') - 4}px;
    }

    #${root_id} .side-info-item.players-info {
        grid-row-gap: ${get_option('oneSidePlayersGap')}px;
        padding-left: ${get_option('matchFontSize') / 3 * 2}px;
    }

    #${root_id} .player-wrapper .nationality {
        width: ${get_option('matchFontSize') * 1.7}px;
        font-size: ${get_option('matchFontSize') - 4}px;
        margin-right: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .player-wrapper .nationality > img {
        max-height: ${get_option('matchFontSize')}px;
    }

    #${root_id} .player-wrapper .player-title {
        padding-right: ${get_option('matchFontSize') * 1.5}px;
        font-family: ${get_option('playerTitleFontFamily') || get_option('rootFontFamily')};
    }

    
    #${root_id} .side-info-item.winner-mark {
        padding-right: ${get_option('distanceBetweenScorePairs')}px;
    }

    #${root_id} .side-info-item.serving-mark {
        width: ${get_option('matchFontSize') / 2.5}px;
        height: ${get_option('matchFontSize') / 2.5}px;
        margin-left: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .side-info-item.score {
        font-family: ${get_option('scoreFontFamily') || get_option('rootFontFamily')};
        grid-column-gap: ${get_option('distanceBetweenScorePairs')}px;
    }

    #${root_id} .tie-break {
        font-size: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
        margin-top: -${Math.floor(get_option('matchFontSize') / 5)}px;
        margin-right: -${Math.floor(get_option('matchFontSize') / 5)}px;
    }

    #${root_id} .side-info-item.subscore {
        min-width: ${get_option('matchFontSize') * 2}px;
        border: 1px solid ${get_option('matchTextColor')};
        padding: 0 ${get_option('matchFontSize') / 4}px;
        margin-left: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} svg.default-winner-svg {
        height: ${get_option('matchFontSize')}px;
    }
`