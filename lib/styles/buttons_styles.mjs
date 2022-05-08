export const get_buttons_styles = (root_id) => `
    #${root_id} .scroll-button {
        cursor: auto;
        user-select: none;
        z-index: 1;
    }
    #${root_id} .scroll-button {
        justify-content: center;
        align-items: center;
    }
    #${root_id} .scroll-button.left {
        left: 0;
    }
    #${root_id} .scroll-button.right {
        right: 0;
    }
        
    #${root_id} .scroll-button.hidden {
        visibility: hidden;
    }

    #${root_id} .scroll-button.active {
        cursor: pointer;
    }

    #${root_id} .scroll-button > * {
        transition: opacity ease-in-out 0.2s;
        opacity: 0.15;
    }

    #${root_id} .scroll-button.active > * {
        opacity: 0.65;
    }

    #${root_id} .scroll-button.active:hover > * {
        opacity: 1;
    }

    #${root_id} .scroll-button .default-scroll-svg {
        width: 100%;
        height: auto;
        padding: 12%;
    }
`
