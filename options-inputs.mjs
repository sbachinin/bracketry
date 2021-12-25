import { OPTIONS, get_default_options } from './options.mjs'

const switchStyle = `
    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #2196F3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
`

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
    if(info.type === 'switch') {
        const el = createElementFromHTML(`
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>`
        )
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

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${switchStyle}</style>`
    )

    return wrapper_el
}
