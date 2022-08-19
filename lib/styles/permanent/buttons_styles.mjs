export const get_buttons_permanent_styles = (root_id) => `

    #${root_id} .buttons-header {
        align-items: center;
        justify-content: space-between;
        position: static;
        height: auto;
    }

    #${root_id} .buttons-header .navigation-button {
        display: flex;
        align-items: center;
    }

    #${root_id} .navigation-button {
        max-height: 100%;
        pointer-events: none;
    }

    #${root_id} .navigation-button.non-header-button {
        cursor: auto;
        user-select: none;
        z-index: 3;
    }


    #${root_id} .navigation-button.non-header-button {
        justify-content: center;
        align-items: center;
    }
    #${root_id} .navigation-button.non-header-button.left {
        left: 0;
    }
    #${root_id} .navigation-button.non-header-button.right {
        right: 0;
    }
    
    #${root_id} .navigation-button.hidden {
        display: none;
    }

    #${root_id} .navigation-button.active {
        cursor: pointer;
        pointer-events: auto;
    }

    #${root_id} .navigation-button > * {
        transition: opacity ease-in-out 0.2s;
        opacity: 0.15;
        pointer-events: none;
    }

    #${root_id} .navigation-button.active > * {
        opacity: 0.65;
    }

    #${root_id} .navigation-button.active:hover > * {
        opacity: 1;
    }

    #${root_id} .default-navigation-svg {
        height: auto;
    }
`