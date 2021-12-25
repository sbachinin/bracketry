import { OPTIONS, get_default_options } from '../options.mjs'
import { switchStyle } from './switch-style.mjs'
import { createElementFromHTML } from './utils.mjs'
import { get_option_input } from './get-option-input.mjs'

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
    
    const inputs = Object.entries(OPTIONS)
        .map(([option_name, option_info]) => {
            const option_wrapper_el = createElementFromHTML(
                `<div style='margin: 5px; background: tomato; padding: 5px;'>
                    <p style='margin: 3px'>${option_info.title}</p>
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

    const wrapper_el = createElementFromHTML(
        `<div style='
            display: flex;
            width: calc(100% - 20px);
            flex-wrap: wrap;
            align-items: center;
        '></div>`)
    wrapper_el.append(...inputs)

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${switchStyle}</style>`
    )

    return wrapper_el
}
