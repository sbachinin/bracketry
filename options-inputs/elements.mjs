import { create_element_from_Html, escape_Html } from './utils.mjs'
import { switchStyle } from './switch-style.mjs'

export const inputs_root_wrapper = () => create_element_from_Html(
    `<div style='
        position: fixed;
        top: 0;
        left: 0;
        width: 400px;
        height: 100vh;
        overflow: scroll;
    '></div>`
)


export const options_group_heading = (
    text,
    options_type_name,
    names_of_expanded_groups
) => create_element_from_Html(`
    <div style='
        font-size: 24px;
        font-family: roboto;
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
    `<div class='option-input-wrapper ${option_name}-input-wrapper' style='background: #ddff9b; padding: 7px;'>
        <p style='margin: 3px'>${escape_Html(option_info.title)}</p>
    </div>`
)

export const styles = () => `<style>
    ${switchStyle}
    .option-input-wrapper.disabled > * {
        opacity: 0.2;
        pointer-events: none;
    }
</style>`

export const grouped_inputs_wrapper = (options_type_name, names_of_expanded_groups) => create_element_from_Html(`
    <div class='${options_type_name}' style='overflow: hidden; height: ${
        names_of_expanded_groups.includes(options_type_name)
        ? 'auto'
        : 0
    }'></div>
`)