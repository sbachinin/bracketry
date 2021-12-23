const get_top = position => {
    if (position === 'top') {
        return '0'
    }
    if (position === 'bottom') {
        return 'calc(100% - 86px)'
    }
    return 'calc(50% - 25px)'
}

export const get_buttons_style = (root_id, options) => `
    .${root_id} .scroll-rounds-button {
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 86px;
        width: 86px;
        top: ${get_top(options.horizontal_scroll_buttons_position)};
        user-select: none;
        background: radial-gradient(${options.backgroundColor}, rgba(0,0,0,0));
    }

    .${root_id}:hover .scroll-rounds-button {
        opacity: 1;
    }

    .${root_id} .scroll-rounds-button .button-icon {
        display: flex;
        height: 50px;
        width: 50px;
        font-size: 50px;
        font-family: arial;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding-top: 2px;
        color: white;
    }

    .${root_id} .scroll-rounds-button.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }
    
    .${root_id} .scroll-rounds-button .button-icon:hover {
        opacity: 1;
    }

    .${root_id} .scroll-rounds-button-left {
        left: 0;
    }

    .${root_id} .scroll-rounds-button-left .button-icon {
        padding-right: 3px;
    }

    .${root_id} .scroll-rounds-button-right  {
        right: 0;
    }

    .${root_id} .scroll-rounds-button-right .button-icon {
        padding-left: 3px;
    }
`

export const insert_buttons_styles = (root_id, options) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${get_buttons_style(root_id, options)}</style>`
    )
}