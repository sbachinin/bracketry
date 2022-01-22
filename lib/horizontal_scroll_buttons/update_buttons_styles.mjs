const get_vert_align = position => {
    if (position === 'top') return 'flex-start'
    if (position === 'middle') return 'center'
    if (position === 'bottom') return 'flex-end'
}

export const get_buttons_style = (root_id, options) => `
    .${root_id} .scroll-button-wrapper {
        visibility: ${options.always_show_horizontal_scroll_buttons ? 'visible' : 'hidden'};
        display: flex;
        justify-content: center;
        align-items: ${get_vert_align(
            options.horizontal_scroll_buttons_position,
        )};
        box-sizing: border-box;
        position: absolute;
        top: 0;
        height: 100%;
        padding: ${
            options.horizontal_scroll_buttons_vert_padding
        } ${
            options.horizontal_scroll_buttons_hor_padding
        };
        user-select: none;
        pointer-events: none;
    }
    .${root_id} .scroll-button-wrapper > * {
        cursor: pointer;
        pointer-events: auto;
    }
    .${root_id} .scroll-button-wrapper .default-scroll-svg {
        opacity: 0.5;
        transition: all 0.2s;
        fill: ${options.horizontal_scroll_buttons_color};
    }

    .${root_id} .scroll-button-wrapper:hover .default-scroll-svg {
        opacity: 1;
    }

    .${root_id}:hover .scroll-button-wrapper {
        visibility: visible;
    }

    .${root_id} .scroll-button-wrapper .default-scroll-button {
        padding: 20px;
    }

    .${root_id}:hover .scroll-button-wrapper .default-scroll-button {
        opacity: 1;
    }

    .${root_id} .scroll-button-wrapper .default-scroll-button {
        background: radial-gradient(${options.background_color} 20%, rgba(0,0,0,0) 100%);
        opacity: ${options.always_show_horizontal_scroll_buttons ? 1 : 0};
        transition: all 0.2s;
    }

    .${root_id} .scroll-button-wrapper.hidden {
        visibility: hidden;
        pointer-events: none;
    }

    .${root_id} .scroll-button-wrapper.hidden .default-scroll-button {
        opacity: 0;
    }

    .${root_id} .scroll-button-wrapper-left {
        left: 0;
    }

    .${root_id} .scroll-button-wrapper-right  {
        right: 0;
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