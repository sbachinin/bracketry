export const get_rounds_permanent_styles = (root_id) => `
    #${root_id} .round-wrapper {
        position: relative;
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        align-items: stretch;
        min-width: 100px;
        max-width: 100%;
    }

    #${root_id} .round-wrapper.hidden {
        display: none;
    }








    #${root_id} .match-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        min-height: 40px;
        box-sizing: border-box;
    }
    


    #${root_id} .round-wrapper .match-body {
        width: 100%;
        transition: border-color 0.1s ease-out;
        display: flex;
        justify-content: flex-end; /* it pushes lonely match-status to very right */
        z-index: 2;
        pointer-events: auto;
    }

    #${root_id} .round-wrapper .match-body:empty {
        pointer-events: none; /* otherwise, when onMatchClick is set, a border will appear around an empty match :hover */
    }

    #${root_id} .match-body .sides {
        flex: 1;
        display: grid;
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr); /* two sides will always be of same height */
        grid-template-columns: minmax(0, 1fr);
    }

    #${root_id} .match-body .match-status {
        z-index: 2;        
        align-self: center;
        transition: border-color 0.1s ease-out;
    }

    #${root_id} .match-body .match-status:empty {
        display: none;
    }







    
    
/* LINES */

/* regular lines */
    #${root_id} .match-wrapper .match-lines-area {
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
    #${root_id} .match-wrapper .match-lines-area .line-wrapper {
        flex: 1; /* each of 2 empty guys takes 50% height */
        transition: color 0.1s ease-out, border-color 0.1s ease-out;
    }


    #${root_id} .round-wrapper:last-of-type .line-wrapper {
        box-shadow: none !important;
    }
/* highlighted lines */


    #${root_id} .side-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        pointer-events: auto;
    }

    #${root_id} .side-wrapper * {
        pointer-events: none;
    }

    #${root_id} .side-wrapper:not([contestant-id]) {
        pointer-events: none;
    }




    #${root_id} .side-info-item {
        display: grid;
        grid-auto-rows: minmax(0, 1fr); /* equal height rows */
        grid-template-columns: auto;
        align-items: center;
    }

    #${root_id} .side-info-item.players-info {
        flex: 1;
        min-width: 0;
    }

    #${root_id} .player-wrapper {
        display: flex;
        align-items: center;
        min-width: 0;
    }

    #${root_id} .player-wrapper .nationality {
        flex-shrink: 0;
    }

    #${root_id} .player-wrapper .player-title {
        flex: 1;
        transition: color 0.1s ease-out, opacity 0.1s ease-out;
        white-space: nowrap;
        text-align: left;
    }

    #${root_id} .side-wrapper.looser:not(.highlighted) .player-title,
    #${root_id} .side-wrapper .single-score-wrapper:not(.winner) {
        opacity: 0.54;
    }
    
    #${root_id} .side-info-item.serving-mark {
        border-radius: 50%;
        background-color: #b7cf15;
    }

    #${root_id} .side-info-item.serving-mark.hidden {
        display: none;
    }
    #${root_id} .side-info-item.serving-mark.transparent {
        opacity: 0;
    }

    #${root_id} .side-info-item.side-scores {
        grid-auto-flow: column;
    }
    #${root_id} .single-score-wrapper {
        display: flex;
        overflow: visible;
        flex-direction: column;
        align-items: center;
    }

    #${root_id} .tie-break {
        padding-left: 1px;
    }

    #${root_id} .single-score-wrapper .side-own-single-score {
        display: flex;
    }

    #${root_id} .single-score-wrapper .opponent-single-score {
        display: flex;
        height: 1px;
        overflow: hidden;
    }

    #${root_id} .side-info-item.subscore {
        text-align: center;
    }

    #${root_id} svg.default-winner-svg {
        width: auto;
    }
`