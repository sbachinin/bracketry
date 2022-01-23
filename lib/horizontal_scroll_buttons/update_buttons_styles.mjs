const get_vert_align = position => {
    if (position === 'top') return 'flex-start'
    if (position === 'middle') return 'center'
    if (position === 'bottom') return 'flex-end'
}

export const get_buttons_style = (root_id, options) => `
    .${root_id} .scroll-button-wrapper {
        visibility: ${options.always_show_horizontal_scroll_buttons ? 'visible' : 'hidden'};
        opacity: ${options.always_show_horizontal_scroll_buttons ? 0.5 : 0};
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
        transition: all ease-in-out 0.5s;
    }

    .${root_id}:hover .scroll-button-wrapper {
        opacity: 0.5;
        visibility: visible;
    }
    
    .${root_id} .scroll-button-wrapper:hover {
        opacity: 1;
    }

    .${root_id} .scroll-button-wrapper.hidden {
        visibility: hidden;
        pointer-events: none;
        opacity: 0;
    }

    .${root_id} .scroll-button-wrapper-left {
        left: 0;
    }

    .${root_id} .scroll-button-wrapper-right  {
        right: 0;
    }

    .${root_id} .scroll-button-wrapper > * {
        cursor: pointer;
        pointer-events: auto;
    }

    .${root_id} .scroll-button-wrapper .default-scroll-button {
        padding: 20px;
        background: radial-gradient(${options.background_color} 20%, rgba(0,0,0,0) 100%);
    }

    .${root_id} .scroll-button-wrapper svg {
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