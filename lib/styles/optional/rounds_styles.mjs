export const get_rounds_styles = (root_id, get_option) => `
    #${root_id} {
        font-family: ${get_option('rootFontFamily')};
    }





    #${root_id} .match-wrapper {
        padding-top: ${get_option('matchMinVerticalGap') / 2}px;
        padding-bottom: ${get_option('matchMinVerticalGap') / 2}px;
        padding-left: ${get_option('matchHorMargin')}px;
        padding-right: ${get_option('matchHorMargin')}px;
    }



    #${root_id} .round-wrapper .match-body {
        max-width: ${get_option('matchMaxWidth')}px;
        border: ${get_option('connectionLinesWidth')}px solid transparent;
    }

    #${root_id} .match-body .sides {
        border: ${get_option('connectionLinesWidth')}px solid transparent;

        /* if CLWidth is even, add a gap of 1px, otherwise two sides may appear at different distance from axis */
        /* TODO: test accuracy of gap when user provides bordered nationality */
        grid-row-gap: ${
            get_option('connectionLinesWidth')
            + (get_option('connectionLinesWidth') % 2 === 0 ? 1 : 0)
        }px;
    }

    #${root_id} .match-body .match-status {
        font-size: ${Math.floor(get_option('matchFontSize') * 0.85)}px;
        background: #fff;
        padding: ${Math.floor(get_option('matchFontSize') / 6)}px ${Math.floor(get_option('matchFontSize') / 2)}px;
        margin: ${Math.floor(get_option('matchFontSize') / 2)}px;
        border: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
        box-shadow: 0 0 0 1000px ${get_option('matchStatusBackgroundColor')} inset;
    }

    #${root_id} .match-wrapper.highlighted .match-body .match-status {
        border-color: ${get_option('highlightedConnectionLinesColor')};
    }

    ${get_option('onMatchClick')
        ? `
            #${root_id} .match-wrapper .match-body {
                cursor: pointer;
            }
            #${root_id} .match-wrapper .match-body * {
                pointer-events: none; /* handle click/hover only on whole body */
            }
            #${root_id} .match-wrapper .match-body:hover,
            #${root_id} .match-wrapper.live .match-body:hover {
                border-color: ${get_option('hoveredMatchBorderColor')};
            }
            #${root_id} .match-wrapper .match-body:hover .player-title {
                color: ${get_option('highlightedPlayerTitleColor')};
            }
        `
        : ''
    }












    
    
/* LINES */

/* regular lines */
    /* for marginal rounds paddings - padding to lines-areas */

    #${root_id}:not(.mobile) .round-wrapper:first-of-type .match-lines-area {
        left: ${get_option('matchHorMargin')}px;
    }
    #${root_id}:not(.mobile) .round-wrapper:last-of-type .match-lines-area {
        right: ${get_option('matchHorMargin')}px;
    }

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









    #${root_id} .side-wrapper.highlighted .player-title,
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
        /* TODO why?
        margin-top: -${get_option('connectionLinesWidth')}px;
        padding-top: ${get_option('matchAxisMargin') + get_option('connectionLinesWidth')}px; */
    }

    #${root_id} .match-wrapper.live .match-body {
        border-color: ${get_option('liveMatchBorderColor')};
        background-color: ${get_option('liveMatchBackgroundColor')};
    }


    #${root_id} .side-info-item.entry-status:not(:empty) {
        margin-right: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .side-info-item.players-info {
        grid-row-gap: ${get_option('oneSidePlayersGap')}px;
    }

    #${root_id} .player-wrapper .nationality:not(:empty) {
        margin-right: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .player-wrapper .player-title {
        padding-right: ${get_option('matchFontSize') * 1.5}px;
        font-family: ${get_option('playerTitleFontFamily') || get_option('rootFontFamily')};
    }


    #${root_id} .side-info-item.winner-mark {
        padding-right: ${get_option('distanceBetweenScorePairs')}px;
    }
    #${root_id} .side-wrapper:not(.winner) .winner-mark {
        display: none;
    }

    #${root_id} .side-info-item.serving-mark {
        width: ${get_option('matchFontSize') / 2.5}px;
        height: ${get_option('matchFontSize') / 2.5}px;
        margin-left: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
    }

    #${root_id} .side-info-item.side-scores {
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
        border-width: 1px;
        border-style: solid;
        border-color: ${get_option('matchTextColor')};
        padding: 0 ${get_option('matchFontSize') / 4}px;
        margin-left: ${get_option('matchFontSize') / 2}px;
    }

    #${root_id} .match-wrapper.live .side-info-item.subscore {
        border-color: ${get_option('liveMatchBorderColor')};
    }

    #${root_id} .side-info-item.subscore:empty {
        display: none;
    }

    #${root_id} svg.default-winner-svg {
        height: ${get_option('matchFontSize')}px;
    }
`