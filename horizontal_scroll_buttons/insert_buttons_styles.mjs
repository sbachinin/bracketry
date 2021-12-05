export const get_buttons_style = (root_id, bgColor) => `
    .${root_id} .scroll-rounds-button {
        opacity: 0;
        display: flex;
        justify-content: center;
        position: absolute;
        height: 50px;
        width: 86px;
        top: 20px;
        user-select: none;
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
        border: 2px solid black;
        border-radius: 50px;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding-top: 2px;
        background-color: #2d2d2d;
        color: white;
        opacity: 0.5;
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
        padding-right: 40px;
        left: 0;
        background: linear-gradient(to right, ${bgColor} 50%, rgba(0,0,0,0%) 100%);
    }

    .${root_id} .scroll-rounds-button-left .button-icon {
        padding-right: 3px;
    }

    .${root_id} .scroll-rounds-button-right  {
        padding-left: 40px;
        right: 0;
        background: linear-gradient(to left, ${bgColor} 50%, rgba(0,0,0,0%) 100%);
    }

    .${root_id} .scroll-rounds-button-right .button-icon {
        padding-left: 3px;
    }
`

export const insert_buttons_styles = (root_id, bgColor) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${get_buttons_style(root_id, bgColor)}</style>`
    )
}