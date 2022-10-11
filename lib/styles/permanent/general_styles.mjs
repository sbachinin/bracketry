export const get_general_permanent_styles = () => `

/* protection against external styles */
    &&&,
    &&& * {
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

    &&& {
        overflow: hidden;
        position: relative;
        width: 100%;
        min-width: 300px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        border-width: 1px;
        border-style: solid;
    }
    
    &&& .all-but-buttons-header {
        flex: 1;
        display: flex;
        min-height: 0; /* to make it fill all free height */
    }

    &&& .zero-width {
        width: 0;
    }

    &&& .with-hidden-scrollbar {
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }

    &&& .with-hidden-scrollbar::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }

    &&& .full-width-grid-column { /* (a column that takes full width of the parent grid el) */
        grid-column: 1 / -1;
    }

    &&& .equal-width-columns-grid { /* all columns acquire the width of the widest column */
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
    }

    
    
    &&& .round-titles-wrapper {
        width: 100%;
        position: relative;
    }

    /* trick to draw border that stretches outside the parent
    (which can be narrower than content-area if short tournament) */
    &&& .round-titles-wrapper:after {
        position: absolute;
        display: block;
        left: 0;
        right: -2000px;
        height: 100%;
        top: 0;
        content: '';
    }

    &&& .round-title {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        justify-content: center;
    }

    &&& .matches-vertical-scroller {
        flex: 1;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    &&& .matches-positioner {
        position: relative;
        display: grid;
        grid-template-rows: 100%;
        overflow: hidden;
    }

    &&& .content-area {
        flex: 1;
        height: 100%;
        min-width: 0; /* to make it shrink to the free width of the parent */
        overflow: hidden;
        position: relative;
    }

    &&& .content-horizontal-scroller {
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: max-content;
        min-width: 100%;
    }

    &&& .scrollbar-parent {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    &&& .scrollbar {
        position: absolute;
        z-index: 2;
        right: 0;
        left: 0;
        opacity: 0.7;
    }
    &&& .scrollbar:hover, &&& .scrollbar.dragged {
        opacity: 1;
    }

`