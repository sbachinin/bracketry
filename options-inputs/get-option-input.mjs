import { createElementFromHTML, escapeHtml } from './utils.mjs'

export const get_option_input = (name, info, value, onchange) => {
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
