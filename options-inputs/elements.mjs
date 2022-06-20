import { create_element_from_Html } from '../lib/utils/utils.mjs'
import { escape_Html } from './utils.mjs'
export { tooltip } from './tooltip.mjs'
export { info_icon } from './info_icon.mjs'

export const inputs_root_wrapper = () => create_element_from_Html(
    `<div
        style='
            position: fixed;
            top: 0;
            left: -265px;
            width: 265px;
            height: 100vh;
            overflow-y: scroll;
            overflow-x: visible;
            font-family: sans-serif;
            font-size: 15px;
            z-index: 30;
            background: white;
            border-right: 1px solid #4a4a4a;
            border-left: 15px solid #4a4a4a;
            padding-bottom: 50px;
            box-sizing: border-box;
            transition: left 0.05s ease-out;
        '
        onmouseleave="this.style.left='-265px'"
    ></div>`
)


export const sidebar_expand_button = () => create_element_from_Html(
    `<div style='
        width: 15px;
        height: 200px;
        font-size: 16px;
        font-family: arial;
        cursor: pointer;
        z-index: 31;
        user-select: none;
        background: #4a4a4a;
        color: white;
        writing-mode: vertical-rl;
        text-orientation: upright;
        text-align: center;
        position: fixed;
        left: 0;
    '>options</div>`
)


export const options_group_heading = (
    text,
    options_type_name,
    names_of_expanded_groups
) => create_element_from_Html(`
    <div class="options-group-heading">
        ${text}
        <span class='${options_type_name}-arrow' style='
            display: inline-block;
            line-height: 0;
            font-size: 18px;
            transform: ${ names_of_expanded_groups.includes(options_type_name) ? 'rotate(180deg)' : 'none' }
        '>
            V
        </span>
    </div>
`)

export const option_wrapper_el = (option_name, option_info) => create_element_from_Html(
    `<div class="single-option-wrapper">
        <div class="single-option">
            <p class="option-info" style='margin: 0 0 8px 0'>
                <span style="display: block;
                    color: #8e8e8e;
                    word-wrap: break-word;
                    font-style: italic;
                    margin-bottom: 5px;">${option_name}</span>
                ${escape_Html(option_info.title)}
            </p>
            <span class="input-placeholder"></span>
        </div>
        <span class="explanation-placeholder"></span>
    </div>`
)

export const grouped_inputs_wrapper = (options_type_name, names_of_expanded_groups) => create_element_from_Html(`
    <div class='group-of-options ${options_type_name}' style='overflow: hidden; height: ${
        names_of_expanded_groups.includes(options_type_name)
        ? 'auto'
        : 0
    }'></div>
`)