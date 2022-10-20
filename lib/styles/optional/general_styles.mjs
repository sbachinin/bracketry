const get_fullscreen_styles = (get_option) => `
    ## {
        position: fixed;
        z-index: 4;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${get_option('fullscreenBackgroundColor')};

        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        
        transition: opacity 0.3s ease-out;
    }

    ## .fullscreen-wrapper {
        max-height: 100vh;
    }

    ## .exit-fullscreen-button {
        display: flex;
        width: calc((100vw - ${get_option('width')}) / 2);
        height: calc((100vh - ${get_option('height')}) / 2);
    }
    
    ## .exit-fullscreen-button .circle-button {
        background: ${get_option('rootBackgroundColor')};
    }
`
export const get_general_styles = (get_option) => `

    ${get_option('fullscreen') ? get_fullscreen_styles(get_option) : ''}

    ## .fullscreen-wrapper {
        background-color: ${get_option('rootBackgroundColor')};
        border-color: ${get_option('mainBorderColor')};
        width: ${get_option('width')};
        height: ${get_option('height')};
    }
    
    ## .round-titles-wrapper {
        height: ${get_option('roundTitlesHeight')}px;
        font-size: ${get_option('roundTitlesFontSize')}px;
        font-family: ${get_option('roundTitlesFontFamily') || get_option('rootFontFamily')};
        color: ${get_option('roundTitleColor')};
    }
    
    ## .round-titles-wrapper:after {
        border-bottom: 1px solid ${get_option('roundTitlesBorderBottomColor')};
    }

    ## .matches-positioner {
        min-height: calc(100% - ${get_option('mainVerticalPadding') * 2}px);
        margin-top: ${get_option('mainVerticalPadding') || 0}px;
        margin-bottom: ${get_option('mainVerticalPadding') || 0}px;
        font-size: ${get_option('matchFontSize')}px;
    }

    ## .scrollbar-parent {
        display: ${get_option('showScrollbar') === true ? 'block' : 'none'};
        width: ${get_option('scrollbarWidth')}px;
        top: ${get_option('roundTitlesHeight')}px;
    }

    ## .scrollbar {
        background: ${get_option('scrollbarColor')};
    }
`