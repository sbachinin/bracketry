import { create_element_from_Html } from '../lib/utils/utils.mjs'
import { escape_Html } from './utils.mjs'

export const inputs_root_wrapper = () => create_element_from_Html(
    `<div style='
        position: fixed;
        top: 0;
        left: 0;
        width: 400px;
        height: 100vh;
        overflow: scroll;
        font-family: sans-serif;
        font-size: 15px;
    '></div>`
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