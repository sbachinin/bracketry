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

    h1, h2, h3, h4 {
        font-family: Oxygen, open sans, Roboto, sans-serif;
    }

    h3 {
        margin: 50px 0 10px 0;
    }

    .common-playoffs-wrapper {
        margin: 24px 0;
        height: 600px;
        border: 3px solid tomato;
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