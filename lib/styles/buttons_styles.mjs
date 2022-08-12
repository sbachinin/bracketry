export const get_buttons_styles = (root_id, get_option) => {

    const buttons_are_gutters = get_option('navButtonsPosition') === 'gutters'
    const buttons_are_before_titles = get_option('navButtonsPosition') === 'beforeTitles'
    const buttons_are_over_titles = get_option('navButtonsPosition') === 'overTitles'
    const buttons_are_hidden = get_option('navButtonsPosition') === 'hidden'

    return `


        #${root_id} .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${get_option('navigationGutterBorderColor')};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    height: ${parseInt(get_option('roundTitlesHeight')) + 1}px;
                `
                : ''
            }
        }

        #${root_id} .buttons-header .navigation-button {
            display: flex;
            align-items: center;
        }

        #${root_id} .navigation-button {
            max-height: 100%;
            pointer-events: none;
        }

        #${root_id} .navigation-button.non-header-button {
            cursor: auto;
            user-select: none;
            z-index: 2;
            display: ${ buttons_are_hidden || buttons_are_before_titles || buttons_are_over_titles ? 'none' : 'flex' };
            position: ${ buttons_are_gutters ? 'static' : 'absolute' };
            top: ${ get_option('navigationButtonsTopDistance') };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : '0' }px;
        }


        #${root_id} .navigation-button.non-header-button {
            justify-content: center;
            align-items: center;
        }
        #${root_id} .navigation-button.non-header-button.left {
            left: 0;
            background: ${ get_option('leftNavigationButtonBackground') };
            border-right: ${ buttons_are_gutters ? `1px solid ${get_option('navigationGutterBorderColor')}` : 'none' };
        }
        #${root_id} .navigation-button.non-header-button.right {
            right: 0;
            background: ${ get_option('rightNavigationButtonBackground') };
            border-left: ${ buttons_are_gutters ? `1px solid ${get_option('navigationGutterBorderColor')}` : 'none' };
        }
        #${root_id} .navigation-button svg {
            fill: ${ get_option('navigationSvgColor') };
        }
           
        #${root_id} .navigation-button.hidden {
            visibility: hidden;
        }

        #${root_id} .navigation-button.active {
            cursor: pointer;
            pointer-events: auto;
        }

        #${root_id} .navigation-button > * {
            transition: opacity ease-in-out 0.2s;
            opacity: 0.15;
            pointer-events: none;
        }

        #${root_id} .navigation-button.active > * {
            opacity: 0.65;
        }

        #${root_id} .navigation-button.active:hover > * {
            opacity: 1;
        }

        #${root_id} .default-navigation-svg {
            height: auto;
            padding: ${get_option('defaultNavigationSvgSize') / 6}px ${get_option('defaultNavigationSvgSize') / 8}px;
            width: ${ get_option('defaultNavigationSvgSize') }px;
        }
    `
}