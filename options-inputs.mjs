import { OPTIONS, get_default_options } from './options.mjs'

const createElementFromHTML = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstElementChild; 
  }

const escapeHtml = unsafe => {
    return unsafe
        ?.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const get_option_input = (name, info, value, onchange) => {
    if (info.type === 'number') {
        const el = createElementFromHTML(`
            <input type='number' value='${value}'></input>
        `)
        el.addEventListener('input', e => {
            onchange(name, e.target.value)
        })
        return el
    }
    if (info.type === 'string') {
        const el = createElementFromHTML(`
            <input type='text' value='${escapeHtml(value)}'></input>
        `)
        el.addEventListener('input', e => {
            onchange(name, e.target.value)
        })
        return el
    }
    if (info.type === 'multiline_string') {
        const el = createElementFromHTML(`
            <textarea style="width: 500px; height: 100px;">${value}</textarea>
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
    return wrapper_el
}
