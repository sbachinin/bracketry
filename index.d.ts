export function createPlayoffs(
    user_data: import("./lib/data/data").Data,
    user_wrapper_el: any,
    user_options: any
): {
    moveToPreviousRound: any;
    moveToNextRound: any;
    setBaseRoundIndex: any;
    getNavigationState: any;
    applyNewOptions: (new_options: any) => void;
    applyFullDataUpdate: (new_data: any) => void;
    applyMatchesUpdates: (matches_data: import("./lib/data/data").Match[]) => void;
    getAllData: () => any;
    getUserOptions: any;
    applyAllData?: undefined;
};