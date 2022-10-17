export const default_border_gray = '#bbbbbb'

export const BUTTONS_POSITIONS = {
    overMatches: 'left and right (on top of matches)',
    gutters: 'left and right (in the gutters)',
    beforeTitles: 'header (before round titles)',
    overTitles: 'header (on top of round titles)',
    hidden: 'hidden'
}

const GENERAL_OPTIONS = {

    mainBorderColor: {
        type: 'string',
        default_value: default_border_gray
    },

    rootBackgroundColor: {
        type: 'string',
        default_value: 'transparent'
    },

    mainVerticalPadding: {
        type: 'pixels',
        default_value: 20,
        min_value: 0
    },

    visibleRoundsCount: {
        type: 'number',
        default_value: 0
    },

    displayWholeRounds: {
        type: 'boolean',
        default_value: false
    },

    useClassicalLayout: {
        type: 'boolean',
        default_value: false
    },

    showScrollbar: {
        type: 'boolean',
        default_value: true
    },

    scrollbarWidth: {
        type: 'pixels',
        default_value: '5',
    },

    scrollbarColor: {
        type: 'string',
        default_value: '#d3d3d3'
    },

    disableHighlight: {
        type: 'boolean',
        default_value: false
    }
}

export const ROUND_TITLE_OPTIONS = {

    getRoundTitleElement: {
        type: 'function_or_null',
        default_value: null
    },

    roundTitlesHeight: {
        type: 'pixels',
        default_value: '50'
    },

    roundTitlesBorderBottomColor: {
        type: 'string',
        default_value: default_border_gray
    },

    roundTitleColor: {
        type: 'string',
        default_value: '#000'
    },
}

export const NAVIGATION_OPTIONS = {
    resetScrollOnNavigation: {
        type: 'boolean',
        default_value: false
    },

    navButtonsPosition: {
        type: 'select',
        options: [ ...Object.keys(BUTTONS_POSITIONS) ],
        default_value: 'gutters'
    },

    navigationButtonsTopDistance: {
        type: 'string',
        default_value: '50%',
        disable_if: options => options.navButtonsPosition !== 'overMatches'
    },

    navigationGutterBorderColor: {
        type: 'string',
        default_value: default_border_gray,
        disable_if: options => options.navButtonsPosition !== 'gutters'
            && options.navButtonsPosition !== 'overTitles'
            && options.navButtonsPosition !== 'beforeTitles'
    },

    defaultNavigationSvgSize: {
        type: 'pixels',
        default_value: '50',
    },
    navigationSvgColor: {
        type: 'string',
        default_value:'#161616',
    },

    leftNavigationButtonBackground: {
        type: 'string',
        default_value: 'transparent',
        disable_if: options => options.navButtonsPosition !== 'gutters'
            && options.navButtonsPosition !== 'overMatches'
    },

    rightNavigationButtonBackground: {
        type: 'string',
        default_value: 'transparent',
        disable_if: options => options.navButtonsPosition !== 'gutters'
            && options.navButtonsPosition !== 'overMatches'
    },

    leftNavigationButtonHTML: {
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        `,
    },
    rightNavigationButtonHTML: {
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        `,
    },
}

export const CONNECTION_LINES_OPTIONS = {
    connectionLinesWidth: {
        type: 'pixels',
        default_value: 2,
        min_value: 0,
    },
    connectionLinesColor: {
        type: 'string',
        default_value: '#dcdcdc'
    },
    highlightedConnectionLinesColor: {
        type: 'string',
        default_value: '#7698ff'
    }
}

export const MATCH_OPTIONS = {
    getMatchElement: {
        type: 'function_or_null',
        default_value: null
    },

    getNationalityHTML: {
        type: 'function_or_null',
        default_value: null,
    },

    getEntryStatusHTML: {
        type: 'function_or_null',
        default_value: null,
    },

    getPlayerTitleHTML: {
        type: 'function_or_null',
        default_value: null,
    },

    getScoresHTML: {
        type: 'function_or_null',
        default_value: null,
    },

    matchMaxWidth: {
        type: 'string',
        /* setting it to specific value by default may lead to very puzzling layout problems on wide matches */
        default_value: 'unset'
    },

    matchMinVerticalGap: {
        type: 'pixels',
        default_value: 25
    },

    matchHorMargin: {
        type: 'pixels',
        default_value: '20'
    },

    matchAxisMargin: {
        type: 'pixels',
        default_value: 4
    },

    oneSidePlayersGap: {
        type: 'pixels',
        default_value: 2,
    },

    liveMatchBorderColor: {
        type: 'string',
        default_value: '#44c985'
    },

    liveMatchBackgroundColor: {
        type: 'string',
        default_value: 'transparent'
    },
    
    distanceBetweenScorePairs: {
        type: 'pixels',
        default_value: 14,
        min_value: 0,
    },

    matchStatusBackgroundColor: {
        type: 'string',
        default_value: '#fff',
    },

    hoveredMatchBorderColor: {
        type: 'string',
        default_value: '#dcdcdc'
    }
}

export const FONTS_OPTIONS = {
    rootFontFamily: {
        type: 'string',
        default_value: 'Open Sans, Roboto, sans-serif'
    },

    roundTitlesFontFamily: {
        type: 'string',
        default_value: 'inherit'
    },

    roundTitlesFontSize: {
        type: 'pixels',
        default_value: 30,
        min_value: 8
    },


    
    matchTextColor: {
        type: 'string',
        default_value: '#000'
    },
    matchFontSize: {
        type: 'pixels',
        default_value: 16,
        min_value: 8,
    },

    playerTitleFontFamily: {
        type: 'string',
        default_value: 'inherit'
    },


    highlightedPlayerTitleColor: {
        type: 'string',
        default_value: '#003ae6'
    },

    scoreFontFamily: {
        type: 'string',
        default_value: 'inherit'
    },
}

export const CALLBACKS = {
    onMatchClick: {
        type: 'function_or_null',
        default_value: null
    },

    onMatchSideClick: {
        type: 'function_or_null',
        default_value: null
    }



}

export const OPTIONS = {
    GENERAL_OPTIONS,
    ROUND_TITLE_OPTIONS,
    NAVIGATION_OPTIONS,
    FONTS_OPTIONS,
    CONNECTION_LINES_OPTIONS,
    MATCH_OPTIONS,
    CALLBACKS
}