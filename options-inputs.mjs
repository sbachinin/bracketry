import { OPTIONS } from './options.mjs'

const get_option_input = option => {
    if (option.type === 'select') {

    }
    if (option.type === 'string') {
        return `<input type='text'></input>`
    }
    if (option.type === 'select') {
        return `<select name="..." id="...">
            ${option.options.map(opt => `
                <option value=${opt}">${opt}</option>
            `).join('')}
        </select>`
    }
}

export const get_options_inputs = () => {
    return Object.values(OPTIONS)
        .map(option => {
            return `<div style='margin: 20px'>
                ${option.title}
                ${get_option_input(option)}
            </div>`
        })
        .join('')
}
