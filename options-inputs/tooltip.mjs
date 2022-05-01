import { create_element_from_Html } from '../lib/utils/utils.mjs'

export const tooltip = create_element_from_Html(`
    <div
        id="option-input-tooltip"
        style="
            display: none;
            background: white;
            border: 1px solid rgb(207, 207, 207);
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-height: 60%;
            z-index: 100;
            padding: 40px;
            overflow-y: scroll;
            font-size: 16px;
            font-family: verdana;
            line-height: 26px;
        "
    >
        <svg style="
            position: absolute;
            top: 2%;
            right: 2%;
            cursor: pointer;
        " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        <div style="white-space: pre"></div>
    </div>
`)
tooltip.querySelector('svg').addEventListener('click', () => tooltip.style.display = 'none')
document.body.append(tooltip)

