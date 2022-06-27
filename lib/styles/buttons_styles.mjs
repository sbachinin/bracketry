export const get_buttons_styles = (root_id, options) => {

    const buttons_are_gutters = options.navButtonsPosition === 'gutters'
    const buttons_are_before_titles = options.navButtonsPosition === 'beforeTitles'
    const buttons_are_over_titles = options.navButtonsPosition === 'overTitles'
    const buttons_are_hidden = options.navButtonsPosition === 'hidden'

    return `


        #${root_id} .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${options.navigationGutterBorderColor};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    height: ${parseInt(options.roundTitlesHeight) + 1}px;
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
        }

        #${root_id} .navigation-button.non-header-button {
            cursor: auto;
            user-select: none;
            z-index: 2;
            display: ${ buttons_are_hidden || buttons_are_before_titles || buttons_are_over_titles ? 'none' : 'flex' };
            position: ${ buttons_are_gutters ? 'static' : 'absolute' };
            top: ${ options.navigationButtonsTopDistance };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : '0' }px;
        }


        #${root_id} .navigation-button.non-header-button {
            justify-content: center;
            align-items: center;
        }
        #${root_id} .navigation-button.non-header-button.left {
            left: 0;
            background: ${ options.leftNavigationButtonBackground };
            border-right: ${ buttons_are_gutters ? `1px solid ${options.navigationGutterBorderColor}` : 'none' };
        }
        #${root_id} .navigation-button.non-header-button.right {
            right: 0;
            background: ${ options.rightNavigationButtonBackground };
            border-left: ${ buttons_are_gutters ? `1px solid ${options.navigationGutterBorderColor}` : 'none' };
        }
        #${root_id} .navigation-button svg {
            fill: ${ options.navigationSvgColor };
        }
           
        #${root_id} .navigation-button.hidden {
            visibility: hidden;
        }

        #${root_id} .navigation-button.active {
            cursor: pointer;
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
            padding: ${options.defaultNavigationSvgSize / 6}px ${options.defaultNavigationSvgSize / 8}px;
            width: ${ options.defaultNavigationSvgSize }px;
        }
    `
}