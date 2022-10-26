export const get_buttons_styles = (get_option) => {

    const buttons_are_gutters = get_option('navButtonsPosition') === 'gutters'
    const buttons_are_before_titles = get_option('navButtonsPosition') === 'beforeTitles'
    const buttons_are_over_titles = get_option('navButtonsPosition') === 'overTitles'
    const buttons_are_hidden = get_option('navButtonsPosition') === 'hidden'

    return `


        ## .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0px;
                    right: 0px;
                    height: ${parseInt(get_option('roundTitlesHeight')) + 1}px;
                    border-color: transparent;
                `
                : ''
            }
        }

        ## .navigation-button.non-header-button {
            position: ${buttons_are_gutters ? 'static' : 'absolute'};
            top: ${get_option('navButtonsTopDistance')};
            transform: ${buttons_are_gutters ? 'none' : 'translate(0, -50%)'};
            min-height: ${buttons_are_gutters ? '100%' : '0'};
        }

        ## .navigation-button.non-header-button:not(.hidden) {
            display: ${buttons_are_hidden || buttons_are_before_titles || buttons_are_over_titles ? 'none' : 'flex'};
        }

        ## .navigation-button svg {
            fill: ${get_option('navigationSvgColor')};
        }
    
        ## .default-nav-icon svg {
            padding: ${get_option('defaultNavigationIconSize') / 15}px;
            width: ${get_option('defaultNavigationIconSize')}px;
            height: ${get_option('defaultNavigationIconSize')}px;
        }
    `
}