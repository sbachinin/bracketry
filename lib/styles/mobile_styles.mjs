export const get_mobile_styles = (root_id, get_option) => `

/* display only header buttons */

    #${root_id}.mobile .matches-scrollable-area {
        display: flex;
    }

    #${root_id}.mobile .round-wrapper {
        margin: 0 !important;
    }

    #${root_id}.mobile .round-wrapper .match-wrapper {
        overflow: hidden;
    }
    #${root_id}.mobile .round-wrapper .match-body {
        padding-left: 3%;
    }
    #${root_id}.mobile .round-wrapper .match-body {
        padding-right: 3%;
    }
    #${root_id}.mobile .match-body .sides {
        width: 100%;
    }
    #${root_id}.mobile .match-body .sides {
        width: 100%;
    }
`
