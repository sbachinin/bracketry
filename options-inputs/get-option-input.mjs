import { create_element_from_Html, escape_Html } from './utils.mjs'
import * as elements from './elements.mjs'

export const get_option_input = (name, info, value, onchange) => {
    let input

    switch (info.type) {
        case 'number':
            input = create_element_from_Html(`
                <input type='number' value='${value}'></input>
            `)
            input.addEventListener('input', e => {
                onchange(name, Number(e.target.value))
            })
            break
        case 'string' :
            input = create_element_from_Html(`
                <input type='text' value='${escape_Html(value)}'></input>
            `)
            input.addEventListener('input', e => {
                onchange(name, e.target.value)
            })
            break
        case 'multiline_string':
            input = create_element_from_Html(`
                <textarea style="width: 100%; height: 100px;">${value}</textarea>
            `)
            input.addEventListener('input', e => {
                onchange(name, e.target.value)
            })
            break
        case 'select':
            input = create_element_from_Html(`
                <select style="max-width: 60%">
                    ${info.options.map(opt => `
                        <option value="${opt}" ${opt === value ? 'selected' : ''}>
                            ${opt}
                        </option>
                    `).join('')}
                </select>
            `)
            input.addEventListener('change', e => {
                onchange(name, e.target.value)
            })
            break
        case 'boolean':
            input = create_element_from_Html(`
                <label class="switch">
                    <input type="checkbox" ${value ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>`
            )
            input.querySelector('span.slider').addEventListener('click', e => {
                e.preventDefault() // el.click() will be called on update_inputs()
                onchange(name, !input.querySelector('input').checked)
            })
            break
    }

    const wrapper_el = elements.option_wrapper_el(name, info)
    wrapper_el.append(input)

    return {
        el: wrapper_el,
        update: _options_to_values => {
            // change value
            const input_to_change = wrapper_el.querySelector('input, select, textarea')
            input_to_change.value = _options_to_values[name]
            if (input_to_change.type === 'checkbox') {
                const should_change = _options_to_values[name] !== input_to_change.checked
                if (should_change) input_to_change.click()
            }

            // change disabled state
            if (info.disable_if?.(_options_to_values)) {
                wrapper_el.style.color = 'rgba(0,0,0,.35)'
                input_to_change.style.filter = 'blur(1px)'
                input_to_change.disabled = true
            } else {
                wrapper_el.style.color = 'black'
                input_to_change.style.filter = 'none'
                input_to_change.disabled = false
            }
        }
    }
}
