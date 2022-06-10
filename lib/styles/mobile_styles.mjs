export const get_mobile_styles = (root_id, options) => `

/* display only header buttons */
    #${root_id}.mobile .buttons-header {
        display: flex;
    }
    #${root_id}.mobile .scroll-button.non-header-button {
        display: none;
    }

    #${root_id}.mobile .content-area {
        width: 100%;
        left: 0 !important;
    }

    #${root_id}.mobile .matches-scrollable-area {
        display: flex;
    }

    #${root_id}.mobile .round-wrapper {
        margin: 0 !important;
    }

    #${root_id}.mobile .round-wrapper:not(.anchor-round) {
        display: none;
    }
    #${root_id}.mobile .round-wrapper.anchor-round {
        width: 100%;
    }

    #${root_id}.mobile .round-title:not(.anchor-round) {
        display: none;
    }
    #${root_id}.mobile .round-title.anchor-round {
        width: 100%;
    }
`
