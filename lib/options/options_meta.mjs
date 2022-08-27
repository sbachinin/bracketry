import { BUTTONS_POSITIONS, default_border_gray } from '../constants.mjs'

// TODO perhaps there is some stuff in this meta that should not be included in a prod bundle
// (surely explanations has to be cut off) 

const GENERAL_OPTIONS = {

    mainBorderColor: {
        title: 'Main border color',
        type: 'string',
        default_value: default_border_gray
    },

    rootBackgroundColor: {
        title: 'Root background color',
        type: 'string',
        default_value: '#ffffff'
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

    //TODO disableHighlight
}

export const ROUND_TITLE_OPTIONS = {

    // TODO implement this option
    getRoundTitleElement: {
        title: 'Round title render function',
        type: 'function_or_null',
        default_value: null,
        explanation: `Here you can provide your own round title element.
getRoundTitleElement will be called with 1 argument which is a round index (0-based).
Whatever you return from this function will be injected in the round titles bar.
`
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
    navButtonsPosition: {
        title: 'Navigation (switch rounds) buttons position',
        type: 'select',
        options: [ ...Object.keys(BUTTONS_POSITIONS) ],
        default_value: 'gutters',
        explanation: Object.entries(BUTTONS_POSITIONS).map(
            ([pos_name, pos_title]) => `<span style="text-decoration: underline;">${pos_name}</span>: ${pos_title}`
        ).join('<br />')
    },

    navigationButtonsTopDistance: {
        title: 'Navigation buttons distance from content top, in any units',
        type: 'string',
        default_value: '50%',
        disable_if: options => options.navButtonsPosition !== 'overMatches',
        explanation: `navigationButtonsTopDistance option takes effect only when navButtonsPosition is set to 'overMatches'`
    },

    navigationGutterBorderColor: {
        title: 'Navigation gutter border color',
        type: 'string',
        default_value: default_border_gray,
        disable_if: options => options.navButtonsPosition !== 'gutters'
            && options.navButtonsPosition !== 'overTitles'
            && options.navButtonsPosition !== 'beforeTitles',
        explanation: `navigationGutterBorderColor options is applied only when navButtonsPosition is 'gutters' or 'overTitles' or 'beforeTitles'`
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
        default_value: 'transparent', // 'linear-gradient(to left, transparent, #fff 50%)',
        explanation: `leftNavigationButtonBackground options is applied if navButtonsPosition is 'gutters' or 'overMatches'`
    },

    rightNavigationButtonBackground: {
        title: 'Right navigation button background',
        type: 'string',
        default_value: 'transparent', // 'linear-gradient(to right, transparent, #fff 50%)',
        explanation: `rightNavigationButtonBackground options is applied if navButtonsPosition is 'gutters' or 'overMatches'`
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
        default_value: null,
        explanation: `Here you can provide your own match element which will be injected in place of the built-in match markup.
getMatchElement will be called with 3 args:
    1) round index (0-based),
    2) match order (index of a match within a round) (0-based)
    3) all data with which createPlayoffs() were called
`
    },

    matchMaxWidth: {
        title: 'Max match width',
        type: 'pixels',
        default_value: 450,
        explanation: `Specifying smaller width here will help easy-playoffs draw a greater number of rounds within a given width`
    },

    matchMinVerticalGap: {
        title: 'Minimal vertical distance between matches',
        type: 'pixels',
        default_value: 25,
        explanation: `Minimal distance means a distance between matches of the leftmost visible round when the visible height isn't enough to contain all matches of this round`
    },

    matchHorMargin: {
        title: `Matches' horizontal margins`,
        type: 'pixels',
        default_value: '20',
        explanation: `Note that in "mobile" (1-round) layout this option will take no effect. Instead a margin of 1.5% will be used`
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
    
    entryStatusWidthRatio: {
        title: 'Entry status width ratio',
        type: 'number', 
        default_value: 2,
        explanation: `Width of entry status element is a product of matchFontSize and entryStatusWidthRatio`
    },

    distanceBetweenScorePairs: {
        title: 'Distance between scores (e.g. between sets in tennis)',
        type: 'pixels',
        default_value: 14,
        min_value: 0,
    },
    
    // TODO revise this idea and maybe implement
    showMatchStatusWithScores: {
        title: 'Allow to display match status field together with score',
        type: 'boolean',
        default_value: false,
        explanation: `By default (when this options is set to false) match status is rendered
        only if any of match's sides has "score" array with at least one item.
        Rendering status and score at the same time can make your matches very wide.
        `
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
        default_value: '#003ae6',
        explanation: `This color is applied to a players' titles when
            <br />
            1) contestant is under cursor
            <br />
            2) contestant's match history is highlighted`
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
        default_value: null,
        explanation: `
            Your function will be called with a data of a match that was clicked.
            <br /><br />
            Example:
            <div class="code">{
    onMatchClick: (match) => {
        location.href = \`/matches/\${match.id}\`
    }
}
</div>
<br />
If you provide this function, contestant's match history will not be highlighted when you click a match's side`
    },

    onMatchSideClick: {
        title: 'What happens when a user clicks on a side of a match (JS function)',
        type: 'function_or_null',
        default_value: null,
        explanation: `
            Your function will be called with
            <br />
            1) data of a contestant which was clicked,
            <br />
            2) this contestant's id,
            <br />
            3) data of a match within which a side was clicked
            <br />
            <br />
            Example:
            <div class="code">{
    onMatchSideClick: (contestant, contestant_id, match) => {
        location.href = \`/teams/\${contestant_id}\`
    }
}
</div>
            <br />
            <br />
            If you provide this function, it will discard the default behaviour: contestant's match history will not be highlighted when you click a match's side`
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