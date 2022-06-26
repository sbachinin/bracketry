import { BUTTONS_POSITIONS } from '../constants.mjs'

export const get_buttons_styles = (root_id, options) => {

    const buttons_are_gutters = options.nav_buttons_position === BUTTONS_POSITIONS.gutters
    const buttons_are_before_titles = options.nav_buttons_position === BUTTONS_POSITIONS.before_titles
    const buttons_are_over_titles = options.nav_buttons_position === BUTTONS_POSITIONS.over_titles
    const buttons_are_hidden = options.nav_buttons_position === BUTTONS_POSITIONS.hidden

    return `


        #${root_id} .buttons-header {
            display: ${buttons_are_before_titles || buttons_are_over_titles ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${options.scroll_gutter_border_color};
            ${
                buttons_are_over_titles
                ? `
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    height: ${parseInt(options.round_titles_height) + 1}px;
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
            top: ${ options.scroll_buttons_top_distance };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : '0' }px;
        }


        #${root_id} .navigation-button.non-header-button {
            justify-content: center;
            align-items: center;
        }
        #${root_id} .navigation-button.non-header-button.left {
            left: 0;
            background: ${ options.left_navigation_button_background };
            border-right: ${ buttons_are_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none' };
        }
        #${root_id} .navigation-button.non-header-button.right {
            right: 0;
            background: ${ options.right_navigation_button_background };
            border-left: ${ buttons_are_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none' };
        }
        #${root_id} .navigation-button svg {
            fill: ${ options.navigation_svg_color };
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
            padding: ${options.default_navigation_svg_size / 6}px ${options.default_navigation_svg_size / 8}px;
            width: ${ options.default_navigation_svg_size }px;
        }
    `
}