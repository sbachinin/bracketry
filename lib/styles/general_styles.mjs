export const get_general_styles = (root_id, options) => `

    #${root_id}.root-brackets-element {
        background-color: ${ options.rootBackgroundColor };
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
    }

    #${root_id} * {
        box-sizing: border-box;
        user-select: none;
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
        height: ${ options.roundTitlesHeight }px;
        font-size: ${ options.roundTitlesFontSize }px;
        font-family: ${ options.roundTitlesFontFamily || options.rootFontFamily };
        color: ${ options.roundTitleColor };
        border-bottom: 1px solid ${ options.roundTitlesBorderBottomColor };
        padding-right: 1000px; /* otherwise the border-bottom stopped too early */
        box-sizing: content-box;
    }

    #${root_id} .round-title {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        justify-content: center;
    }

    #${root_id} .matches-vertical-scroller {
        display: flex;
        flex: 1;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #${root_id} .matches-scrollable-area {
        position: relative;
        display: grid;
        grid-template-rows: 100%;
        overflow: hidden;
        min-height: calc(100% - ${options.mainVerticalPadding * 2}px);
        margin-top: ${ options.mainVerticalPadding || 0 }px;
        margin-bottom: ${ options.mainVerticalPadding || 0 }px;
        min-width: 100%; /* not narrower than round titles */
        font-size: ${options.matchFontSize}px;
        

        width: -moz-max-content;
        width: -webkit-max-content;
        width: -o-max-content;
        width: -ms-max-content;
        height: -moz-max-content;
        height: -webkit-max-content;
        height: -o-max-content;
        height: -ms-max-content;
    }

    #${root_id} .content-area {
        position: absolute;
        left: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #${root_id} .content-horizontal-scroller {
        position: relative;
        flex: 1;
        height: 100%;
        overflow: hidden;
        min-height: 300px;
    }

    #${root_id} .scrollbar {
        position: absolute;
        z-index: 2;
        right: 0;
        width: ${ options.scrollbarWidth }px;
        background: ${ options.scrollbarColor };
        opacity: 0.7;
    }
    #${root_id} .scrollbar:hover, #${root_id} .scrollbar.dragged {
        opacity: 1;
    }
`