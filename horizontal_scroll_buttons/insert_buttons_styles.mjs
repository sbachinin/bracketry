const get_vert_align = position => {
    if (position === 'top') return 'flex-start'
    if (position === 'middle') return 'center'
    if (position === 'bottom') return 'flex-end'
}

export const get_buttons_style = (root_id, options) => `
    .${root_id} .scroll-rounds-button {
        opacity: ${options.always_show_horizontal_scroll_buttons ? 0.5 : 0};
        display: flex;
        justify-content: center;
        align-items: ${get_vert_align(
            options.horizontal_scroll_buttons_position,
        )};
        padding: ${
            options.horizontal_scroll_buttons_vert_padding
        } ${
            options.horizontal_scroll_buttons_hor_padding
        };
        box-sizing: border-box;
        position: absolute;
        top: 0;
        height: 100%;
        user-select: none;
        cursor: pointer;
    }

    .${root_id} .scroll-rounds-button svg {
        fill: ${options.horizontal_scroll_buttons_color};
    }

    .${root_id}:hover .scroll-rounds-button {
        opacity: 0.5;
    }

    .${root_id} .scroll-rounds-button:hover {
        opacity: 1;
    }

    .${root_id} .scroll-rounds-button.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    .${root_id} .scroll-rounds-button-left {
        left: 0;
    }

    .${root_id} .scroll-rounds-button-right  {
        right: 0;
    }
`

export const insert_buttons_styles = (root_id, options) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${get_buttons_style(root_id, options)}</style>`
    )
}