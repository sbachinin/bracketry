import * as sizes from './sizes.mjs'

const getButtonsStyle = (canvasContainer, options) => `
    div.buttons-container {
        opacity: 0;
        display: block;
        width: 100%;
        height: 0;
        position: relative;
        transition: all 0.3s;        
    }

    div.buttons-bg {
        position: absolute;
        top: -${canvasContainer.clientHeight}px;
        height: ${sizes.ROUNDS_TITLE_HEIGHT}px;
        width: 100%;
        background: linear-gradient(to right, ${options.backgroundColor} 2%, rgba(0,0,0,0%) 10%, rgba(0,0,0,0%) 90%, ${options.backgroundColor} 98%);
    }

    canvas.sport-brackets-canvas:hover ~ div.buttons-container, div.buttons-container:hover {
        opacity: 1;
    }

    .scroll-rounds-button {
        display: flex;
        height: 50px;
        width: 50px;
        position: absolute;
        top: -${canvasContainer.clientHeight - 18}px;
        font-size: 50px;
        font-family: arial;
        cursor: pointer;
        border: 2px solid black;
        border-radius: 50px;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        transition: all 0.3s;
        opacity: 0.5;
        padding-top: 2px;
        background-color: #2d2d2d;
        color: white;
    }
    
    .scroll-rounds-button:hover {
        opacity: 1;
    }

    .scroll-rounds-button-left  {
        padding-right: 4px;
        left: 18px;
    }
    
    .scroll-rounds-button-right  {
        padding-left: 4px;
        right: 18px;
    }
`

export const create_horizontal_scroll_buttons = (canvasContainer, options) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${getButtonsStyle(canvasContainer, options)}</style>`
    )

    canvasContainer.innerHTML += `
        <div class='buttons-container'>
            <div class='buttons-bg'></div>
            <div class='scroll-rounds-button-left scroll-rounds-button'>&#60;</div>
            <div class='scroll-rounds-button-right scroll-rounds-button'>&#62;</div>
        </div>
    `
}
