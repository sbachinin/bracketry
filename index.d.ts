import { Data, Round, Match, Contestant, Player } from "./lib/data/data"

type Options = {
    mainBorderColor: string,
    rootBackgroundColor: string,
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
    navigationButtonsTopDistance: string,
    navigationGutterBorderColor: string,
    defaultNavigationSvgSize: number,
    navigationSvgColor: string,
    leftNavigationButtonBackground: string,
    rightNavigationButtonBackground: string,
    leftNavigationButtonHTML: string,
    rightNavigationButtonHTML: string,
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

    getRoundTitleElement: (roundData: Round) => Element | undefined,
    getMatchElement: (roundIndex: number, matchOrder: number, data: Data) => Element | undefined,
    getNationalityHTML: (
        nationality: any,
        context: { roundIndex: number, matchOrder: number, contestantId: string, playerIndex: number },
        data: Data
    ) => string,
    getEntryStatusHTML: (
        entryStatus: any,
        context: { roundIndex: number, matchOrder: number, contestantId: string },
        data: Data
    ) => string,
    getPlayerTitleHTML: (
        player: Player,
        context: { roundIndex: number, matchOrder: number, contestantId: string, playerIndex: number },
        data: Data
    ) => string
}

type OptionsMap = Partial<Options>

export function createPlayoffs(
    data: Data,
    wrapperElement: Element,
    options: OptionsMap
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
    highlightContestantHistory: (contestantId: string | null) => void
}