import { OPTIONS, get_default_options } from './options.mjs'

const createElementFromHTML = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstElementChild; 
  }

const get_option_input = (name, info, value, onchange) => {
    if (info.type === 'number' || info.type === 'string') {
        const input_type = info.type === 'string' ? 'text' : 'number'
        const el = createElementFromHTML(`
            <input type='${input_type}' name='${name}' value=${value}></input>
        `)
        el.addEventListener('input', e => {
            onchange(name, e.target.value)
        })
        return el
    }
    if (info.type === 'select') {
        const el = createElementFromHTML(`
            <select name="..." id="...">
                ${info.options.map(opt => `
                    <option value=${opt} ${opt === value ? 'selected' : ''}>
                        ${opt}
                    </option>
                `).join('')}
            </select>
        `)
        el.addEventListener('change', e => {
            onchange(name, e.target.value)
        })
        return el
    }
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
    
    return Object.entries(OPTIONS)
        .map(([option_name, option_info]) => {
            const option_wrapper_el = createElementFromHTML(
                `<div style='margin: 20px'>
                    ${option_info.title}
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
