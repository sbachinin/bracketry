import { create_unique_id } from './utils.mjs'
import * as sizes from './sizes.mjs'

const getButtonsStyle = (canvasContainer, id, bgColor) => `
    .${id}.buttons-container {
        opacity: 0;
        display: block;
        width: 100%;
        height: 0;
        position: relative;
        transition: all 0.3s;        
    }

    .${id} .buttons-bg {
        position: absolute;
        top: -${canvasContainer.clientHeight}px;
        height: ${sizes.ROUNDS_TITLE_HEIGHT}px;
        width: 100%;
        background: linear-gradient(to right, ${bgColor} 2%, rgba(0,0,0,0%) 10%, rgba(0,0,0,0%) 90%, ${bgColor} 98%);
    }

    canvas.sport-brackets-canvas:hover ~ .${id}, .${id}:hover {
        opacity: 1;
    }

    .${id} .scroll-rounds-button {
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
        user-select: none;
    }

    .${id} .scroll-rounds-button.hidden {
        visibility: hidden;
        pointer-events: none;
    }
    
    .${id} .scroll-rounds-button:hover {
        opacity: 1;
    }

    .${id} .scroll-rounds-button-left  {
        padding-right: 4px;
        left: 18px;
    }
    
    .${id} .scroll-rounds-button-right  {
        padding-left: 4px;
        right: 18px;
    }
`

const get_leftmost_index = scrollX => Math.abs(Math.floor(scrollX / sizes.ROUND_WIDTH))

const update_buttons_visibility = (
    new_leftmost_round_index,
    invisible_rounds_count,
    leftButton, rightButton
) => {
    if (new_leftmost_round_index <= 0) {
        leftButton.classList.add('hidden')
    } else {
        leftButton.classList.remove('hidden')
    }
    if (new_leftmost_round_index >= invisible_rounds_count) {
        rightButton.classList.add('hidden')
    } else {
        rightButton.classList.remove('hidden')
    }
}

const createButton = (state, side, handle_new_round_index) => {
    const button = document.createElement('div')
    button.className = [
        'scroll-rounds-button',
        `scroll-rounds-button-${side}`,
    ].join(' ')
    button.innerHTML = side === 'left' ? '&#60;' : '&#62;'
    button.addEventListener('click', () => {        
        handle_new_round_index(
            get_leftmost_index(state.scrollX)
            + (side === 'left' ? -1 : 1)
        )
    })
    return button
}




export const create_horizontal_scroll_buttons = (
    canvasContainer,
    bgColor,
    rounds_count,
    state,
    change_round_index
) => {
    const fully_visible_rounds_count = Math.floor(canvasContainer.clientWidth / sizes.ROUND_WIDTH)
    const invisible_rounds_count = rounds_count - fully_visible_rounds_count

    const id = create_unique_id()
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${getButtonsStyle(canvasContainer, id, bgColor)}</style>`
    )

    const handle_new_round_index = new_index => {
        update_buttons_visibility(
            new_index,
            invisible_rounds_count,
            leftButton, rightButton
        )
        change_round_index(new_index)
    }

    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = `${id} buttons-container`
    buttonsContainer.innerHTML = "<div class='buttons-bg'></div>"
    const leftButton = createButton(state, 'left', handle_new_round_index)
    const rightButton = createButton(state, 'right', handle_new_round_index)
    update_buttons_visibility(
        get_leftmost_index(state.scrollX),
        invisible_rounds_count,
        leftButton, rightButton
    )
    buttonsContainer.append(leftButton, rightButton)
    canvasContainer.appendChild(buttonsContainer)
}