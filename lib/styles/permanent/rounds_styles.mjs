export const get_rounds_permanent_styles = () => `
    &&& .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
        min-width: 100px;
        max-width: 100%;
    }


    &&& .round-wrapper:last-of-type {
        /* overflow: hidden for earlier rounds will hide the vertical part of connecting lines.
            for last round it's unnecessary
                + content that overflows it may mess up the calculations like 'is all content visible within content_area?'
        */
        overflow: hidden;
    }





    &&& .match-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        min-height: 40px;
        box-sizing: border-box;
    }
    


    &&& .round-wrapper .match-body {
        width: 100%;
        transition: border-color 0.1s ease-out;
        display: flex;
        justify-content: flex-end; /* it pushes lonely match-status to very right */
        z-index: 2;
        pointer-events: auto;
    }

    &&& .round-wrapper .match-body:empty {
        pointer-events: none; /* otherwise, when onMatchClick is set, a border will appear around an empty match :hover */
    }

    &&& .match-body .sides {
        flex: 1;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
        grid-template-columns: minmax(0, 1fr);
    }

    &&& .match-body .match-status {
        z-index: 2;        
        align-self: center;
        transition: border-color 0.1s ease-out;
    }

    &&& .match-body .match-status:empty {
        display: none;
    }







    
    
/* LINES */

/* regular lines */
    &&& .match-wrapper .match-lines-area {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        pointer-events: none;
        z-index: 1;
    }
    &&& .match-wrapper .match-lines-area .line-wrapper {
        flex: 1; /* each of 2 empty guys takes 50% height */
        transition: color 0.1s ease-out, border-color 0.1s ease-out;
    }


    &&& .round-wrapper:last-of-type .line-wrapper {
        box-shadow: none !important;
    }
/* highlighted lines */


    &&& .side-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        pointer-events: auto;
    }

    &&& .side-wrapper * {
        pointer-events: none;
    }

    &&& .side-wrapper:not([contestant-id]) {
        pointer-events: none;
    }




    &&& .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
    }

    &&& .side-info-item.players-info {
        flex: 1;
        min-width: 0;
    }

    &&& .player-wrapper {
        display: flex;
        align-items: center;
        min-width: 0;
    }

    &&& .player-wrapper .nationality {
        flex-shrink: 0;
    }

    &&& .player-wrapper .player-title {
        flex: 1;
        transition: color 0.1s ease-out, opacity 0.1s ease-out;
        white-space: nowrap;
        text-align: left;
    }

    &&& .side-wrapper.looser:not(.highlighted) .player-title,
    &&& .side-wrapper .single-score-wrapper:not(.winner) {
        opacity: 0.54;
    }
    
    &&& .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
    }

    &&& .side-info-item.serving-mark.hidden {
        display: none;
    }
    &&& .side-info-item.serving-mark.transparent {
        opacity: 0;
    }

    &&& .side-info-item.side-scores {
        grid-auto-flow: column;
    }
    &&& .single-score-wrapper {
        display: flex;
        overflow: visible;
        flex-direction: column;
        align-items: center;
    }

    &&& .tie-break {
        padding-left: 1px;
    }

    &&& .single-score-wrapper .side-own-single-score {
        display: flex;
    }

    &&& .single-score-wrapper .opponent-single-score {
        display: flex;
        height: 0;
        overflow: hidden;
    }

    &&& .side-info-item.subscore {
        border-width: 1px;
        border-style: solid;
        text-align: center;
    }

    &&& .side-info-item.subscore:empty {
        display: none;
    }

    &&& svg.default-winner-svg {
        width: auto;
    }
`