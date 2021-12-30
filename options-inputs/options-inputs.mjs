import * as OPTIONS from '../lib/options.mjs'
import { get_default_options } from '../lib/utils/get_default_options.mjs'
import { switchStyle } from './switch-style.mjs'
import { create_element_from_Html, escape_Html } from './utils.mjs'
import { get_option_input } from './get-option-input.mjs'

const get_options_type_text_el = options_type_name => {
    const text = options_type_name
        .split('_')
        .filter(word => word !== 'OPTIONS')
        .map(word => word[0].toUpperCase() + word.slice(-word.length + 1).toLowerCase())
        .join(' ')
    
    return create_element_from_Html(`
        <div style='
            font-size: 24px;
            font-family: roboto;
            padding: 12px 0 6px 10px;
        '>${text}</div>
    `)
}

export const get_options_inputs = (handle_options_change, user_options_to_values) => {
    const default_options_to_values = get_default_options()
    const options_to_values = { ...default_options_to_values, ...user_options_to_values}

    const onchange = (option_name, option_value) => {
        Object.assign(
            options_to_values,
            { [option_name]: option_value }
        )
        handle_options_change(options_to_values)
    }

    const get_inputs_of_type = options => {
        return Object.entries(options)
            .map(([option_name, option_info]) => {
                const option_wrapper_el = create_element_from_Html(
                    `<div style='margin: 5px; background: tomato; padding: 5px;'>
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

    const wrapper_el = create_element_from_Html(
        `<div style='
            width: 400px;
            height: 98vh;
            overflow: scroll;
            flex-shrink: 0;
        '></div>`)

      
    Object.entries(OPTIONS)
        .forEach(([options_type_name, options_of_type]) => {
            wrapper_el.append(
                get_options_type_text_el(options_type_name),
                ...get_inputs_of_type(options_of_type)
            )
        })

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${switchStyle}</style>`
    )

    return wrapper_el
}
