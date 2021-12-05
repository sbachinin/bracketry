import * as sizes from './sizes.mjs'

const getButtonsStyle = (root_id, bgColor) => `
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

    button.innerHTML = `<div class="button-icon">${
        side === 'left' ? '&#60;' : '&#62;'
    }</div>`

    button.addEventListener('click', () => {
        handle_new_round_index(
            get_leftmost_index(state.scrollX)
            + (side === 'left' ? -1 : 1)
        )
    })
    return button
}


const get_invisible_rounds_count = (root_bracket_container, rounds_count) => {
    const fully_visible_rounds_count = Math.floor(root_bracket_container.clientWidth / sizes.ROUND_WIDTH)
    return rounds_count - fully_visible_rounds_count
}

export const create_horizontal_scroll_buttons = (
    root_bracket_container,
    options,
    rounds_count,
    state,
    change_round_index,
    root_id
) => {
    if (options.horizontalScrollTriggeredBy !== 'buttons') return

    
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${getButtonsStyle(root_id, options.backgroundColor)}</style>`
    )

    const handle_new_round_index = new_index => {
        update_buttons_visibility(
            new_index,
            get_invisible_rounds_count(root_bracket_container, rounds_count),
            leftButton, rightButton
        )
        change_round_index(new_index)
    }

    const leftButton = createButton(state, 'left', handle_new_round_index)
    const rightButton = createButton(state, 'right', handle_new_round_index)
    update_buttons_visibility(
        get_leftmost_index(state.scrollX),
        get_invisible_rounds_count(root_bracket_container, rounds_count),
        leftButton, rightButton
    )
    root_bracket_container.append(leftButton, rightButton)

    return {
        update_buttons_on_resize: () => {
            update_buttons_visibility(
                get_leftmost_index(state.scrollX),
                get_invisible_rounds_count(root_bracket_container, rounds_count),
                leftButton, rightButton
            )
        }
    }
}