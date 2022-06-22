export const examples_common_styles = `
    body {
        margin: 0;
        font-family: open sans, Roboto, sans-serif;
        letter-spacing: 0.05em;
        width: 1200px;
        max-width: 100vw;
        margin: 0 auto;
        padding: 0 30px;
        box-sizing: border-box;
        color: #2c2c2c;
    }

    .normal-heading {
        font-size: 34px;
        font-style: italic;
        font-weight: normal;
        text-transform: uppercase;
    }

    .common-playoffs-wrapper {
        height: 600px;
        border: 3px solid;
    }

    .home-link {
        height: 50px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #4a4a4a;
        font-family: georgia;
        padding: 0 19px;
        font-size: 20px;
    }
    .home-link svg {
        height: 20px;
    }


    .code {
        white-space: pre;
        background: #e2e2e2;
        font-family: monospace;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.02em;
        padding: 10px 20px;
    }







    .data-picker {
        display: flex;
    }
    .data-picker-button {
        margin: 5px 10px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.5;
        user-select: none;
    }
    .data-picker-button:hover {
        opacity: 1;
    }






/* OPTIONS */
    .options-group-heading {
        font-size: 20px;
        padding: 6px 20px 6px 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ddff9b;
    }
    .options-group-heading:not(:first-child) {
        border-top: 2px solid #4a4a4a;
    }
    .single-option-wrapper {
        display: flex;
        align-items: center;
        border-top: 2px solid #4a4a4a;
    }
    .single-option {
        padding: 15px 12px;
        max-width: 100%;
        box-sizing: border-box;
    }
    .single-option input, .single-option textarea {
        width: 100%;
        box-sizing: border-box;
    }

    html{visibility: visible;opacity:1;}

`