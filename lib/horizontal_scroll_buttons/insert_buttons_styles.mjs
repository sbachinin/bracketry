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
    .${root_id} .scroll-button-wrapper svg {
        opacity: 0.5;
        transition: all 0.5s;
        fill: ${options.horizontal_scroll_buttons_color};
    }

    .${root_id} .scroll-button-wrapper:hover svg {
        opacity: 1;
    }

    .${root_id}:hover .scroll-button-wrapper {
        visibility: visible;
    }

    .${root_id} .scroll-button-wrapper .button-icon {
        padding: 20px;
    }

    .${root_id}:hover .scroll-button-wrapper .button-icon {
        opacity: 1;
    }

    .${root_id} .scroll-button-wrapper .button-icon {
        background: radial-gradient(${options.background_color} 20%, rgba(0,0,0,0) 100%);
        opacity: ${options.always_show_horizontal_scroll_buttons ? 1 : 0};
        transition: all 0.5s;
    }

    .${root_id} .scroll-button-wrapper.hidden {
        visibility: hidden;
        pointer-events: none;
    }

    .${root_id} .scroll-button-wrapper.hidden .button-icon {
        opacity: 0;
    }

    .${root_id} .scroll-button-wrapper-left {
        left: 0;
    }

    .${root_id} .scroll-button-wrapper-right  {
        right: 0;
    }
`

export const insert_buttons_styles = (root_id, options) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${get_buttons_style(root_id, options)}</style>`
    )
}