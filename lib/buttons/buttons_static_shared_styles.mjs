import { insert_styles } from '../utils/utils.mjs'
import { BUTTONS_SHARED_STYLES_ID } from '../constants.mjs'

const get_buttons_shared_styles = root_id => `
    #${root_id} .scroll-button-wrapper {
        display: flex;
        position: absolute;
        z-index: 3;
        user-select: none;
        cursor: pointer;
    }
    
    #${root_id} .scroll-button-wrapper.hidden {
        visibility: hidden;
    }

    #${root_id} .scroll-button-wrapper.disabled {
        cursor: auto;
    }

    #${root_id} .scroll-button-wrapper .button-clickable-area {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        pointer-events: auto;
    }

    #${root_id} .scroll-button-wrapper .default-scroll-svg {
        opacity: 0.65;
        transition: opacity ease-in-out 0.2s;
    }
    
    #${root_id} .scroll-button-wrapper.disabled .default-scroll-svg {
        opacity: 0.15;
    }

    #${root_id} .scroll-button-wrapper:hover:not(.disabled) .default-scroll-svg {
        opacity: 1;
    }
`

export const maybe_insert_buttons_shared_styles = (root_id) => {
    if (document.head.querySelector(`#${root_id}-${BUTTONS_SHARED_STYLES_ID}`) === null) {
        insert_styles(root_id, BUTTONS_SHARED_STYLES_ID, get_buttons_shared_styles(root_id))
    }
}