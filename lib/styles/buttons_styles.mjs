export const get_buttons_styles = (root_id, options) => {

    const buttons_are_gutters = options.get_final_value('navButtonsPosition') === 'gutters'
    const buttons_are_before_titles = options.get_final_value('navButtonsPosition') === 'beforeTitles'
    const buttons_are_over_titles = options.get_final_value('navButtonsPosition') === 'overTitles'
    const buttons_are_hidden = options.get_final_value('navButtonsPosition') === 'hidden'

    return `


        #${root_id} .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${options.get_final_value('navigationGutterBorderColor')};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    height: ${parseInt(options.get_final_value('roundTitlesHeight')) + 1}px;
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
            top: ${ options.get_final_value('navigationButtonsTopDistance') };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : '0' }px;
        }


        #${root_id} .navigation-button.non-header-button {
            justify-content: center;
            align-items: center;
        }
        #${root_id} .navigation-button.non-header-button.left {
            left: 0;
            background: ${ options.get_final_value('leftNavigationButtonBackground') };
            border-right: ${ buttons_are_gutters ? `1px solid ${options.get_final_value('navigationGutterBorderColor')}` : 'none' };
        }
        #${root_id} .navigation-button.non-header-button.right {
            right: 0;
            background: ${ options.get_final_value('rightNavigationButtonBackground') };
            border-left: ${ buttons_are_gutters ? `1px solid ${options.get_final_value('navigationGutterBorderColor')}` : 'none' };
        }
        #${root_id} .navigation-button svg {
            fill: ${ options.get_final_value('navigationSvgColor') };
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
            padding: ${options.get_final_value('defaultNavigationSvgSize') / 6}px ${options.get_final_value('defaultNavigationSvgSize') / 8}px;
            width: ${ options.get_final_value('defaultNavigationSvgSize') }px;
        }
    `
}