export const get_buttons_styles = (get_option) => {

    const buttons_are_gutters = get_option('navButtonsPosition') === 'gutters'
    const buttons_are_before_titles = get_option('navButtonsPosition') === 'beforeTitles'
    const buttons_are_over_titles = get_option('navButtonsPosition') === 'overTitles'
    const buttons_are_hidden = get_option('navButtonsPosition') === 'hidden'

    return `


        ## .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            border-bottom: 1px solid ${get_option('navigationGutterBorderColor')};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0px;
                    right: 0px;
                    height: ${parseInt(get_option('roundTitlesHeight')) + 1}px;
                `
                : ''
            }
        }

        ## .navigation-button.non-header-button {
            position: ${ buttons_are_gutters ? 'static' : 'absolute' };
            top: ${ get_option('navigationButtonsTopDistance') };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : '0' };
        }

        ## .navigation-button.non-header-button:not(.hidden) {
            display: ${ buttons_are_hidden || buttons_are_before_titles || buttons_are_over_titles ? 'none' : 'flex' };
        }

        ## .navigation-button.non-header-button.left {
            background: ${ get_option('leftNavigationButtonBackground') };
            border-right: ${ buttons_are_gutters ? `1px solid ${get_option('navigationGutterBorderColor')}` : 'none' };
        }
        ## .navigation-button.non-header-button.right {
            background: ${ get_option('rightNavigationButtonBackground') };
            border-left: ${ buttons_are_gutters ? `1px solid ${get_option('navigationGutterBorderColor')}` : 'none' };
        }
        ## .navigation-button svg {
            fill: ${ get_option('navigationSvgColor') };
        }
           
        ## .default-navigation-svg {
            padding: ${get_option('defaultNavigationSvgSize') / 6}px ${get_option('defaultNavigationSvgSize') / 8}px;
            width: ${ get_option('defaultNavigationSvgSize') }px;
        }
    `
}