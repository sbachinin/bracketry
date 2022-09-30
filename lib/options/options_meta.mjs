import { BUTTONS_POSITIONS, default_border_gray } from '../constants.mjs'

const GENERAL_OPTIONS = {

    mainBorderColor: {
        title: 'Main border color',
        type: 'string',
        default_value: default_border_gray
    },

    rootBackgroundColor: {
        title: 'Root background color',
        type: 'string',
        default_value: 'transparent'
    },

    mainVerticalPadding: {
        title: 'Main vertical padding (before first match and after last match)',
        type: 'pixels',
        default_value: 20,
        min_value: 0
    },

    visibleRoundsCount: {
        title: `How many rounds to display (0 for 'auto', i.e. as much as possible). Only integers please`,
        type: 'number',
        default_value: 0
    },

    displayWholeRounds: {
        title: `Display a whole number of rounds`,
        type: 'boolean',
        default_value: false
    },

    useClassicalLayout: {
        title: 'Use classical layout',
        type: 'boolean',
        default_value: false
    },

    showScrollbar: {
        title: 'Should show scrollbar',
        type: 'boolean',
        default_value: true
    },

    scrollbarWidth: {
        title: 'Scrollbar width',
        type: 'pixels',
        default_value: '5',
    },

    scrollbarColor: {
        title: 'Scrollbar color',
        type: 'string',
        default_value: '#d3d3d3'
    },

    disableHighlight: {
        title: `Don't highlight contestant history on click`,
        type: 'boolean',
        default_value: false
    }
}

export const ROUND_TITLE_OPTIONS = {

    // TODO implement this option
    getRoundTitleElement: {
        title: 'Round title render function',
        type: 'function_or_null',
        default_value: null
    },

    roundTitlesHeight: {
        title: 'Round titles height',
        type: 'pixels',
        default_value: '50'
    },

    roundTitlesBorderBottomColor: {
        title: 'Round titles bottom border-color',
        type: 'string',
        default_value: default_border_gray
    },

    roundTitleColor: {
        title: 'Round title color',
        type: 'string',
        default_value: '#000'
    },
}

export const NAVIGATION_OPTIONS = {
    resetScrollOnNavigation: {
        title: 'Reset vertical scroll on navigation?',
        type: 'boolean',
        default_value: false
    },

    navButtonsPosition: {
        title: 'Navigation (switch rounds) buttons position',
        type: 'select',
        options: [ ...Object.keys(BUTTONS_POSITIONS) ],
        default_value: 'gutters'
    },

    navigationButtonsTopDistance: {
        title: 'Navigation buttons distance from content top, in any units',
        type: 'string',
        default_value: '50%',
        disable_if: options => options.navButtonsPosition !== 'overMatches'
    },

    navigationGutterBorderColor: {
        title: 'Navigation gutter border color',
        type: 'string',
        default_value: default_border_gray,
        disable_if: options => options.navButtonsPosition !== 'gutters'
            && options.navButtonsPosition !== 'overTitles'
            && options.navButtonsPosition !== 'beforeTitles'
    },

    defaultNavigationSvgSize: {
        title: 'Default navigation arrow size',
        type: 'pixels',
        default_value: '50',
    },
    navigationSvgColor: {
        title: 'Navigation buttons svg color',
        type: 'string',
        default_value:'#161616',
    },

    leftNavigationButtonBackground: {
        title: 'Left navigation button background',
        type: 'string',
        default_value: 'transparent'
    },

    rightNavigationButtonBackground: {
        title: 'Right navigation button background',
        type: 'string',
        default_value: 'transparent'
    },

    leftNavigationButtonHTML: {
        title: 'Inner HTML of LEFT navigation button (<svg> / <img> / whatever)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        `,
    },
    rightNavigationButtonHTML: {
        title: 'Inner HTML of RIGHT navigation button (<svg> / <img> / whatever)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        `,
    },
}

export const CONNECTION_LINES_OPTIONS = {
    connectionLinesWidth: {
        title: 'Connection lines width',
        type: 'pixels',
        default_value: 2,
        min_value: 0,
    },
    connectionLinesColor: {
        title: 'Connection lines color',
        type: 'string',
        default_value: '#dcdcdc'
    },
    highlightedConnectionLinesColor: {
        title: 'Highlighted connection lines color',
        type: 'string',
        default_value: '#7698ff'
    }
}

export const MATCH_OPTIONS = {

    // TODO: investigate if it can handle a React element
    getMatchElement: {
        title: 'Match render function',
        type: 'function_or_null',
        default_value: null
    },

    getNationalityHTML: {
        title: 'Nationality render function',
        type: 'function_or_null',
        default_value: null,
        updatable: false
    },

    getEntryStatusHTML: {
        title: 'Entry status render function',
        type: 'function_or_null',
        default_value: null,
        updatable: false
    },

    matchMaxWidth: {
        title: 'Max match width',
        type: 'string',
        /* setting it to specific value by default may lead to very puzzling layout problems on wide matches */
        default_value: 'unset'
    },

    matchMinVerticalGap: {
        title: 'Minimal vertical distance between matches',
        type: 'pixels',
        default_value: 25
    },

    matchHorMargin: {
        title: `Matches' horizontal margins`,
        type: 'pixels',
        default_value: '20'
    },

    matchAxisMargin: {
        title: `Vertical distance between match axis and each side of a match`,
        type: 'pixels',
        default_value: 4
    },

    oneSidePlayersGap: {
        title: 'Vertical distance between players of one side of a match (e.g. of tennis doubles)',
        type: 'pixels',
        default_value: 2,
    },

    liveMatchBorderColor: {
        title: 'Live match border color',
        type: 'string',
        default_value: '#44c985'
    },

    liveMatchBackgroundColor: {
        title: 'Live match background color',
        type: 'string',
        default_value: 'transparent'
    },
    
    distanceBetweenScorePairs: {
        title: 'Distance between scores (e.g. between sets in tennis)',
        type: 'pixels',
        default_value: 14,
        min_value: 0,
    },

    matchStatusBackgroundColor: {
        title: 'Background color of a match status badge',
        type: 'string',
        default_value: '#fff',
    },

    hoveredMatchBorderColor: {
        title: 'Hovered match border color (applied when options.onMatchClick is provided)',
        type: 'string',
        default_value: '#dcdcdc'
    }
}

export const FONTS_OPTIONS = {
    rootFontFamily: {
        title: 'Root font-family (applied to blocks with an "inherit" font-family)',
        type: 'string',
        default_value: 'Open Sans, Roboto, sans-serif'
    },

    roundTitlesFontFamily: {
        title: 'Round titles font-family',
        type: 'string',
        default_value: 'inherit'
    },

    roundTitlesFontSize: {
        title: 'Round titles font-size',
        type: 'pixels',
        default_value: 30,
        min_value: 8
    },


    
    matchTextColor: {
        title: 'Match text color',
        type: 'string',
        default_value: '#000'
    },
    matchFontSize: {
        title: 'Match font-size',
        type: 'pixels',
        default_value: 16,
        min_value: 8,
    },

    playerTitleFontFamily: {
        title: 'Player title font family',
        type: 'string',
        default_value: 'inherit'
    },


    highlightedPlayerTitleColor: {
        title: 'Highlighted player title color',
        type: 'string',
        default_value: '#003ae6'
    },

    scoreFontFamily: {
        title: 'Score font-family (provide "inherit" to use rootFontFamily option)',
        type: 'string',
        default_value: 'inherit'
    },
}

export const CALLBACKS = {
    onMatchClick: {
        title: 'What happens when a user clicks on a match (JS function)',
        type: 'function_or_null',
        default_value: null
    },

    onMatchSideClick: {
        title: 'What happens when a user clicks on a side of a match (JS function)',
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