const get_fullscreen_styles = (get_option) => `
    ## {
        position: fixed;
        z-index: 4;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${get_option('fullscreenBgColor')};

        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
        
        transition: opacity 0.3s ease-out;
    }

    ## .fullscreen-wrapper {
        max-height: 100vh;
    }

    ## .exit-fullscreen-button {
        display: flex;
        width: calc((100% - ${get_option('width')}) / 2);
        height: calc((100% - ${get_option('height')}) / 2);
    }
    
    ## .exit-fullscreen-button .circle-button {
        background: ${get_option('rootBgColor')};
    }
`
export const get_general_styles = (get_option) => `

    ${get_option('fullscreen') ? get_fullscreen_styles(get_option) : ''}

    ## .fullscreen-wrapper {
        background-color: ${get_option('rootBgColor')};
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

    ## .vertical-scroll-button {
        display: ${get_option('verticalScrollMode') === 'buttons' ? 'block' : 'none'};
    }

    ## .matches-positioner {
        min-height: calc(100% - ${get_option('mainVerticalPadding') * 2}px);
        padding-top: ${get_option('mainVerticalPadding') || 0}px;
        padding-bottom: ${get_option('mainVerticalPadding') || 0}px;
        font-size: ${get_option('matchFontSize')}px;
    }

    ## .scrollbar-parent {
        display: ${get_option('showScrollbar') === true ? 'block' : 'none'};
        width: ${get_option('scrollbarWidth')}px;
    }

    ## .scrollbar {
        background: ${get_option('scrollbarColor')};
        ${
            get_option('verticalScrollMode') === 'buttons'
            ? `transition: top 0.2s ease-out;`
            : ''
        }
    }

`