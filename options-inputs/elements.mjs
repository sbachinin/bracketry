import { create_element_from_Html } from '../lib/utils/utils.mjs'
import { escape_Html } from './utils.mjs'
export { tooltip } from './tooltip.mjs'
export { info_icon } from './info_icon.mjs'

export const inputs_root_wrapper = () => create_element_from_Html(
    `<div style='
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: visible;
        font-family: sans-serif;
        font-size: 15px;
        z-index: 30;
        background: #ffe9e5;
        padding-bottom: 50px;
        box-sizing: border-box;
    '></div>`
)


export const sidebar_expand_button = () => create_element_from_Html(
    `<div style='
        position: fixed;
        bottom: 5px;
        left: 5px;
        font-size: 26px;
        border: 1px solid;
        padding: 2px 4px;
        font-family: arial;
        cursor: pointer;
        z-index: 31;
        user-select: none;
        background: #000000;
        color: white;
    '>options</div>`
)


export const options_group_heading = (
    text,
    options_type_name,
    names_of_expanded_groups
) => create_element_from_Html(`
    <div style='
        font-size: 24px;
        padding: 6px 20px 6px 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ddff9b;
        margin-top: 20px;
    '>
        ${text}
        <span class='${options_type_name}-arrow' style='
            display: inline-block;
            line-height: 0;
            font-size: 32px;
            transform: ${ names_of_expanded_groups.includes(options_type_name) ? 'rotate(180deg)' : 'none' }
        '>
            V
        </span>
    </div>
`)

export const option_wrapper_el = (option_name, option_info) => create_element_from_Html(
    `<div style='
        background: #ddff9b;
        padding: 7px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #66c7c3;
    '>
        <p style='margin: 0 10px 0 0; max-width: 70%'>${escape_Html(option_info.title)}</p>
    </div>`
)

export const grouped_inputs_wrapper = (options_type_name, names_of_expanded_groups) => create_element_from_Html(`
    <div class='${options_type_name}' style='overflow: hidden; height: ${
        names_of_expanded_groups.includes(options_type_name)
        ? 'auto'
        : 0
    }'></div>
`)