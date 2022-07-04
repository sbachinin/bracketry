export const get_mobile_styles = (root_id) => `

    #${root_id}.mobile .round-wrapper {
        margin: 0 auto !important;
        width: max-content;
    }

    /* #${root_id}.mobile .round-wrapper .match-wrapper {
        overflow: hidden;
    } */

    #${root_id}.mobile .round-wrapper {
        padding-left: 3%;
        padding-right: 3%;
    }
    #${root_id}.mobile .round-wrapper .match-body {
        padding: 0;
    }
    #${root_id}.mobile .match-body .sides {
        width: 100%;
    }

    #${root_id}.mobile .match-wrapper .match-lines-area {
        transform: scaleX(5);
    }
`
