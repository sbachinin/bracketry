import { Data, Match, Player, Round, Side } from "./lib/data/data"

// TODO check if all options present here

type Options = {
    width: string,
    height: string,
    rootBorderColor: string,
    wrapperBorderColor: string,

    verticalScrollMode: 'buttons' | 'native' | 'mixed',
    scrollButtonsPosition: 'gutters' | 'overMatches',
    showScrollbar: boolean,
    scrollbarWidth: number,
    scrollbarColor: string,
    scrollButtonSvgColor: string,
    scrollGutterBorderColor: string,
    scrollButtonPadding: string,
    scrollUpButtonHTML: string,
    scrollDownButtonHTML: string,
    resetScrollOnNavigation: boolean,
    buttonScrollAmount: number,
    scrollButtonArrowSize: number,
    
    rootBgColor: string,
    mainVerticalPadding: number,
    visibleRoundsCount: number,
    displayWholeRounds: boolean,
    useClassicalLayout: boolean,
    disableHighlight: boolean,
    roundTitlesVerticalPadding: number,
    roundTitlesBorderColor: string,
    roundTitleColor: string,
    hoveredMatchBorderColor: string,
    matchStatusBgColor: string,

    navButtonsPosition: 'overMatches' | 'gutters' | 'beforeTitles' | 'overTitles' | 'hidden',
    navButtonsTopDistance: string,
    navGutterBorderColor: string,
    navButtonArrowSize: number,
    navButtonSvgColor: string,
    leftNavButtonHTML: string,
    rightNavButtonHTML: string,
    navButtonPadding: string,
    
    rootFontFamily: string,
    roundTitlesFontFamily: string,
    roundTitlesFontSize: number,
    matchTextColor: string,
    matchFontSize: number,
    playerTitleFontFamily: string,
    highlightedPlayerTitleColor: string,
    scoreFontFamily: string,
    connectionLinesWidth: number,
    connectionLinesColor: string,
    highlightedConnectionLinesColor: string,
    matchMaxWidth: number,
    matchMinVerticalGap: number,
    matchHorMargin: number,
    matchAxisMargin: number,
    oneSidePlayersGap: number,
    liveMatchBorderColor: string,
    liveMatchBgColor: string,
    distanceBetweenScorePairs: number,
    onMatchClick: (match: Partial<Match>) => void,

    onMatchSideClick: (match: Partial<Match>, sideIndex: number) => void,

    getRoundTitleElement: (roundData: Round, roundIndex: number) => Element,
    getMatchElement: (roundIndex: number, matchOrder: number) => Element | null,
    getNationalityHTML: (
        player: Player,
        context: { roundIndex: number, matchOrder: number, contestantId: string, playerIndex: number }
    ) => string,
    getEntryStatusHTML: (
        entryStatus: any,
        context: { roundIndex: number, matchOrder: number, contestantId: string }
    ) => string,
    getPlayerTitleHTML: (
        player: Player,
        context: { roundIndex: number, matchOrder: number, contestantId: string, playerIndex: number }
    ) => string,
    getScoresHTML: (
        side: Side,
        match: Match
    ) => string,
    getMatchTopHTML: (
        match: Match
    ) => string,
    getMatchBottomHTML: (
        match: Match
    ) => string,
}

type OptionsMap = Partial<Options>

export function createBracket(
    data: Data,
    wrapperElement: Element,
    options?: OptionsMap
): {
    moveToPreviousRound: () => void
    moveToNextRound: () => void
    moveToLastRound: () => void

    setBaseRoundIndex: (i: number) => void
    getNavigationState: () => {
        lastRoundIsFullyVisible: boolean,
        allRoundsAreVisible: boolean,
        baseRoundIndex: number
    }

    applyNewOptions: (newOptions: OptionsMap) => void
    getUserOptions: () => OptionsMap

    replaceData: (newData: Data) => void
    applyMatchesUpdates: (matches: Match[]) => void
    getAllData: () => Data
    highlightContestantHistory: (contestantId: string | null) => void,
    uninstall: () => void
}