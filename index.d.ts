export function createPlayoffs(user_data: any, user_wrapper_el: any, user_options: any): {
    moveToPreviousRound: () => any;
    moveToNextRound: () => any;
    getNavigationState: () => any;
    applyNewOptions: () => any;
    applyAllData: () => any;
    applyMatchUpdates: () => any;
    setBaseRoundIndex?: undefined;
    applyFullDataUpdate?: undefined;
    getAllData?: undefined;
    getUserOptions?: undefined;
} | {
    moveToPreviousRound: any;
    moveToNextRound: any;
    setBaseRoundIndex: any;
    getNavigationState: any;
    applyNewOptions: (new_options: any) => void;
    applyFullDataUpdate: (new_data: any) => void;
    applyMatchUpdates: (matches_data: any) => void;
    getAllData: () => any;
    getUserOptions: any;
    applyAllData?: undefined;
};