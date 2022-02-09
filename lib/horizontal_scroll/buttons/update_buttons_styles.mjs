const get_vert_align = position => {
    if (position === 'top') return 'flex-start'
    if (position === 'middle') return 'center'
    if (position === 'bottom') return 'flex-end'
}

const get_gutter_border_color = options => {
    return (
        options.horizontal_scroll_buttons_position === 'In the gutters'
        && options.scroll_gutter_border_color
    ) ? options.scroll_gutter_border_color : 'transparent'
}

export const get_buttons_style = (root_id, options) => `
    #${root_id} .scroll-button-wrapper {
        display: flex;
        justify-content: center;
        align-items: ${get_vert_align(
            options.horizontal_scroll_buttons_alignment,
        )};
        position: absolute;
        top: 0;
        height: 100%;
        z-index: 3;
        user-select: none;
        cursor: pointer;
        pointer-events: ${ options.horizontal_scroll_buttons_position === 'In the gutters' ? 'auto' : 'none' };
        background: ${ options.horizontal_scroll_buttons_position === 'In the gutters'
            ? options.scroll_gutter_background_color
            : 'none'
        };
        margin: 0 ${ options.horizontal_scroll_buttons_position === 'In the gutters'
            ? 0
            : options.horizontal_scroll_buttons_hor_margin
        };
    }

    #${root_id} .scroll-button-wrapper.inactive {
        cursor: auto;
    }

    #${root_id} .scroll-button-wrapper-left {
        left: 0;
        border-right: 1px solid ${get_gutter_border_color(options)};
    }

    #${root_id} .scroll-button-wrapper-right  {
        right: 0;
        border-left: 1px solid ${get_gutter_border_color(options)};
    }

    #${root_id} .scroll-button-wrapper .button-clickable-area {
        width: ${options.horizontal_scroll_buttons_clickable_width};
        height: ${options.horizontal_scroll_buttons_clickable_height};
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        transition: opacity ease-in-out 0.5s;
        overflow: hidden;
        pointer-events: auto;
        margin: ${ options.horizontal_scroll_buttons_vert_margin } 0;
    }

    
    #${root_id} .scroll-button-wrapper:hover .button-clickable-area {
        opacity: 1;
    }

    #${root_id} .scroll-button-wrapper.inactive .button-clickable-area {
        pointer-events: none;
        opacity: 0;
    }

    #${root_id} .scroll-button-wrapper svg {
        fill: ${options.horizontal_scroll_buttons_color};
    }
`

export const update_buttons_styles = (root_id, options) => {
    const current_styles_node = document.head.querySelector(`#${root_id}-button-styles`)
    if (current_styles_node) document.head.removeChild(current_styles_node)
    
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${root_id}-button-styles'>${get_buttons_style(root_id, options)}</style>`
    )
}