import { almost_black } from './constants.mjs'

export const examples_common_styles = `
    html {
        overflow-x: hidden;
    }

    body {
        margin: 0;
        font-family: Open Sans, Roboto, sans-serif;
        letter-spacing: 0.05em;
        width: 1200px;
        max-width: 100vw;
        padding: 0 3vw;
        box-sizing: border-box;
        color: #2c2c2c;
    }

    .common-playoffs-wrapper {
        height: 600px;
        resize: horizontal;
        overflow: auto hidden;
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
        width: max-content;
        opacity: 0.7;
    }
    .home-link:hover {
        opacity: 1;
    }
    .home-link svg {
        height: 20px;
    }


    .more-link {
        border: 3px solid ${almost_black};
        font-size: 20px;
        padding: 4px 8px;
        display: inline-block;
        text-decoration: none;
        margin: 5px;
    }



    .options-manager-opener {
        font-size: 16px;
        font-family: arial;
        cursor: pointer;
        user-select: none;
        background: ${almost_black};
        color: white;
        margin: 10px;
        width: max-content;
        padding: 4px 8px 2px 8px;
        text-transform: uppercase;
    }

    .checkbox {
        border: 1px solid black;
        color: transparent;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        flex-shrink: 0;
    }
    .checkbox.checked {
        color: #1c5dd9;
    }



    .code {
        white-space: pre;
        background: ${almost_black};
        color: #fff;
        font-family: monospace;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.02em;
        padding: 10px 30px;
        overflow: auto;
        width: max-content;
        max-width: 100%;
        box-sizing: border-box;
    }
    .bleak-code {
        color: #9e9e9e;
    }
    .highlighted-code {
        color: #80ea00;
    }






    .data-picker {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .data-picker-button {
        display: flex;
        align-items: center;
        margin: 5px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.5;
        user-select: none;
        position: relative;
        border: 1px solid transparent;
        padding: 5px;
    }
    .data-picker-button:hover {
        opacity: 1;
    }
    .data-picker-button.selected {
        border-color: #ccc;
    }
    .data-picker-button-tooltip {
        position: absolute;
        left: 50%;
        bottom: 112%;
        background: white;
        border: 1px solid #ccc;
        padding: 5px 10px;
        font-size: 16px;
        opacity: 0;
        pointer-events: none;
        z-index: 100;
        transition: all 0.1s ease-out;
        transform: translateX(-50%);
    }
    .data-picker-button-tooltip.visible {
        opacity: 1;
    }
    





/* OPTIONS */
    .options-group-heading {
        font-size: 16px;
        padding: 6px 20px 6px 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${almost_black};
        clear: both;
        color: white;
        text-transform: uppercase;
    }
    .options-group-heading {
        margin: 5px 0;
    }
    .single-option-wrapper {
        padding: 15px 12px;
    }


    .single-option-wrapper.disabled .option-name,
    .single-option-wrapper.disabled .option-title {
        color: rgba(0,0,0,.35);
        filter: blur(0.8px);
    }

    .single-option-wrapper.disabled input,
    .single-option-wrapper.disabled textarea {
        color: transparent;
        filter: blur(0.8px);
    }

    .single-option-wrapper:not(:first-child) {
        border-top: 1px solid #4a4a4a;
    }

    .option-name {
        display: block;
        color: #8e8e8e;
        word-wrap: anywhere;
        font-style: italic;
        margin-bottom: 5px;
    }

    .single-option {
        max-width: 100%;
        box-sizing: border-box;
        width: 100%;
    }
    .single-option input, .single-option textarea {
        width: 100%;
        box-sizing: border-box;
    }
    .single-option.boolean {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .single-option.boolean > input {
        width: 30px;
        cursor: pointer;
        flex-basis: 30px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .option-info {
        display: flex;
        align-items: center;
    }

    .single-option:not(.boolean) .option-info {
        margin: 0 0 8px 0;
    }
    

    .option-explanation-button {
        padding: 7px;
        margin: 0 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }






    .crossed {
        background: 
            linear-gradient(to top left,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) calc(50% - 0.8px),
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0) calc(50% + 0.8px),
                rgba(0,0,0,0) 100%),
            linear-gradient(to top right,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) calc(50% - 0.8px),
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0) calc(50% + 0.8px),
                rgba(0,0,0,0) 100%);
   }



























/* AUXILIARY STUFF */



    p {
        font-size: 16px;
        line-height: 1.8;
    }

    .note {
        background: #f0fffe;
        padding: 5px 10px;
        display: inline-block;
    }

    .small-text {
        font-size: 14px;
        line-height: 1.5;
    }

    .heading-2 {
        font-size: 45px;
        font-weight: bold;
        margin: 60px 0 30px;
    }
    .heading-3 {
        font-size: 32px;
        margin: 30px 0;
    }
    .heading-4 {
        font-size: 24px;
        margin: 10px 0;
    }

    .heading-5 {
        font-size: 20px;
        margin: 10px 0;
    }

    .italic {
        font-style: italic;
    }

    .indent {
        padding-left: 30px;
    }

    .medium-margin-top {
        margin-top: 50px;
    }

    .huge-margin-top {
        margin-top: 120px;
    }

    img {
        display: block;
        max-width: 85vw;
        margin: 15px 0;
    }













/* HAS TO BE IN THE END */
    html{visibility: visible;opacity:1;}
`