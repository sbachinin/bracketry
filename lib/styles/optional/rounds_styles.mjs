export const get_rounds_styles = (get_option) => {
    const sides_are_clickable = (
        typeof get_option('onMatchSideClick') === 'function'
        || get_option('disableHighlight') !== true
    )

    return `
        ## {
            font-family: ${get_option('rootFontFamily')};
        }





        ## .match-wrapper {
            padding-top: ${get_option('matchMinVerticalGap') / 2}px;
            padding-bottom: ${get_option('matchMinVerticalGap') / 2}px;
            padding-left: ${get_option('matchHorMargin')}px;
            padding-right: ${get_option('matchHorMargin')}px;
        }



        ## .round-wrapper .match-body {
            max-width: ${get_option('matchMaxWidth')};
        }

        ## .round-wrapper .match-body:not(:empty) {
            border: ${get_option('connectionLinesWidth')}px solid transparent;
        }



        ## .matches-positioner .round-wrapper.collapsed {
            visibility: hidden;
            ${get_option('useClassicalLayout') !== true
                ? `height: 0; overflow: hidden;`
                : ``
            }
        }



        ## .match-body .sides {
            border: ${get_option('connectionLinesWidth')}px solid transparent;

            /* if CLWidth is even, add a gap of 1px, otherwise two sides may appear at different distance from axis */
            /* TODO: test accuracy of gap when user provides bordered nationality */
            grid-row-gap: ${get_option('connectionLinesWidth')
            + (get_option('connectionLinesWidth') % 2 === 0 ? 1 : 0)
            }px;
        }

        ## .match-body .match-status {
            font-size: ${Math.floor(get_option('matchFontSize') * 0.85)}px;
            background: #fff;
            padding: ${Math.floor(get_option('matchFontSize') / 6)}px ${Math.floor(get_option('matchFontSize') / 2)}px;
            margin: ${Math.floor(get_option('matchFontSize') / 2)}px;
            border-style: solid;
            border-width: ${get_option('connectionLinesWidth')}px;
            border-color: transparent;
            border-color: ${get_option('connectionLinesColor')};
            box-shadow: 0 0 0 1000px ${get_option('matchStatusBackgroundColor')} inset;
        }

        ## .match-wrapper.highlighted .match-body .match-status {
            border-color: ${get_option('highlightedConnectionLinesColor')};
        }

        ${get_option('onMatchClick')
                ? `
                ## .match-wrapper .match-body {
                    cursor: pointer;
                }
                ## .match-wrapper .match-body * {
                    pointer-events: none; /* handle click/hover only on whole body */
                }
                ## .match-wrapper .match-body:hover,
                ## .match-wrapper.live .match-body:hover {
                    border-color: ${get_option('hoveredMatchBorderColor')};
                }
                ## .match-wrapper .match-body:hover .player-title {
                    color: ${get_option('highlightedPlayerTitleColor')};
                }
            `
                : ''
            }












        
        
    /* LINES */

    /* regular lines */
        /* for marginal rounds paddings - padding to lines-areas */

        ## .round-wrapper:first-of-type .match-lines-area {
            left: ${get_option('matchHorMargin')}px;
        }
        ## .round-wrapper:last-of-type .match-lines-area {
            right: ${get_option('matchHorMargin')}px;
        }

        ## .match-wrapper .match-lines-area .line-wrapper {
            color: ${get_option('connectionLinesColor')}; /* for box-shadow color, not text */
        }

        ## .match-wrapper.highlighted .match-lines-area .line-wrapper {
            color: ${get_option('highlightedConnectionLinesColor')}; /* for box-shadow color, not text */
        }

        ## .match-wrapper.odd .line-wrapper.upper {
            box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
            border-bottom: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
        }
        ## .match-wrapper.even .line-wrapper.lower {
            box-shadow: ${get_option('connectionLinesWidth')}px 0px 0px 0px;
            border-top: ${get_option('connectionLinesWidth')}px solid ${get_option('connectionLinesColor')};
        }

    /* highlighted lines */
        ## .match-wrapper.highlighted .line-wrapper {
            border-color: ${get_option('highlightedConnectionLinesColor')} !important;
        }
        ## .match-wrapper.last-highlighted .line-wrapper {
            color: ${get_option('connectionLinesColor')} !important;
        }



        ## .side-wrapper.highlighted .player-title {
            color: ${get_option('highlightedPlayerTitleColor')};
        }




        ${
            sides_are_clickable
            ? `
                ## .side-wrapper {
                    cursor: pointer;
                }
                ## .side-wrapper:hover .player-title {
                    color: ${get_option('highlightedPlayerTitleColor')};
                }
            ` : ''
        }

        ## .side-wrapper {
            padding-top: ${get_option('matchAxisMargin')}px;
            padding-bottom: ${get_option('matchAxisMargin')}px;
            padding-right: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
            padding-left: ${Math.floor(get_option('matchFontSize') / 2)}px;
            color: ${get_option('matchTextColor')}; /* difined at this depth because on upper levels color property is used for box-shadow tricks */
        }

        ## .match-wrapper.live .match-body {
            border-color: ${get_option('liveMatchBorderColor')};
            background-color: ${get_option('liveMatchBackgroundColor')};
        }


        ## .side-info-item.entry-status:not(:empty) {
            margin-right: ${get_option('matchFontSize') / 2}px;
        }

        ## .side-info-item.players-info {
            grid-row-gap: ${get_option('oneSidePlayersGap')}px;
        }

        ## .player-wrapper .nationality:not(:empty) {
            margin-right: ${get_option('matchFontSize') / 2}px;
        }

        ## .player-wrapper .player-title {
            padding-right: ${get_option('matchFontSize') * 1.5}px;
            font-family: ${get_option('playerTitleFontFamily') || get_option('rootFontFamily')};
        }


        ## .side-info-item.winner-mark {
            padding-right: ${get_option('distanceBetweenScorePairs')}px;
        }
        ## .side-wrapper:not(.winner) .winner-mark {
            display: none;
        }

        ## .side-info-item.serving-mark {
            width: ${get_option('matchFontSize') / 2.5}px;
            height: ${get_option('matchFontSize') / 2.5}px;
            margin-left: ${Math.floor(get_option('distanceBetweenScorePairs') * 0.8)}px;
        }

        ## .side-info-item.side-scores {
            font-family: ${get_option('scoreFontFamily') || get_option('rootFontFamily')};
            grid-column-gap: ${get_option('distanceBetweenScorePairs')}px;
        }

        ## .subscore {
            font-size: ${Math.floor(get_option('matchFontSize') / 3 * 2)}px;
            margin-top: -${Math.floor(get_option('matchFontSize') / 5)}px;
            margin-right: -${Math.floor(get_option('matchFontSize') / 5)}px;
        }

        ## .side-info-item.current_score {
            border-color: ${get_option('matchTextColor')};
            padding: 0 ${Math.floor(get_option('matchFontSize') / 3)}px;
            margin-left: ${Math.floor(get_option('distanceBetweenScorePairs') * 0.8)}px;
        }

        ## .match-wrapper.live .side-info-item.current_score {
            border-color: ${get_option('liveMatchBorderColor')};
        }

        ## svg.default-winner-svg {
            height: ${get_option('matchFontSize')}px;
        }
    `

}
