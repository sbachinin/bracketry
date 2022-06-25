import { create_element_from_Html } from '../lib/utils/utils.mjs'
import { escape_Html } from '../pages/escape_html.mjs'
export { tooltip } from './tooltip.mjs'
export { info_icon } from './info_icon.mjs'

export const inputs_root_wrapper = () => create_element_from_Html(
    `<div
        class="options-manager-wrapper"
        style='
            position: fixed;
            top: 0px;
            right: -1000px;
            width: 265px;
            height: 100vh;
            overflow: visible scroll;
            font-family: sans-serif;
            font-size: 15px;
            z-index: 30;
            padding-bottom: 50px;
            box-sizing: border-box;
            background: #e7e7e7;
        '
    ></div>`
)

export const sidebar_close_button = () => {
    const button = create_element_from_Html(
        `<div
            class="sidebar-close-button"
            style='
                font-size: 45px;
                box-sizing: border-box;
                cursor: pointer;
                float: right;
                border: 1px solid;
                margin: 2px;
                margin-right: 10px;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
            '
        >&#215;</div>`
    )
    button.addEventListener('click', (e) => {
        e.preventDefault()
        button.parentElement.style.right = '-1000px'
    })
    return button
}


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
        <div class="single-option ${option_info.type}">
            <p class="option-info" style='margin: 0 0 8px 0'>
                <span style="display: block;
                    color: #8e8e8e;
                    word-wrap: anywhere;
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