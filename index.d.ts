import { Data, Round, Match, Side, Contestant, Player } from "./lib/data/data"

// TODO check if all options present here

type Options = {
    width: string,
    height: string,
    rootBorderColor: string,
    wrapperBorderColor: string,
    fullscreen: boolean,
    fullscreenBgColor: string,
    verticalScrollMode: 'buttons' | 'mousewheel' | 'mixed',
    scrollButtonsPosition: 'gutters' | 'overMatches',
    syntheticScrollAmount: number,
    rootBgColor: string,
    mainVerticalPadding: number,
    visibleRoundsCount: number,
    displayWholeRounds: boolean,
    useClassicalLayout: boolean,
    resetScrollOnNavigation: boolean,
    showScrollbar: boolean,
    scrollbarWidth: number,
    scrollbarColor: string,
    disableHighlight: boolean,
    roundTitlesHeight: number,
    roundTitlesBorderBottomColor: string,
    roundTitleColor: string,
    hoveredMatchBorderColor: string,
    matchStatusBackgroundColor: string,
    navButtonsPosition: string,
    navButtonsTopDistance: string,
    navigationGutterBorderColor: string,
    scrollGutterBorderColor: string,
    defaultNavigationIconSize: number,
    navigationSvgColor: string,
    leftNavigationButtonHTML: string,
    rightNavigationButtonHTML: string,
    scrollUpButtonHTML: string,
    scrollDownButtonHTML: string,
    defaultScrollIconSize: number,
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
    matchMaxWidth: string,
    matchMinVerticalGap: number,
    matchHorMargin: number,
    matchAxisMargin: number,
    oneSidePlayersGap: number,
    liveMatchBorderColor: string,
    liveMatchBackgroundColor: string,
    distanceBetweenScorePairs: number,
    onMatchClick: (match: Partial<Match>) => void,

    // TODO so contestant and contestantId are not guaranteed?
    onMatchSideClick: (match: Partial<Match>, contestant?: Contestant, contestantId?: string) => void,

    getRoundTitleElement: (roundData: Round, roundIndex: number) => Element,
    getMatchElement: (roundIndex: number, matchOrder: number) => Element | undefined,
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
    ) => string
}

type OptionsMap = Partial<Options>

export function createPlayoffs(
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