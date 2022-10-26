export const options_presets = [
    { // small scale
        "rootBgColor": "#ffffff",
        "matchHorMargin": '29px',
        "navigationSvgColor": "#161616",
        "connectionLinesWidth": 1,
        "matchFontSize": 12,
        "scoreFontFamily": "roboto",
        "score_hor_padding": 3,
        "score_hor_margin": 2
    },

    { // very condensed horizontally, with collapsed matches
        matchHorMargin: '22px',
        roundTitlesFontSize: 23,
    },

    { // GUTTERS EVERYWHERE
        mainVerticalPadding: 20,
        roundTitlesFontSize: 27,
        round_title_margin_bottom: 10,
        navButtonsPosition: "In the gutters",
    },

    {
        mainVerticalPadding: 20,
        roundTitlesFontSize: 27,
        round_title_margin_bottom: 10,
        navButtonsPosition: "In the gutters",
    },

    // MOBILE
    {
        visibleRoundsCount: 1,
        roundTitlesHeight: 40,
        navButtonsPosition: "beforeTitles",
        defaultNavigationIconSize: 40,
        roundTitlesFontSize: 24,
        matchFontSize: 14,
        matchHorMargin: 8,
    },

    // FOR PERFORMANCE FREAKS
    {
        useClassicalLayout: true,
        showScrollbar: false,
        visibleRoundsCount: 2,
    }
]