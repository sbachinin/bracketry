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
    
    #${root_id} .scroll-button-wrapper.inactive {
        cursor: auto;
    }

    #${root_id} .scroll-button-wrapper .button-clickable-area {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        pointer-events: auto;
    }

    #${root_id} .scroll-button-wrapper.inactive .button-clickable-area {
        pointer-events: none;
    }
    
    #${root_id} .scroll-button-wrapper .default-scroll-svg {
        opacity: 0.65;
        transition: opacity ease-in-out 0.2s;
    }
    
    #${root_id} .scroll-button-wrapper.inactive .default-scroll-svg {
        opacity: 0.15;
    }

    #${root_id} .scroll-button-wrapper:hover .default-scroll-svg {
        opacity: 1;
    }
`

export const maybe_insert_buttons_shared_styles = (root_id) => {
    if (document.head.querySelector(`#${root_id}-${BUTTONS_SHARED_STYLES_ID}`) === null) {
        insert_styles(root_id, BUTTONS_SHARED_STYLES_ID, get_buttons_shared_styles(root_id))
    }
}