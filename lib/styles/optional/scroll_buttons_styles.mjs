export const get_scroll_buttons_styles = (get_option) => {
    // TODO maybe remove this file
    return `
        ## .default-scroll-icon svg {
            padding: ${get_option('defaultScrollIconSize') / 15}px;
            width: ${get_option('defaultScrollIconSize')}px;
            height: ${get_option('defaultScrollIconSize')}px;
        }

    `
}