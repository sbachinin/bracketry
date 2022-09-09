import { Data, Match, Contestant } from "./lib/data/data"

type Options = {
    mainBorderColor: string,
    rootBackgroundColor: string,
    mainVerticalPadding: number,
    visibleRoundsCount: number,
    showScrollbar: boolean,
    scrollbarWidth: number,
    scrollbarColor: string,
    roundTitlesHeight: number,
    roundTitlesBorderBottomColor: string,
    roundTitleColor: string,
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
    matchMaxWidth: number,
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
    getMatchElement: (roundIndex: number, matchOrder: number, data: Data) => Element,
    getNationalityHTML: (
        nationality: any,
        context: { roundIndex: number, matchOrder: number, contestantId: string, playerIndex: number },
        data: Data
    ) => string,
    getEntryStatusHTML: (
        entryStatus: any,
        context: { roundIndex: number, matchOrder: number, contestantId: string },
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
        reachedRightEdge: boolean,
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