export const default_border_gray = '#bbbbbb'

const arrow_right = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>`

const GENERAL_OPTIONS = {
    width: {
        type: 'string',
        default_value: '100%'
    },

    height: {
        type: 'string',
        default_value: '100%'
    },

    fullscreen: {
        type: 'boolean',
        default_value: false,
        non_updatable: true
    },

    fullscreenBgColor: {
        type: 'string',
        default_value: '#fff'
    },

    rootBgColor: {
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

    disableHighlight: {
        type: 'boolean',
        default_value: false
    }
}

const BORDERS_OPTIONS = {

    rootBorderColor: {
        type: 'string',
        default_value: default_border_gray
    },

    wrapperBorderColor: {
        type: 'string',
        default_value: ''
    },

    roundTitlesBorderColor: {
        type: 'string',
        default_value: ''
    },

    scrollGutterBorderColor: {
        type: 'string',
        default_value: ''
    },

    navigationGutterBorderColor: {
        type: 'string',
        default_value: ''
    },

    liveMatchBorderColor: {
        type: 'string',
        default_value: '#44c985'
    },

    hoveredMatchBorderColor: {
        type: 'string',
        default_value: ''
    }
}

const ROUND_TITLE_OPTIONS = {

    getRoundTitleElement: {
        type: 'function_or_null',
        default_value: null
    },

    roundTitlesVerticalPadding: {
        type: 'pixels',
        default_value: 8
    },

    roundTitleColor: {
        type: 'string',
        default_value: '#000'
    },
}

const NAVIGATION_OPTIONS = {

    navButtonsPosition: {
        type: 'select',
        options: [
            'overMatches',
            'gutters',
            'beforeTitles',
            'overTitles',
            'hidden'
        ],
        default_value: 'gutters'
    },

    navButtonsTopDistance: {
        type: 'string',
        default_value: '50%'
    },

    defaultNavigationIconSize: {
        type: 'pixels',
        default_value: '34',
    },
    navButtonSvgColor: {
        type: 'string',
        default_value: '#161616',
    },

    leftNavigationButtonHTML: {
        type: 'multiline_string',
        default_value: `<div class="default-nav-icon">
            <div style="transform: rotate(180deg); display: flex;">${arrow_right}</div>
        </div>`,
    },

    rightNavigationButtonHTML: {
        type: 'multiline_string',
        default_value: `<div class="default-nav-icon">${arrow_right}</div>`,
    },
}

const SCROLL_OPTIONS = {
    verticalScrollMode: {
        type: 'select',
        options: ['native', 'buttons', 'mixed'],
        default_value: 'native',
        non_updatable: true
    },

    syntheticScrollAmount: {
        type: 'pixels',
        default_value: 300
    },

    resetScrollOnNavigation: {
        type: 'boolean',
        default_value: false
    },

    scrollButtonsPosition: {
        type: 'select',
        options: ['gutters', 'overMatches'],
        default_value: 'gutters'
    },

    scrollUpButtonHTML: {
        type: 'multiline_string',
        default_value: `<div class="default-scroll-icon">
            <div style="transform: rotate(-90deg); display: flex;">${arrow_right}</div>
        </div>`,
    },

    scrollDownButtonHTML: {
        type: 'multiline_string',
        default_value: `<div class="default-scroll-icon">
            <div style="transform: rotate(90deg); display: flex;">${arrow_right}</div>
        </div>`,
    },

    defaultScrollIconSize: {
        type: 'pixels',
        default_value: '34',
    },
    scrollButtonSvgColor: {
        type: 'string',
        default_value: '#161616',
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
}

const CONNECTION_LINES_OPTIONS = {
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

const MATCH_OPTIONS = {
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
        type: 'pixels',
        /* setting it to specific small value by default may lead to very puzzling layout problems on wide matches */
        default_value: 1000
    },

    matchMinVerticalGap: {
        type: 'pixels',
        default_value: 25
    },

    matchHorMargin: {
        type: 'pixels',
        default_value: 20
    },

    matchAxisMargin: {
        type: 'pixels',
        default_value: 4
    },

    oneSidePlayersGap: {
        type: 'pixels',
        default_value: 2,
    },

    liveMatchBgColor: {
        type: 'string',
        default_value: 'transparent'
    },

    distanceBetweenScorePairs: {
        type: 'pixels',
        default_value: 14,
        min_value: 0,
    },

    matchStatusBgColor: {
        type: 'string',
        default_value: '#fff',
    },
}

const FONTS_OPTIONS = {
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

const CALLBACKS = {
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
    BORDERS_OPTIONS,
    ROUND_TITLE_OPTIONS,
    NAVIGATION_OPTIONS,
    SCROLL_OPTIONS,
    FONTS_OPTIONS,
    CONNECTION_LINES_OPTIONS,
    MATCH_OPTIONS,
    CALLBACKS
}