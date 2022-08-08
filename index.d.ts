import { Data, Match } from "./lib/data/data"

type OptionNames = 'connectionLinesColor'
    | 'connectionLinesWidth'
    | 'defaultNavigationSvgSize'
    | 'distanceBetweenScorePairs'
    | 'highlightedConnectionLinesColor'
    | 'highlightedPlayerTitleColor'
    | 'leftNavigationButtonBackground'
    | 'leftNavigationButtonHTML'
    | 'liveMatchBackgroundColor'
    | 'liveMatchBorderColor'
    | 'mainBorderColor'
    | 'mainVerticalPadding'
    | 'matchAxisMargin'
    | 'matchFontSize'
    | 'matchHorMargin'
    | 'matchMaxWidth'
    | 'matchMinVerticalGap'
    | 'matchTextColor'
    | 'navButtonsPosition'
    | 'navigationButtonsTopDistance'
    | 'navigationGutterBorderColor'
    | 'navigationSvgColor'
    | 'onMatchClick'
    | 'onMatchSideClick'
    | 'oneSidePlayersGap'
    | 'playerTitleFontFamily'
    | 'rightNavigationButtonBackground'
    | 'rightNavigationButtonHTML'
    | 'rootBackgroundColor'
    | 'rootFontFamily'
    | 'roundTitleColor'
    | 'roundTitlesBorderBottomColor'
    | 'roundTitlesFontFamily'
    | 'roundTitlesFontSize'
    | 'roundTitlesHeight'
    | 'scoreFontFamily'
    | 'scrollbarColor'
    | 'scrollbarWidth'
    | 'showScrollbar'
    | 'visibleRoundsCount'

type OptionsMap = { [key in OptionNames]?: any }

export function createPlayoffs(
    user_data: Data,
    user_wrapper_el: any,
    user_options: any
): {
    moveToNextRound: () => void;
    moveToPreviousRound: () => void;
    setBaseRoundIndex: (i: number) => void;
    getNavigationState: () => {
        reachedRightEdge: boolean,
        allRoundsAreVisible: boolean,
        baseRoundIndex: number
    }
    applyNewOptions: (new_options: OptionsMap) => void;
    applyFullDataUpdate: (new_data: Data) => void;
    applyMatchesUpdates: (matches_data: Match[]) => void;
    getAllData: () => Data;
    getUserOptions: () => OptionsMap;
};