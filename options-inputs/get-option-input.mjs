import { create_element_from_Html, escape_Html } from './utils.mjs'

export const get_option_input = (name, info, value, onchange) => {
    if (info.type === 'number') {
        const el = create_element_from_Html(`
            <input type='number' value='${value}'></input>
        `)
        el.addEventListener('input', e => {
            onchange(name, Number(e.target.value))
        })
        return el
    }
    if (info.type === 'string') {
        const el = create_element_from_Html(`
            <input type='text' value='${escape_Html(value)}'></input>
        `)
        el.addEventListener('input', e => {
            onchange(name, e.target.value)
        })
        return el
    }
    if (info.type === 'multiline_string') {
        const el = create_element_from_Html(`
            <textarea style="width: 100%; height: 100px;">${value}</textarea>
        `)
        el.addEventListener('input', e => {
            onchange(name, e.target.value)
        })
        return el
    }
    if (info.type === 'select') {
        const el = create_element_from_Html(`
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
        return el
    }
    if(info.type === 'switch') {
        const el = create_element_from_Html(`
            <label class="switch">
                <input type="checkbox" ${value ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>`
        )
        el.addEventListener('click', _ => {
            onchange(name, el.querySelector('input').checked)
        })
        return el
    }
}
