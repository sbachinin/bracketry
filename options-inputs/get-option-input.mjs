import { create_element_from_Html, escape_Html } from './utils.mjs'

export const get_option_input = (name, info, value, onchange) => {
    let el

    switch (info.type) {
        case 'number':
            el = create_element_from_Html(`
                <input type='number' value='${value}'></input>
            `)
            el.addEventListener('input', e => {
                onchange(name, Number(e.target.value))
            })
            break
        case 'string' :
            el = create_element_from_Html(`
                <input type='text' value='${escape_Html(value)}'></input>
            `)
            el.addEventListener('input', e => {
                onchange(name, e.target.value)
            })
            break
        case 'multiline_string':
            el = create_element_from_Html(`
                <textarea style="width: 100%; height: 100px;">${value}</textarea>
            `)
            el.addEventListener('input', e => {
                onchange(name, e.target.value)
            })
            break
        case 'select':
            el = create_element_from_Html(`
                <select name="..." id="...">
                    ${info.options.map(opt => `
                        <option value="${opt}" ${opt === value ? 'selected' : ''}>
                            ${opt}
                        </option>
                    `).join('')}
                </select>
            `)
            el.addEventListener('change', e => {
                onchange(name, e.target.value)
            })
            break
        case 'switch':
            el = create_element_from_Html(`
                <label class="switch">
                    <input type="checkbox" ${value ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>`
            )
            el.querySelector('span.slider').addEventListener('click', e => {
                e.preventDefault() // el.click() will be called on update_inputs()
                onchange(name, !el.querySelector('input').checked)
            })
            break
    }
    return {
        el,
        update: _options_to_values => {
            const input_to_change = el.querySelector('input, select, textarea') || el
            input_to_change.value = _options_to_values[name]
            if (input_to_change.type === 'checkbox') {
                const should_change = _options_to_values[name] !== input_to_change.checked
                if (should_change) input_to_change.click()
            }
        }
    }
}
