import * as OPTIONS from '../lib/options.mjs'
import { get_default_options } from '../lib/utils/get_default_options.mjs'
import { switchStyle } from './switch-style.mjs'
import { create_element_from_Html, escape_Html } from './utils.mjs'
import { get_option_input } from './get-option-input.mjs'

const names_of_expanded_groups = ['GENERAL_OPTIONS']

const get_options_type_text_el = (options_type_name, insert_inputs) => {
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
            <span style='
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
        insert_inputs()
    })

    return el
}

const insert_inputs = (data, user_options_to_values, wrapper_el, render_all) => {
    wrapper_el.innerHTML = ''

    const default_options_to_values = get_default_options()
    const options_to_values = { ...default_options_to_values, ...user_options_to_values}

    const onchange = (option_name, option_value) => {
        Object.assign(
            options_to_values,
            { [option_name]: option_value }
        )
        render_all(data, options_to_values)
    }

    const get_inputs_of_type = options => {
        return Object.entries(options)
            .map(([option_name, option_info]) => {
                const option_wrapper_el = create_element_from_Html(
                    `<div style='background: #ddff9b; padding: 7px;'>
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
    }

    Object.entries(OPTIONS)
        .forEach(([options_type_name, options_of_type]) => {
            const inputs_of_type = (
                names_of_expanded_groups.includes(options_type_name)
                ? get_inputs_of_type(options_of_type)
                : []
            )

            wrapper_el.append(
                get_options_type_text_el(
                    options_type_name,
                    () => insert_inputs(data, options_to_values, wrapper_el, render_all)
                ),
                ...inputs_of_type
            )
        })

    wrapper_el.append(get_options_type_text_el(
        'DATA_TEXTAREA',
        () => insert_inputs(data, options_to_values, wrapper_el, render_all)
    ))

    if (names_of_expanded_groups.includes('DATA_TEXTAREA')) {
        const data_textarea = create_element_from_Html(`
            <textarea disabled style="width: 100%; height: 1000px;">${JSON.stringify(data, null, 2)}</textarea>
        `)
        data_textarea.addEventListener('input', e => {
            render_all(JSON.parse(e.target.value), options_to_values)
        })
        wrapper_el.append(data_textarea)
    }
}

export const get_options_inputs = (
    render_all,
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

    insert_inputs(data, user_options_to_values, wrapper_el, render_all)

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${switchStyle}</style>`
    )

    return wrapper_el
}
