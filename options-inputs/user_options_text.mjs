import { create_element_from_Html } from '../lib/utils/utils.mjs'
import { get_default_options } from '../lib/options/get_default_options.mjs'

const get_text = (options_to_values) => {
    const default_options = get_default_options()
    const non_default_options = Object.fromEntries(
        Object.entries(options_to_values)
            .filter(([n, v]) => default_options[n] !== v)  
    )
    return JSON.stringify(non_default_options, null, 4)
        .replace(/"([^"]+)":/g, '$1:')
}

export const create_user_options_text = (initial_options_to_values) => {
    const text_el = create_element_from_Html(
        `<div style='
            border: 1px solid #ccc;
            white-space: pre;
            padding: 10px;
            margin-top: 5px;
            background: #fff;
            color: #757575;
        '>${get_text(initial_options_to_values)}</div>`
    )


    const button = create_element_from_Html(`
        <div style='
            border: 2px solid #ccc;
            display: inline-block;
            padding: 3px 0;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            margin-top: 5px;
            background: #ebebeb;
            user-select: none;
            width: 150px;
            height: 30px;
            line-height: 22px;
            box-sizing: border-box;
        '>Copy to clipboard</div>
    `)
    button.addEventListener('click', e => {
        e.target.innerHTML = '&#10003;'
        setTimeout(() => e.target.innerHTML = 'Copy to clipboard', 300)
        navigator.clipboard.writeText(text_el.innerHTML)
    })

    const update_user_options_text = (options_to_values) => {
        text_el.innerHTML = get_text(options_to_values)
    }

    const wrapper = create_element_from_Html(`
        <div style='
            margin: 20px 10px 0;
            background: #cfffe9;
            padding: 10px;
        '>
            Resulting object of non-default options:
        </div>
    `)
    wrapper.append(text_el, button)

    return {
        user_options_text_el: wrapper,
        update_user_options_text
    }
}