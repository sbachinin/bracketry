import { OPTIONS } from '../lib/options.mjs'
import { get_default_options, get_flattened_options } from '../lib/utils/get_default_options.mjs'
import { switchStyle } from './switch-style.mjs'
import { create_element_from_Html, escape_Html } from './utils.mjs'
import { get_option_input } from './get-option-input.mjs'

const names_of_expanded_groups = []

const get_options_group_heading = (options_type_name, update_inputs) => {
    const text = options_type_name
        .split('_')
        .filter(word => word !== 'OPTIONS')
        .map(word => word[0].toUpperCase() + word.slice(-word.length + 1).toLowerCase())
        .join(' ')
    
    const el = create_element_from_Html(`
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

    el.addEventListener('click', e => {
        const index = names_of_expanded_groups.indexOf(options_type_name)
        if (index > -1) {
            names_of_expanded_groups.splice(index, 1);
        } else {
            names_of_expanded_groups.push(options_type_name)
        }
        update_inputs()
    })

    return el
}

const update_inputs = (options_to_values) => {
    Object.keys(OPTIONS).forEach(options_type_name => {
        document.querySelector(`.${options_type_name}-arrow`).style.transform = (
            names_of_expanded_groups.includes(options_type_name) ? 'rotate(180deg)' : 'none'
        )
        document.querySelector(`.${options_type_name}`).style.height = (
            names_of_expanded_groups.includes(options_type_name) ? 'auto' : 0
        )
        Object.entries(OPTIONS[options_type_name]).forEach(([option_name, option_info]) => {
            const wrapper_el = document.querySelector(`.${option_name}-input-wrapper`)
            if (option_info.disable_if?.(options_to_values)) {
                wrapper_el?.classList.add('disabled')
            } else {
                wrapper_el?.classList.remove('disabled')
            }
        })
    })
}

const render_inputs = (data, user_options_to_values, wrapper_el, update_brackets) => {
    wrapper_el.innerHTML = ''

    const default_options_to_values = get_default_options()
    const options_to_values = { ...default_options_to_values, ...user_options_to_values}

    const onchange = (option_name, option_value) => {
        Object.assign(
            options_to_values,
            { [option_name]: option_value }
        )
        if (option_value === true) {
            const flattened_options = get_flattened_options()
            flattened_options[option_name]?.incompatible_with?.forEach(incompat_option_name => {
                Object.assign(
                    options_to_values,
                    { [incompat_option_name]: false }
                )
            })
        }

        update_inputs(options_to_values)
        update_brackets(data, options_to_values)
    }

    const get_inputs_of_type = (options, options_type_name) => {
        const inputs = Object.entries(options)
            .map(([option_name, option_info]) => {
                const option_wrapper_el = create_element_from_Html(
                    `<div class='option-input-wrapper ${option_name}-input-wrapper' style='background: #ddff9b; padding: 7px;'>
                        <p style='margin: 3px'>${escape_Html(option_info.title)}</p>
                    </div>`
                )
                const input = get_option_input(
                    option_name,
                    option_info,
                    options_to_values[option_name],
                    onchange
                )
                option_wrapper_el.append(input)
                return option_wrapper_el
            })

        const wrapper = create_element_from_Html(`
            <div class='${options_type_name}' style='overflow: hidden; height: ${
                names_of_expanded_groups.includes(options_type_name)
                ? 'auto'
                : 0
            }'></div>`)

        wrapper.append(...inputs)

        return wrapper
    }

    Object.entries(OPTIONS)
        .forEach(([options_type_name, options_of_type]) => {
            wrapper_el.append(
                get_options_group_heading(
                    options_type_name,
                    () => update_inputs(options_to_values)
                ),
                get_inputs_of_type(options_of_type, options_type_name)
            )
        })
/* 
    wrapper_el.append(get_options_group_heading(
        'DATA_TEXTAREA',
        () => render_inputs(data, options_to_values, wrapper_el, update_brackets)
    ))

    if (names_of_expanded_groups.includes('DATA_TEXTAREA')) {
        const data_textarea = create_element_from_Html(`
            <textarea disabled style="width: 100%; height: 1000px;">${JSON.stringify(data, null, 2)}</textarea>
        `)
        data_textarea.addEventListener('input', e => {
            update_brackets(JSON.parse(e.target.value), options_to_values)
        })
        wrapper_el.append(data_textarea)
    } */
}

export const get_options_inputs = (
    update_brackets,
    data,
    user_options_to_values
) => {   
    const wrapper_el = create_element_from_Html(
        `<div style='
            position: fixed;
            top: 0;
            left: 0;
            width: 400px;
            height: 100vh;
            overflow: scroll;
        '></div>`)

    render_inputs(data, user_options_to_values, wrapper_el, update_brackets)

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>
            ${switchStyle}
            .option-input-wrapper.disabled > * {
                opacity: 0.2;
                pointer-events: none;
            }
        </style>`
    )

    return wrapper_el
}
