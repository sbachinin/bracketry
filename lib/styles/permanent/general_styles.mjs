export const get_general_permanent_styles = (root_id) => `

    #${root_id}.root-brackets-element {
        overflow: hidden;
        position: relative;
        width: 100%;
        min-width: 300px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    
    #${root_id} .all-but-buttons-header {
        flex: 1;
        display: flex;
        height: 100%;
    }

    /* protection against external styles */
    #${root_id}, #${root_id} * {
        box-sizing: border-box;
        user-select: none;
        margin: 0;
        padding: 0;
        width: auto;
        height: auto;
        border: none;
        border-radius: 0;
        align-content: unset;
        align-items: unset;
        align-self: unset;
        bottom: unset;
        top: unset;
        left: unset;
        right: unset;
        box-shadow: none;
        outline: none;
        text-decoration: none;
        white-space: initial;
        line-height: initial;
    }

    #${root_id} .zero-width {
        width: 0;
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
        width: 100%;
        display: grid;
        padding-right: 1000px; /* otherwise the border-bottom stopped too early */
        box-sizing: content-box;
    }

    #${root_id} .round-name {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        justify-content: center;
    }
    #${root_id} .round-name.hidden {
        display: none;
    }

    #${root_id} .matches-vertical-scroller {
        flex: 1;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #${root_id} .matches-positioner {
        position: relative;
        display: grid;
        grid-template-rows: 100%;
        overflow: hidden;
        width: 100%;
    }

    #${root_id} .content-area {
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0; /* to make it shrink to the free width of the parent */
        overflow: hidden;
        position: relative;
    }

    #${root_id} .scrollbar {
        position: absolute;
        z-index: 2;
        right: 0;
        opacity: 0.7;
    }
    #${root_id} .scrollbar:hover, #${root_id} .scrollbar.dragged {
        opacity: 1;
    }







/*  layout to measure rounds' natural width (where they aren't constrained by 100% and flex and grid stuff) */
    #${root_id}.root-brackets-element.free-layout .round-wrapper.hidden {
        display: grid; /* (instead of 'none') */
    }    
    #${root_id}.root-brackets-element.free-layout .matches-positioner {
        width: max-content;
    }



`