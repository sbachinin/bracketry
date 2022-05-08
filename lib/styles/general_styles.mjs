export const get_general_styles = (root_id, options) => `
    #${root_id} * {
        box-sizing: border-box;
        user-select: none;
    }

    #${root_id} .with-hidden-scrollbar {
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }

    #${root_id} .with-hidden-scrollbar::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }

    #${root_id} .full-width-grid-column { /* (a column that takes full width of the parent grid el) */
        grid-column: 1 / -1;
    }

    #${root_id} .equal-width-columns-grid { /* all columns acquire the width of the widest column */
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
    }

    #${root_id} .round-titles-wrapper {
        grid-column-gap: ${options.match_hor_margin * 2}px;
        width: 100%;
        padding: 0 ${ options.match_hor_margin }px;
    }

    #${root_id} .round-title {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
    }
`