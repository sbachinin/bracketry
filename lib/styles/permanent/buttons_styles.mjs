export const get_buttons_permanent_styles = () => `

    &&& .buttons-header {
        align-items: center;
        justify-content: space-between;
        position: static;
        height: auto;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
    }

    &&& .buttons-header .navigation-button {
        display: flex;
        align-items: center;
    }

    &&& .navigation-button {
        max-height: 100%;
        pointer-events: none;
        border-color: transparent;
    }

    &&& .navigation-button.non-header-button {
        cursor: auto;
        user-select: none;
        z-index: 3;
        border-width: 1px;
        border-style: solid;
    }


    &&& .navigation-button.non-header-button {
        justify-content: center;
        align-items: center;
    }
    &&& .navigation-button.non-header-button.left {
        left: 0;
    }
    &&& .navigation-button.non-header-button.right {
        right: 0;
    }
    
    &&& .navigation-button.hidden {
        display: none;
    }

    &&& .navigation-button.active {
        cursor: pointer;
        pointer-events: auto;
    }

    &&& .navigation-button > * {
        transition: opacity ease-in-out 0.2s;
        opacity: 0.15;
        pointer-events: none;
    }

    &&& .navigation-button.active > * {
        opacity: 0.65;
    }

    &&& .navigation-button.active:hover > * {
        opacity: 1;
    }

    &&& .default-navigation-svg {
        height: auto;
    }
`