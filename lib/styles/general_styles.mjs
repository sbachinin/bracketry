export const get_general_styles = (root_id, options) => `

    #${root_id}.root_brackets_element {
        background-color: ${ options.background_color };
        overflow: hidden;
        position: relative;
        width: 100%;
        min-width: 300px;
        height: 100%;
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
        grid-column-gap: ${options.match_hor_margin * 2}px;
        width: 100%;
        padding: 0 ${ options.match_hor_margin }px;
    }

    
    #${root_id} .round-titles-wrapper {
        display: ${ options.hide_round_titles ? 'none' : 'grid' };
        height: ${ options.round_titles_height };
        font-size: ${ options.round_title_font_size }px;
        font-family: ${ options.round_title_font_family || options.root_font_family };
        color: ${ options.round_title_color };
        border-bottom: 1px solid ${ options.round_titles_border_bottom_color };
    }

    #${root_id} .round-title {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        justify-content: ${ options.round_title_text_align };
        padding: 0 ${ options.round_title_horizontal_padding }px;
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
        min-height: calc(100% - ${options.main_vertical_padding * 2}px);
        margin-top: ${ options.main_vertical_padding || 0 }px;
        margin-bottom: ${ options.main_vertical_padding || 0 }px;
        margin-right: ${ options.match_hor_margin || 0 }px;
        
        font-size: ${options.match_root_font_size}px;
        

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
        width: ${ options.scrollbar_width }px;
        background: ${ options.scrollbar_color };
        opacity: 0.7;
    }
    #${root_id} .scrollbar:hover, #${root_id} .scrollbar.dragged {
        opacity: 1;
    }
`