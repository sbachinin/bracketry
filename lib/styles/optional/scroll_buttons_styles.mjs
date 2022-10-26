export const get_scroll_buttons_styles = (get_option) => {
    const buttons_are_gutters = get_option('scrollButtonsPosition') === 'gutters'

    return `
        ## .default-scroll-icon svg {
            padding: ${get_option('defaultScrollSvgSize') / 15}px;
            width: ${get_option('defaultScrollSvgSize')}px;
            height: ${get_option('defaultScrollSvgSize')}px;
        }
    
        ## .button-up {
            border-bottom-color: ${buttons_are_gutters ? get_option('scrollGutterBorderColor') : 'transparent'};
        }

        ## .button-down {
            border-top-color: ${buttons_are_gutters ? get_option('scrollGutterBorderColor') : 'transparent'};
        }
    `
}